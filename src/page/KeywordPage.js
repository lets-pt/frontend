import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const KeywordPage = () => {

  const ClosePageButton = () => {
    window.close();
  };

  const handleResize = () => {
    window.resizeTo(400, 500)
  }
  return (
    <div>
      <h2>키워드 등록</h2>
      <div>
        <h2>금지단어</h2>
        <input type='text' />
        <button>
          입력
        </button>
      </div>
      <div>
        <h2>권장단어</h2>
        <input type='text' />
        <button>
          입력
        </button>
      </div>
      <button onClick={ClosePageButton}>나가기</button>
    </div>
  )
}

export default KeywordPage
