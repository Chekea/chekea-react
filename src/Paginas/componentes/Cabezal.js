import React from "react";
import { AppBar, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Cabezal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const linkStyles = {
    textDecoration: "none",
    margin: 10,
    color: "white",
  };


  return (
    <AppBar position="sticky" color="warning" style={{ top: 0, zIndex: 1000 }}>
      <Toolbar>
        <div
          style={{
            padding: 8,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            overflowX: "hidden",
            justifyContent: "space-around",
            paddingVertical: 16,
          }}
        >
          <Link to="/" style={linkStyles}>
            Nacional
          </Link>
          
          <Link to="/Exterior" style={linkStyles}>
            Exterior
          </Link>
          {/* <Link to="/Ventas" style={linkStyles}>
            Ventas
          </Link> */}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Cabezal;
