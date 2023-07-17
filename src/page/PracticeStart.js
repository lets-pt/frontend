import React, { useEffect, useRef, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import Modal from "react-modal";
import logo from '../img/logo.png';

const PracticeStart = () => {
    const videoOutputRef = useRef(null);
    const recordedVideoRef = useRef(null);
    const mediaStreamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const quitPractice = () => {
        handleStopRecording();
        openModal();
    }

    useEffect(() => {
        // 유저의 카메라로 부터 입력을 사용할 수 있도록 요청
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(function (newMediaStream) {
                mediaStreamRef.current = newMediaStream;
                // 카메라의 입력을 실시간으로 비디오 태그에서 확인
                videoOutputRef.current.srcObject = mediaStreamRef.current;
                videoOutputRef.current.onloadedmetadata = function (e) {
                    videoOutputRef.current.play();
                };
            });
    }, []);

    const handleStartRecording = () => {
        recordedChunksRef.current = []; //녹화 시작 전 데이터 저장할 배열 초기화
        mediaRecorderRef.current = new MediaRecorder(mediaStreamRef.current, {
            mimetype: "video/webm",
        });

        mediaRecorderRef.current.ondataavailable = function (event) {
            if (event.data && event.data.size > 0) {
                console.log("ondataavailable");
                recordedChunksRef.current.push(event.data);
                console.log("recordedChuncksRdf: ", recordedChunksRef);
            }
        };

        mediaRecorderRef.current.onstop = function () {
            if (recordedChunksRef.current.length > 0) {
                const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
                console.log("mediaRecorderRef.stop blob: ", blob);
                const recordedMediaURL = URL.createObjectURL(blob);
                recordedVideoRef.current.src = recordedMediaURL;

                const formData = new FormData();
                const nowDate = new Date();
                formData.append(
                    'video',
                    blob,
                    `userID_${nowDate.getFullYear()}.${nowDate.getMonth()}.${nowDate.getDate()}_${nowDate.getHours()}:${nowDate.getMinutes()}.webm`
                );
                console.log("Form-Data : ", formData);

                fetch("http://localhost:3001/s3/", {
                    method: "POST",
                    body: formData,
                })
                    .then((response) => {
                        // 서버 응답 처리
                        console.log("영상 전송 완료");
                    })
                    .catch((error) => {
                        // 에러 처리
                        console.error("영상 전송 실패:", error);
                    });
                mediaRecorderRef.current = null;
            }
        };
        console.log("Recording Start!");
        mediaRecorderRef.current.start();
        setIsPlaying(true);
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsPlaying(false);
        }
    };


    const handleDownload = () => {
        if (recordedChunksRef.current.length > 0) {
            const blob = new Blob(recordedChunksRef.current, { type: "video/webm;" });
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
            <div className="camera-area">
                <video ref={videoOutputRef}></video>

                <video ref={recordedVideoRef} controls></video>

            </div>
            {isPlaying ? (
                <div className="button-area">
                    <Button variant="danger" onClick={quitPractice}>발표 종료</Button>
                    <br />
                    <Button onClick={handleDownload}>다운로드</Button>
                </div>
            ) : (
                <Button onClick={handleStartRecording}>발표 시작</Button>
            )}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div className="modal-center">
                    <img src={logo} className="app-logo" alt="logo" width={200} />
                    <h2>발표 연습 결과</h2>
                    <video ref={recordedVideoRef} controls className="result-video"></video>
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
