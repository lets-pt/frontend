import React, { useEffect, useRef, useState } from "react";
import { FaStop } from 'react-icons/fa';
import KeywordPage from "./KeywordPage";
import Timer from "../component/Timer";
import useVideoState from "../hooks/useVideoState";
import useTimerState from '../hooks/useTimerState';
import ResultModal from "../component/ResultModal";
import Practice from "../component/Practice";
import { useDispatch, useSelector } from "react-redux";
import Real from "../component/Real";


const PracticeStart = () => {
    const { startRecording, stopRecording, quitFlag, screenMediaStreamRef, camMediaStreamRef, videoOutputRef, playing } = useVideoState();
    const { startTimer, stopTimer, minutes, seconds } = useTimerState();
    const dispatch = useDispatch();
    const changeMode = useSelector((state) => state.practice)

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

    const stopPractice = () => {
        stopRecording();
        stopTimer();
    }

    const openReal = () => {
        dispatch({ type: "CHANGETOREAL" })
    }

    const openPractice = () => {
        dispatch({ type: "CHANGETOPRACTICE" })
    }

    //영상 녹화에 필요한 권한 요청하기

    return (
        <div className="practice-container">
            <div className="practice-top">
                <div>
                    <Timer time={{ minutes, seconds }} />
                </div>
                <button onClick={stopPractice}>
                    <FaStop /> 정지
                </button>
                <button onClick={openPractice}>
                    연습모드
                </button>
                <button onClick={openReal}>
                    실전모드
                </button>
                <button onClick={goToKeywordPage}>키워드 등록</button>

            </div>
            {changeMode ? (
                <Practice />
            ) : (
                <Real />
            )}

            <ResultModal />
        </div>
    );
};

export default PracticeStart;
