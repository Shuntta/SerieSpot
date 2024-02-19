import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { SidebarData } from "./Sidebar"; // Ajuste conforme necessário
import { IconContext } from "react-icons";
import AutocompleteInput from "./AutocompleteInput"; // Ajuste o caminho conforme necessário
import "../assets/styles/Navbar.css"; // Ajuste conforme necessário
import SearchBar from "./SearchBar";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const handleTitleChange = (title, releaseDate) => {
    console.log("Selected movie:", title, releaseDate);
    // Aqui você pode implementar o que deseja fazer com o título do filme selecionado
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
          <AutocompleteInput onTitleChange={handleTitleChange}/>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                {/* Coloque aqui o botão para fechar o menu, se necessário */}
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
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
