import React from 'react'
import { Button, Container } from 'react-bootstrap'

const Script = () => {
    return (
        <Container className='script-container'>
            <h1>스크립트 다듬기</h1>
            <div className='script-area'>
                <div>
                    <textarea className='script-text' placeholder='스크립트의 다듬고 싶은 부분을 작성해주세요!'></textarea>
                </div>
                <div>
                    <Button variant='primary' size='lg' className='script-change'>변환하기</Button>
                </div>
                <div>
                    <textarea className='script-text' readOnly></textarea>
                </div>

            </div>
        </Container>
    )
}

export default Script
