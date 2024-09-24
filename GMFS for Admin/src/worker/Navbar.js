import React from "react";
import "./Navbar.css";
import { Typography } from "@mui/material";
import logo from "../login/GMS-logo.png";
import Box from "@mui/material/Box";

const NavBar = () => {

  return (
    <div className="header">
      <div className="navbar-worker">
        <Typography
          sx={{
            m: "20px",
            width: "100%",
            textAlign: "right",
            fontFamily: "inherit",
            fontSize: "1.5vw",
            color: "white",
          }}
        >
          Garment Management System - Worker
        </Typography>
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
      </div>
    </div>
  );
};

export default NavBar;
