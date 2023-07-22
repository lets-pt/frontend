import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import PdfUpload from './PdfUpload';

const Practice = () => {
  const videoOutputRef = useRef(null);
  const recordedVideoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const quitFlag = useRef(null); //녹화 종료 버튼 클릭 여부 확인

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

  const quitPractice = () => {
    quitFlag.current = true;
    handleStopRecording();
    openModal();
  }

  useEffect(() => {
    // 유저의 카메라로 부터 입력을 사용할 수 있도록 요청
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
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
    quitFlag.current = false;
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
        if (recordedVideoRef.current) { //아무 값도 없을 때 참조 금지
          recordedVideoRef.current.src = recordedMediaURL;
        }

        console.log(quitFlag);
        if (quitFlag.current === true) { //녹화 종료 버튼이 눌렸을 때만 서버에 데이터 전송
          const formData = new FormData();
          const nowDate = new Date();
          formData.append(
            'video',
            blob,
            `userID_${nowDate.getFullYear()}.${nowDate.getMonth() + 1}.${nowDate.getDate()}_${nowDate.getHours()}:${nowDate.getMinutes()}.webm`
          );
          console.log("Post Form-Data : ", formData);

          fetch("http://localhost:3001/s3/", {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              console.log("영상 전송 완료", response); // 서버 응답 처리
            })
            .catch((error) => {
              console.error("영상 전송 실패:", error); // 서버 응답 처리
            });
        }
        mediaRecorderRef.current = null;
        console.log(mediaRecorderRef.current);
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
    <div>
      <div className="camera-pdf-container">
        <div className="practice-left">
          <PdfUpload />
          <textarea className="script-input" placeholder="스크립트 작성"></textarea>
        </div>
        <div className="practice-right">
          <video ref={videoOutputRef} className="live-camera" muted></video>
          {isPlaying ? (
            <p className="practice-title-save">{inputValue}</p>
          ) : (
            <input type="text" className="practice-title" placeholder="발표 제목을 입력해주세요" value={inputValue} onChange={handleInputChange} />
          )}

          <br />
          {isPlaying ? (

            <Button variant="danger" onClick={quitPractice} className="start-stop-button">발표 종료</Button>

          ) : (
            <Button onClick={handleStartRecording} className="start-stop-button">발표 시작</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Practice
