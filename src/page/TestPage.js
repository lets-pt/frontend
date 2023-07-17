import React from 'react';
import { Link } from 'react-router-dom';

const MyComponent = () => {
  return (
    <div>
      <h1>홈 페이지</h1>
      <Link to="/">
        <button>다른 페이지로 이동</button>
      </Link>
    </div>
  );
};

export default MyComponent;