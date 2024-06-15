import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ClearIcon from "@mui/icons-material/Clear";

const Navbar = ({ handleSidebarToggle }) => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setIsSearchBarVisible(true);
        setIsMobileSearchActive(false);
      } else {
        setIsSearchBarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchIconClick = () => {
    setIsMobileSearchActive(true);
  };

  const handleMobileSearchClose = () => {
    setIsMobileSearchActive(false);
  };

  return (
    <nav className="navbar-container">
      <div
        className="menu"
        aria-expanded="true"
        aria-label="Main Menu"
        role="button"
        tabIndex="0"
        onClick={handleSidebarToggle}
      >
        <MenuIcon />
      </div>

      <div className="logo">
        <p>LOGO</p>
      </div>

      <div className="icons2">
        <div className="logout">
          <LogoutIcon />
        </div>
      </div>

      {isMobileSearchActive && (
        <div className="mobile-search-bar">
          <SearchBar />
          <button className="close-search" onClick={handleMobileSearchClose}>
            <ClearIcon />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
