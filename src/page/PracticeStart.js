import React, { useEffect, useRef, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import Modal from "react-modal";
import logo from '../img/logo.png';
import PdfUpload from "../component/PdfUpload";

const PracticeStart = () => {
    const videoOutputRef = useRef(null);
    const screenRecordedVideoRef = useRef(null);
    const camRecordedVideoRef = useRef(null);
    const screenMediaStreamRef = useRef(null);
    const camMediaStreamRef = useRef(null);
    const screenMediaRecorderRef = useRef(null);
    const camMediaRecorderRef = useRef(null);
    const screenRecordedChunksRef = useRef([]);
    const camRecordedChunksRef = useRef([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const quitFlag = useRef(null); //녹화 종료 버튼 클릭 여부 확인

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const quitPractice = () => {
        quitFlag.current = true;
        handleStopRecording();
        openModal();
    }

    //영상 녹화에 필요한 권한 요청하기
    useEffect(() => {
        // 유저의 화면 공유 요청
        navigator.mediaDevices
            .getDisplayMedia({video:true})
            .then(function(newMediaStream){
                screenMediaStreamRef.current = newMediaStream;
            })

        // 유저의 카메라로 부터 입력을 사용할 수 있도록 요청
        navigator.mediaDevices
            .getUserMedia({ video: true, audio:true })
            .then(function (newMediaStream) {
                camMediaStreamRef.current = newMediaStream;
                // 카메라의 입력을 실시간으로 비디오 태그에서 확인
                videoOutputRef.current.srcObject = camMediaStreamRef.current;
                videoOutputRef.current.onloadedmetadata = function (e) {
                    videoOutputRef.current.play();
                };
            });
    }, []);

    const handleStartRecording = () => {
        //녹화 시작 전 데이터 저장할 배열 초기화
        screenRecordedChunksRef.current = [];
        camRecordedChunksRef.current = [];
        quitFlag.current = false;

        screenMediaRecorderRef.current = new MediaRecorder(screenMediaStreamRef.current, {
            mimetype: "video/webm",
        });
        camMediaRecorderRef.current = new MediaRecorder(camMediaStreamRef.current, {
            mimetype: "video/webm",
        });

        screenMediaRecorderRef.current.ondataavailable = function (event) {
            if (event.data && event.data.size > 0) {
                console.log("ondataavailable");
                screenRecordedChunksRef.current.push(event.data);
                console.log("screenMediaRecorderRef: ", screenRecordedChunksRef);
            }
        };
        camMediaRecorderRef.current.ondataavailable = function (event) {
            if (event.data && event.data.size > 0) {
                console.log("ondataavailable");
                camRecordedChunksRef.current.push(event.data);
                console.log("camMediaRecorderRef: ", camRecordedChunksRef);
            }
        };

        screenMediaRecorderRef.current.onstop = function () {
            if (screenRecordedChunksRef.current.length > 0) {
                const screenBlob = new Blob(screenRecordedChunksRef.current, { type: "video/webm" });
                console.log("screenMediaRecorderRef.stop blob: ", screenBlob);
                const camBlob = new Blob(camRecordedChunksRef.current, { type: "video/webm" });
                console.log("camRecordedChunksRef.stop blob: ", camBlob);
                const screenRecordedMediaURL = URL.createObjectURL(screenBlob);
                const camRecordedMediaURL = URL.createObjectURL(screenBlob);
                if (screenRecordedVideoRef.current && camRecordedVideoRef.current) { //아무 값도 없을 때 참조 금지
                    screenRecordedVideoRef.current.src = screenRecordedMediaURL;
                    camRecordedVideoRef.current.src = camRecordedMediaURL;
                }

                console.log(quitFlag);
                if(quitFlag.current === true) { //녹화 종료 버튼이 눌렸을 때만 서버에 데이터 전송
                    const screenFormData = new FormData();
                    const camFormData = new FormData();
                    const nowDate = new Date();
                    screenFormData.append(
                        'video',
                        screenBlob,
                        `screen_userID_${nowDate.getFullYear()}.${nowDate.getMonth()+1}.${nowDate.getDate()}_${nowDate.getHours()}:${nowDate.getMinutes()}.webm`
                    );
                    console.log("Post Form-Data : ", screenFormData);

                    camFormData.append(
                        'video',
                        camBlob,
                        `cam_userID_${nowDate.getFullYear()}.${nowDate.getMonth() + 1}.${nowDate.getDate()}_${nowDate.getHours()}:${nowDate.getMinutes()}.webm`
                    );
                    
                    //화면 녹화 영상 서버 전송
                    fetch("http://localhost:3001/s3/", {
                        method: "POST",
                        body: screenFormData,
                    })
                        .then((response) => {
                            console.log("screen 전송 완료", response); // 서버 응답 처리
                        })
                        .catch((error) => {                            
                            console.error("screen 전송 실패:", error); // 서버 응답 처리
                        });
                    
                    //웹캠 녹화 영상 서버 전송
                    fetch("http://localhost:3001/s3/", {
                        method: "POST",
                        body: camFormData,
                    })
                        .then((response) => {
                            console.log("cam 전송 완료", response); // 서버 응답 처리
                        })
                        .catch((error) => {                            
                            console.error("cam 전송 실패:", error); // 서버 응답 처리
                        });
                }
                screenMediaRecorderRef.current = null;
                console.log(screenMediaRecorderRef.current);
                camMediaRecorderRef.current = null;
                console.log(camMediaRecorderRef.current);
            }
        };
        console.log("Recording Start!");
        screenMediaRecorderRef.current.start();
        camMediaRecorderRef.current.start();
        setIsPlaying(true);
    };

    const handleStopRecording = () => {
        if (screenMediaRecorderRef.current) {
            console.log("camMediaRecorderRef stop");
            camMediaRecorderRef.current.stop();
            console.log("screenMediaRecorderRef stop");
            screenMediaRecorderRef.current.stop();
            setIsPlaying(false);
        }
    };

    const handleDownload = () => {
        if (screenRecordedChunksRef.current.length > 0) {
            const blob = new Blob(screenRecordedChunksRef.current, { type: "video/webm;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "video.webm";
            link.click();
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="practice-container">
            <div className="button-area">
                <button onClick={handleStartRecording}>
                    <FaPlay /> 녹화시작
                </button>

                <button onClick={handleStopRecording}>
                    <FaStop /> 정지
                </button>
            </div>
            <div className="camera-pdf-container">
                <div className="practice-left">
                    <PdfUpload />
                </div>
                <div className="practice-right">
                    <video ref={videoOutputRef} className="live-camera" muted></video>
                    {isPlaying ? (
                        <p className="practice-title-save">{inputValue}</p>
                    ) : (
                        <input type="text" className="practice-title" placeholder="발표 제목을 입력해주세요" value={inputValue} onChange={handleInputChange}/>
                    )}

                    <br />
                    {isPlaying ? (

                        <Button variant="danger" onClick={quitPractice} className="start-stop-button">발표 종료</Button>

                    ) : (
                        <Button onClick={handleStartRecording} className="start-stop-button">발표 시작</Button>
                    )}
                </div>
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div className="modal-center">
                    <img src={logo} className="app-logo" alt="logo" width={200} />
                    <h2>{inputValue}</h2>
                    <video ref={camRecordedVideoRef} controls className="result-video"></video>
                    <div>
                        <Button>상세보기</Button>
                        <Button onClick={handleDownload}>저장하기</Button>
                    </div>
                </div>
                <button onClick={closeModal} className="modal-close">닫기</button>
            </Modal>
        </div>
    );
};

export default PracticeStart;
