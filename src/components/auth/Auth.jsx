import React from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import { AuthService } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function Auth() {
  const credentials = {
    username: "jackyhtg",
    pass: "12345678",
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e?.target?.elements?.username?.value;
    const pass = e?.target?.elements?.pass?.value;
    const response = await AuthService.login(username, pass);

    if (response === true) {
      navigate("/customers");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 20 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              autoComplete="username"
              value={credentials.username}
              name="username"
              size="small"
              sx={{ borderRadius: 3 }}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              autoComplete="current-password"
              value={credentials.pass}
              name="pass"
              size="small"
              sx={{ borderRadius: 3 }}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{ borderRadius: 3 }}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Auth;
