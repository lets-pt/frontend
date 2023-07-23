import React, { useState } from 'react'
import logo from '../img/logo.png'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {

  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 아이디가 비어있는지 검사
    if (id.trim() === '') {
      console.log('아이디를 입력해주세요.');
      return;
    }

    if (pwd.trim() === '') {
      console.log('비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/user/login', { "id": id, "password": pwd });
      console.log(response);
    } catch (error) {
      alert("일치하는 정보가 없습니다.");
    }
  };

  const handleResize = () => {
    window.resizeTo(400, 500)
  }
  return (
    <div className="login-container">
      <img src={logo} className="app-logo" alt="logo" width={200} />
      <form onSubmit={handleSubmit}>
        <div className="id-container">
          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            className="id-area"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="pwd-container">
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="pwd-area"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <div className="login-button-container">
          <Link to="/join">
            <Button size="lg" className="join-button" onClick={handleResize}>
              회원가입
            </Button>
          </Link>
          <Button size="lg" className="login-button" type='submit'>
            로그인
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
