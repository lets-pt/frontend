import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const useVideoState = () => {
  const dispatch = useDispatch();
  let playing = useSelector(state => state.isPlaying);
  const videoOutputRef = useRef(null);
  const screenRecordedVideoRef = useRef(null);
  const camRecordedVideoRef = useRef(null);
  const screenMediaStreamRef = useRef(null);
  const camMediaStreamRef = useRef(null);
  const screenMediaRecorderRef = useRef(null);
  const camMediaRecorderRef = useRef(null);
  const screenRecordedChunksRef = useRef([]);
  const camRecordedChunksRef = useRef([]);
  const quitFlag = useRef(null); //녹화 종료 버튼 클릭 여부 확인


  const startRecording = () => {
    dispatch({ type: "PLAY" });
    screenRecordedChunksRef.current = [];
    camRecordedChunksRef.current = [];
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
        const camRecordedMediaURL = URL.createObjectURL(camBlob);
        if (screenRecordedVideoRef.current && camRecordedVideoRef.current) { //아무 값도 없을 때 참조 금지
          screenRecordedVideoRef.current.src = screenRecordedMediaURL;
          camRecordedVideoRef.current.src = camRecordedMediaURL;
        }

        console.log(quitFlag);
        if (quitFlag.current === true) { //녹화 종료 버튼이 눌렸을 때만 서버에 데이터 전송
          const formData = new FormData();
          const nowDate = new Date();

          formData.append( //화면 녹화 추가
            'screen',
            screenBlob,
            `screen_userID_${nowDate.getFullYear()}.${nowDate.getMonth() + 1}.${nowDate.getDate()}_${nowDate.getHours()}:${nowDate.getMinutes()}.webm`

          );

          formData.append( //웹캠 녹화 추가
            'cam',
            camBlob,
            `cam_userID_${nowDate.getFullYear()}.${nowDate.getMonth() + 1}.${nowDate.getDate()}_${nowDate.getHours()}:${nowDate.getMinutes()}.webm`
          );
          console.log(formData);

          //영상 서버 전송
          axios.post("http://localhost:3001/ffmpeg/", formData)
            .then((response) => {
              console.log("영상 전송 완료", response.data); // 서버 응답 처리
            })
            .catch((error) => {
              console.error("영상 전송 실패:", error); // 서버 응답 처리
            });
        }
        screenMediaRecorderRef.current = null;
        console.log(screenMediaRecorderRef.current);
        camMediaRecorderRef.current = null;
        console.log(camMediaRecorderRef.current);
      }
    };
    console.log("Recording Start!");
    camMediaRecorderRef.current.start();
    screenMediaRecorderRef.current.start();
    dispatch({ type: "STOP" });
  }

  const stopRecording = () => {
    if (screenMediaRecorderRef.current) {
      camMediaRecorderRef.current.stop();
      screenMediaRecorderRef.current.stop();
      dispatch({ type: "PLAY" });
    }

  }

  const downloadVideo = () => {
    if (screenRecordedChunksRef.current.length > 0) {
      const blob = new Blob(screenRecordedChunksRef.current, { type: "video/webm;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "video.webm";
      link.click();
      URL.revokeObjectURL(url);
    }
  }

  return {
    startRecording,
    stopRecording,
    downloadVideo,
    quitFlag,
    screenMediaStreamRef,
    camMediaStreamRef,
    videoOutputRef,
    camMediaRecorderRef,
    playing,
  }


}

export default useVideoState;