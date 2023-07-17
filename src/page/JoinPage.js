import React from 'react'
import logo from '../img/logo.png';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const JoinPage = () => {

    const handleResize = () => {
        window.resizeTo(400, 350); // 페이지의 가로 크기를 400px, 세로 크기를 600px로 변경
      };

    return (
        <div className='join-container'>
            <img src={logo} className="app-logo" alt="logo" width={200} />
            <div className='id-container'>
                <input type='text' placeholder='아이디를 입력해주세요' className='join-id-area' />
                <Button className='double-check'>중복 확인</Button>
            </div>
            <div className='nickname-container'>
                <input type='text' placeholder='닉네임을 입력해주세요' className='nickname-area' />
                <Button className='double-check'>중복 확인</Button>
            </div>
            <div className='pwd-container'>
                <input type='password' placeholder='비밀번호를 입력해주세요' className='pwd-area' />
                <input type='password' placeholder='비밀번호 재확인' className='pwd-check-area' />
            </div>
            <div className='login-button-container'>
                <Link to='/login'>
                    <Button size='lg' className='login-button' onClick={handleResize}>로그인 페이지</Button>
                </Link>
                <Button size='lg' className='join-button'>회원가입</Button>
            </div>

        </div>
    )
}

export default JoinPage
