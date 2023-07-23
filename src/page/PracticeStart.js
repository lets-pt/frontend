import React, { useEffect, useRef, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import Modal from "react-modal";
import logo from '../img/logo.png';
import PdfUpload from "../component/PdfUpload";
import KeywordPage from "./KeywordPage";
import Timer from "../component/Timer";
import useVideoState from "../hooks/useVideoState";
import useTimerState from '../hooks/useTimerState';

const PdfUploadMemoized = React.memo(PdfUpload);

const PracticeStart = () => {
    const { startRecording, stopRecording, quitFlag, screenMediaStreamRef, camMediaStreamRef, videoOutputRef, camMediaRecorderRef, playing, formData } = useVideoState();
    const { startTimer, stopTimer, minutes, seconds } = useTimerState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const goToDetailPage = () => {
        const width = 1000;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        window.open(
            '/resultDetail',
            '_blank',
            `width=${width}, height=${height}, left=${left}, top=${top}, resizable=no, scrollbars=yes`
        );
    }


    const goToKeywordPage = () => {
        const width = 400;
        const height = 300;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        window.open(
            '/keyword',
            '_blank',
            `width=${width}, height=${height}, left=${left}, top=${top}, resizable=no, scrollbars=yes`
        );
    }



    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const startPractice = () => {
        startRecording();
        startTimer();
    }

    const stopPractice = () => {
        stopRecording();
        stopTimer();
    }

    const quitPractice = () => {
        quitFlag.current = true;
        stopRecording();
        stopTimer();
        openModal();
    }

    //영상 녹화에 필요한 권한 요청하기
    useEffect(() => {
        // 유저의 화면 공유 요청
        navigator.mediaDevices
            .getDisplayMedia({ video: true })
            .then(function (newMediaStream) {
                screenMediaStreamRef.current = newMediaStream;
            })

        // 유저의 카메라로 부터 입력을 사용할 수 있도록 요청
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(function (newMediaStream) {
                camMediaStreamRef.current = newMediaStream;
                // 카메라의 입력을 실시간으로 비디오 태그에서 확인
                videoOutputRef.current.srcObject = camMediaStreamRef.current;
                videoOutputRef.current.onloadedmetadata = function (e) {
                    videoOutputRef.current.play();
                };
            });
    }, []);

    return (
        <div className="practice-container">
            <div className="practice-top">
                <div>
                    <Timer time={{ minutes, seconds }} />
                </div>
                <button onClick={stopPractice}>
                    <FaStop /> 정지
                </button>
                <p>
                    연습모드
                </p>
                <p>
                    실전모드
                </p>
                <button onClick={goToKeywordPage}>키워드 등록</button>

            </div>
            <div className="camera-pdf-container">
                <div className="practice-left">
                    <PdfUploadMemoized />
                    <textarea className="script-input" placeholder="스크립트 작성"></textarea>
                </div>
                <div className="practice-right">
                    <video ref={videoOutputRef} className="live-camera" muted></video>
                    {playing ? (
                        <p className="practice-title-save">{inputValue}</p>
                    ) : (
                        <input type="text" className="practice-title" placeholder="발표 제목을 입력해주세요" value={inputValue} onChange={handleInputChange} />
                    )}

                    <br />
                    {playing ? (

                        <Button variant="danger" onClick={quitPractice} className="start-stop-button">발표 종료</Button>

                    ) : (
                        <Button onClick={startPractice} className="start-stop-button">발표 시작</Button>
                    )}
                </div>
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div className="modal-center">
                    <img src={logo} className="app-logo" alt="logo" width={200} />
                    <h2>{inputValue}</h2>
                    <video ref={camMediaRecorderRef} controls className="result-video"></video>
                    <div>
                        <Button onClick={goToDetailPage}>상세보기</Button>
                        <Button>저장하기</Button>
                    </div>
                </div>
                <button onClick={closeModal} className="modal-close">닫기</button>
            </Modal>
        </div>
    );
};

export default PracticeStart;
