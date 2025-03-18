import React from "react";

const Header = () => {
    return (
      <header className="header">
        <div className="logo">
          <h1>My Movie Watchlist</h1>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><a href="#home" className="nav-link">Home</a></li>
            <li className="nav-item"><a href="#about" className="nav-link">About</a></li>
            <li className="nav-item"><a href="#contact" className="nav-link">Contact</a></li>
            <li className="nav-item"><a href="#watchlist" className="nav-link">Watchlist</a></li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;