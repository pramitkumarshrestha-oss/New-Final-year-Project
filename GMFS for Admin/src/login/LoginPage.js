import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./GMS-logo.png";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { checkUser } from "./Checkuser";
import Alert from "../message/Alert";

const theme = createTheme();

export default function LoginPage() {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await checkUser(emailAddress, password);
    console.log(result._id);
    if (Object.keys(result).length === 8) {
      console.log("Welcome Owner");

      navigate("/admin/home");
    } else if (Object.keys(result).length === 9) {
      localStorage.setItem("customerId", result._id);
      window.location.href = "http://localhost:5001/";
    } else if (Object.keys(result).length === 15) {
      navigate("/worker", { state: { workerId: result._id } });
    } else {
      setTrigger(true);
      setTimeout(() => {
        setTrigger(false);
      }, 2000);
      setEmailAddress("");
      setPassword("");
    }
  };
  const [triggred, setTrigger] = useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random/?garment)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          bgcolor={"#6fa3ff"}
          color={"black"}
          fontStyle={"bold"}
          fontSize={"10 em"}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="logo"
              src={logo}
            />

            <Typography component="h1" variant="h5" sx={{ mt: 3, mb: 4 }}>
              Welcome To Garment Management System
            </Typography>
            <Alert
              isTriggred={triggred}
              title="Invalid Login Cred"
              type="error"
            />
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 3, ml: 5, mr: 5 }}
            >
              <TextField
                sx={{ input: { color: "White" } }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="text"
                autoComplete="text"
                autoFocus
                value={emailAddress}
                onChange={(event) => setEmailAddress(event.target.value)}
              />
              <FormControl sx={{ mt: 3, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password*
                </InputLabel>

                <OutlinedInput
                  sx={{ input: { color: "white", borderRadius: 35 } }}
                  required
                  name="password"
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <Button
                style={{
                  borderRadius: 35,
                  backgroundColor: "black",
                  padding: "15px 40px",
                  fontSize: "18px",
                }}
                type="submit"
                variant="contained"
                sx={{ mt: 8, ml: 10, width: "70%" }}
              >
                Log In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
