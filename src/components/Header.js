import React from 'react';
import logoTS_white from '../assets/img/LogoTS-white.png';
import './Header.css';

const Header = () => {
  return (
    <header className="container-fluid">
      <div className="row">
        <div className="col-lg-4">
          <img src={logoTS_white} alt="Logo TechniSupport" className="header-logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
