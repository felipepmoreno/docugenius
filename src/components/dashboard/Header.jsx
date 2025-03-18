import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import GenieOrb from '../landing/GenieOrb';
import './Header.scss';

const Header = ({ isProcessing }) => {
  const orbRef = useRef(null);
  
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <Link to="/" className="logo">
          <div className="orb-container" ref={orbRef}>
            {/* Renderize GenieOrb como componente, não como classe */}
            <GenieOrb container={orbRef.current} />
          </div>
          <h1>DocuGenius <span>2.0</span></h1>
        </Link>
      </div>
      
      {/* Resto do código */}
    </header>
  );
};

export default Header;