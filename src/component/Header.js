import React, { useState } from 'react'
import logo from '../img/logo.png';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        goToLoginPage();
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const goToLoginPage = () => {
        const width = 400;
        const height = 300;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        window.open(
            '/login',
            '_blank',
            `width=${width}, height=${height}, left=${left}, top=${top}, resizable=no, scrollbars=yes`
        );
    }

    const goToPracticePage = () => {
        const width = 1200;
        const height = 800;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        window.open(
            '/practice',
            '_blank',
            `width=${width}, height=${height}, left=${left}, top=${top}, resizable=no, scrollbars=yes`
        );
    }

    const goToObservePage = () => {
        const width = 1200;
        const height = 800;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        window.open(
            '/Observe',
            '_blank',
            `width=${width}, height=${height}, left=${left}, top=${top}, resizable=no, scrollbars=yes`
        );
    }

    return (
        <Container className='header'>
            <img src={logo} className="app-logo" alt="logo" width={200} />
            <div className="join-div">
                <p className='join-title'>참관코드</p>
                <div className='join-area'>
                    <input type='text' placeholder='참관코드를 입력해주세요' className='join-text'></input>
                    <Button variant='primary' className='join' onClick={goToObservePage}>참관</Button>
                </div>
                <Button variant='primary' className='join' size='lg' onClick={goToPracticePage}>발표 연습</Button>
            </div>
            {isLoggedIn ? (
                <div className='user-info' onClick={handleLogout}>
                    <FontAwesomeIcon icon={faUser} className='user-img' />
                    내 정보
                </div>
            ) : (
                <div className='user-info' onClick={handleLogin}>
                    <FontAwesomeIcon icon={faUser} className='user-img' />
                    로그인
                </div>
            )}

        </Container>

    )
}

export default Header
