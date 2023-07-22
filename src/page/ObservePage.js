import React from 'react'

const ObservePage = () => {
  const ClosePageButton = () => {
    window.close();
  };

  return (
    <div className='observe-container'>
      <div className='observe-top'>
        <p className='observe-text'>
          발표참관중
        </p>
        <div>
          유저정보 표시
        </div>
      </div>
      <div className='observe-middle'>
        <div className='presenter-pdf'>
          발표자 pdf 파일 표시
        </div>
        <div className='camera'>
          <div className='presenter-camera'>
            발표자 화면 표시
          </div>
          <div className='observer-camera'>
            <div>
              참관자 화면 표시
            </div>
            <div>
              참관자 화면 표시
            </div>
            <div>
              참관자 화면 표시
            </div>
          </div>
        </div>
      </div>
      <div className='observe-bottom'>
        <div>경과시간</div>
        <input type='text' placeholder='코멘트를 입력해주세요' name='comment' />
        <button>전송 버튼</button>
        <button onClick={ClosePageButton}>나가기 버튼</button>
      </div>
    </div>
  )
}

export default ObservePage
