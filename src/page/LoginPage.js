import React from 'react'
import logo from '../img/logo.png';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPage = () => {

    const handleResize = () => {
        window.resizeTo(400, 500);
    };
    return (
        <div className='login-container'>
            <img src={logo} className="app-logo" alt="logo" width={200} />
            <div className='id-container'>
                <input type='text' placeholder='아이디를 입력해주세요' className='id-area' />
            </div>
            <div className='pwd-container'>
                <input type='password' placeholder='비밀번호를 입력해주세요' className='pwd-area' />
            </div>
            <div className='login-button-container'>
                <Link to="/join">
                    <Button size='lg' className='join-button' onClick={handleResize}>회원가입</Button>
                </Link>
                <Button size='lg' className='login-button'>로그인</Button>
            </div>

        </div>
    )
}

export default LoginPage
