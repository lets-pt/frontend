import React, { useEffect } from 'react'
import PdfUpload from './PdfUpload'
import useVideoState from '../hooks/useVideoState'
import { Button } from 'react-bootstrap'
import useTimerState from '../hooks/useTimerState'
import { useDispatch, useSelector } from 'react-redux'


const PdfUploadMemoized = React.memo(PdfUpload)

const Practice = () => {
  const { startRecording, stopRecording, camMediaStreamRef, screenMediaStreamRef, quitFlag, videoOutputRef, playing } = useVideoState();
  const { startTimer, stopTimer, minutes, seconds } = useTimerState();
  const dispatch = useDispatch();
  const inputValue = useSelector((state) => state.practiceTitle);

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

  const titleChange = (event) => {
    const newInputValue = event.target.value;
    dispatch({ type: "PRACTICETITLE", payload: newInputValue });
  };

  const startPractice = () => {
    startRecording();
    startTimer();
  }

  const quitPractice = () => {
    quitFlag.current = true;
    stopRecording();
    stopTimer();
    openModal();
  }

  const openModal = () => {
    dispatch({ type: "MODALOPEN" })
  };

  return (
    <div>
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
            <input type="text" className="practice-title" placeholder="발표 제목을 입력해주세요" value={inputValue} onChange={(e) => titleChange(e)} />
          )}

          <br />
          {playing ? (

            <Button variant="danger" onClick={quitPractice} className="start-stop-button">발표 종료</Button>

          ) : (
            <Button onClick={startPractice} className="start-stop-button">발표 시작</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Practice
