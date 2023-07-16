import React from 'react'
import logo from '../img/logo.png';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    return (
        <Container className='header'>
            <img src={logo} className="app-logo" alt="logo" width={200} />
            <div className="join-div">
                <p className='join-title'>참관코드</p>
                <div className='join-area'>
                    <input type='text' placeholder='참관코드를 입력해주세요' className='join-text'></input>
                    <Button variant='primary' className='join'>참관</Button>
                </div>
                <Button variant="primary" size="lg" className='practice-start'>발표 연습</Button>
            </div>
            <div className='user-info'>
                <FontAwesomeIcon icon={faUser} className='user-img'/>
                내 정보
            </div>
        </Container>

    )
}

export default Header
