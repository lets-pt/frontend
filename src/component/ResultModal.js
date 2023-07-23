import React from 'react'
import logo from '../img/logo.png';
import { useDispatch, useSelector } from 'react-redux'
import Modal from "react-modal";
import { Button } from 'react-bootstrap';
import useVideoState from '../hooks/useVideoState';

const ResultModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.resultModal)
  const inputValue = useSelector((state) => state.practiceTitle);
  const { camMediaRecorderRef } = useVideoState();

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

  const openModal = () => {
    dispatch({ type: "MODALOPEN" })
  };

  const closeModal = () => {
    dispatch({ type: "MODALCLOSE" })
  };


  return (
    <Modal isOpen={modal} onRequestClose={closeModal}>
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
  )
}

export default ResultModal
