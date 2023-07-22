import React, { useState } from 'react'
import logo from '../img/logo.png'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'


const JoinPage = () => {

  const handleResize = () => {
    window.resizeTo(400, 350) // 페이지의 가로 크기를 400px, 세로 크기를 600px로 변경
  }

  const [id, setId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 아이디가 비어있는지 검사
    if (id.trim() === '') {
      console.log('아이디를 입력해주세요.');
      return;
    }

    try {
      console.log(id);
      const response = await axios.post('http://localhost:3001/user/doubleCheckId', { id });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="join-container">
      <img src={logo} className="app-logo" alt="logo" width={200} />

      <div className="id-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            className="join-id-area"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Button className="double-check" type='submit'>중복 확인</Button>
        </form>
      </div>
      <div className="nickname-container">
        <input
          type="text"
          placeholder="닉네임을 입력해주세요"
          className="nickname-area"
        />
        <Button className="double-check">중복 확인</Button>
      </div>
      <div className="pwd-container">
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className="pwd-area"
        />
        <input
          type="password"
          placeholder="비밀번호 재확인"
          className="pwd-check-area"
        />
      </div>
      <div className="login-button-container">
        <Link to="/login">
          <Button size="lg" className="login-button" onClick={handleResize}>
            로그인 페이지
          </Button>
        </Link>
        <Button size="lg" className="join-button">
          회원가입
        </Button>
      </div>
    </div >
  )
}

export default JoinPage
