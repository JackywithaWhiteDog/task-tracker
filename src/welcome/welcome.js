import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <main>
      <h1>Task Tracker</h1>
      <Link to="/sign/signup">註冊</Link>
      <Link to="/sign/signin">登入</Link>
    </main>
  );
}

export {Welcome}