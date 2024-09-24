import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowCircleBackIcon from '@mui/icons-material/ArrowBack';
import sidebarData from "./AdminSidebarData";
import "./styles/AdminNavbar.css";
import { Typography } from "@mui/material";
import logo from "../login/GMS-logo.png";
import Box from '@mui/material/Box';


const NavBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (

    <div className="header">
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <MenuIcon sx={{ color: 'black',width:'50px' }} onClick={showSidebar} />
        </Link>
        <Typography sx={{ m:"20px",width: '100%', textAlign: 'right', fontFamily: 'inherit', fontSize:"1.5vw",color:'white' }}>
          Garment Management System - Admin Console
        </Typography>
        <Link style={{ textDecoration: 'none' }} to={'/admin/home'} >
        <Box
              component="img"
              sx={{
                height: 50,
                width: 80,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="logo"
              src={logo}
            />
            </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <ArrowCircleBackIcon sx={{ color: 'black' }} />
            </Link>
          </li>
          {sidebarData.map((item, index) => {
            const { title, path, icon, cName } = item;
            return (
              <li key={index} className={cName}>
                <Link to={path}>
                  {icon}
                  <span>{title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

    </div>


  );
};

export default NavBar;
