import React from "react";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import PropTypes from "prop-types";
function Navbar({ handleLogout }) {
  Navbar.propTypes = {
    handleLogout: PropTypes.func.isRequired,
  };
  return (
    <AppBar
      data-testid="navbar"
      sx={{
        backgroundColor: "black",
      }}
      position="sticky"
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Customers</Typography>
          <Button
            variant="outlined"
            sx={{ color: "white", borderColor: "white" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
