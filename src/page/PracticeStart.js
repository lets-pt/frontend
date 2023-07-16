import React, { useEffect, useRef } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PracticeStart = () => {
  const videoOutputRef = useRef(null);
  const recordedVideoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

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
    mediaRecorderRef.current = new MediaRecorder(mediaStreamRef.current, {
      mimeType: "video/webm",
    });

    mediaRecorderRef.current.ondataavailable = function (event) {
      if (event.data && event.data.size > 0) {
        console.log("ondataavailable");
        recordedChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = function () {
      if (recordedChunksRef.current.length > 0) {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm;" });
        const recordedMediaURL = URL.createObjectURL(blob);
        recordedVideoRef.current.src = recordedMediaURL;
      }
    };

    mediaRecorderRef.current.start();
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      const formData = new FormData();
      const blob = new Blob(recordedChunksRef.current, { type: "video/webm;" });
      formData.append(
        "video",
        blob,
        `userID_${new Date().toLocaleString()}.webm`
      );
      fetch("http://localhost:3000/s3/", {
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
    <Container className="practice-area">
      <div className="section">
        <video ref={videoOutputRef}></video>
        <br />
        <Button onClick={handleStartRecording}>녹화 시작</Button>
        <Button onClick={handleStopRecording}>녹화 종료</Button>
      </div>
      <div className="section">
        <video ref={recordedVideoRef} controls></video>
        <br />
        <Button onClick={handleDownload}>다운로드</Button>
      </div>
    </Container>
  );
};

export default PracticeStart;
