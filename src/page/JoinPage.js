import React, { useState } from 'react'
import logo from '../img/logo.png'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { async } from 'q'


const JoinPage = () => {

  const handleResize = () => {
    window.resizeTo(400, 350) // 페이지의 가로 크기를 400px, 세로 크기를 600px로 변경
  }

  const [id, setId] = useState('');
  const [nickName, setNickName] = useState('');
  const [pwd, setPwd] = useState('');
  const [checkPwd, setCheckPwd] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 아이디가 비어있는지 검사
    if (id.trim() === '') {
      console.log('아이디를 입력해주세요.');
      return;
    }

    if (nickName.trim() === '') {
      console.log('닉네임을 입력해주세요.');
      return;
    }

    if (email.trim() === '') {
      console.log('이메일을 입력해주세요.');
      return;
    }
    if (pwd.trim() === '') {
      console.log('비밀번호를 입력해주세요.');
      return;
    }

    if (checkPwd.trim() === '') {
      console.log('비밀번호 재확인해주세요.');
      return;
    }

    if (checkPwd != pwd) {
      console.log('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/user', { "id": id, "password": pwd, "name": nickName, "email": email });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const idCheck = async (e) => {
    e.preventDefault();

    try {
      const request = await axios.post('http://localhost:3001/user/doubleCheckId', { "id": id });
      if (request.data.data == true) {
        alert('중복된 아이디 입니다.');
      } else {
        alert("사용 가능합니다.");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const nameCheck = async (e) => {
    e.preventDefault();

    try {
      const request = await axios.post('http://localhost:3001/user/doubleCheckName', { "name": nickName });
      if (request.data.data == true) {
        alert('중복된 닉네임 입니다.');
      } else {
        alert("사용 가능합니다.");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const emailCheck = async (e) => {
    e.preventDefault();

    try {
      const request = await axios.post('http://localhost:3001/user/doubleCheckEmail', { "email": email });
      if (request.data.data == true) {
        alert('중복된 이메일 입니다.');
      } else {
        alert("사용 가능합니다.");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="join-container">
      <img src={logo} className="app-logo" alt="logo" width={200} />

      <form onSubmit={handleSubmit}>
        <div className="id-container">
          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            className="join-id-area"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Button className="double-check" onClick={idCheck}>중복 확인</Button>

        </div>
        <div className="nickname-container">
          <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            className="nickname-area"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <Button className="double-check" onClick={nameCheck}>중복 확인</Button>
        </div>
        <div className="email-container">
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            className="email-area"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="double-check" onClick={emailCheck}>중복 확인</Button>
        </div>
        <div className="pwd-container">
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="pwd-area"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호 재확인"
            className="pwd-check-area"
            value={checkPwd}
            onChange={(e) => setCheckPwd(e.target.value)}
          />
        </div>

        <div className="login-button-container">
          <Link to="/login">
            <Button size="lg" className="login-button" onClick={handleResize}>
              로그인 페이지
            </Button>
          </Link>
          <Button size="lg" className="join-button" type='submit'>
            회원가입
          </Button>
        </div>
      </form>
    </div >
  )
}

export default JoinPage
