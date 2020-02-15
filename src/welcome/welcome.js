import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <main>
      <h1>Task Tracker</h1>
      <Link to="/sign">開始使用</Link>
    </main>
  );
}

export {Welcome}