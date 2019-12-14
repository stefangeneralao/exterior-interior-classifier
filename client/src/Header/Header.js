import React from 'react';
import './Header.scss';

function Header({ children }) {
  return (
    <header>
      <h1>{ children }</h1>
    </header>
  );
}

export default Header;