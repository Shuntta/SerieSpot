import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import AutocompleteInput from "./AutocompleteInput";
import "../assets/styles/Navbar.css";
import { SidebarData } from "./Sidebar"; 

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const isLoggedIn = localStorage.getItem("userId") !== null;

  const showSidebar = () => setSidebar(!sidebar);

  const handleTitleChange = (title, releaseDate) => {
    console.log("Selected movie:", title, releaseDate);
  };
  const handleLogoutClick = (title) => {
    if (title === "Logout") {
      localStorage.clear();
    }
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <Link to="/" className="logo">
            SerieSpot
          </Link>
          <AutocompleteInput onTitleChange={handleTitleChange} />
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              if ((isLoggedIn && item.title === "Login") || (!isLoggedIn && item.title === "My Series")) {
                return null;
              }
              if (!isLoggedIn && item.title === "Logout") {
                return null;
              }
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} onClick={() => handleLogoutClick(item.title)}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;

