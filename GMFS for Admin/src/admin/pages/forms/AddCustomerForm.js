import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import NavBar from '../../AdminNavBar';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CustomerForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [triggred, setTrigger] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      'name': name,
      'address': address,
      'phoneNumber': phoneNumber,
      'userName': userName,
      'password': password,
    }

    try {
      const options = {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: data,
          url: 'http://localhost:5000/api/customer/',
        };
        
        axios(options);

    } catch(error) {
      console.log(error)
    }
    setTrigger(true)
    setTimeout(() => {
      setTrigger(false)
    }, 2000);
    setName('')
    setAddress('')
    setPhoneNumber('')
    setUserName('')
    setPassword('')
    navigate('/admin/customerTable')
    
   
  }
  return (
    <React.Fragment>
      <NavBar />
      <Typography variant="h4" sx={{ mt: 6, fontFamily: 'inherit', fontWeight: 'medium', fontSize: 35, textAlign: 'center',color:'#2AF598' }}>Add a Customer</Typography>
      <Container maxWidth="lg" sx={{ mt: 9, position: 'absolute', zIndex: -1, left: '50%', transform: 'translateX(-50%)'}}>
      <form  onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid xs={4}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              label="Address"
              fullWidth
              margin="normal"
              required
              variant="outlined"
              value={address}
              onChange={event => setAddress(event.target.value)}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              label="Phone Number"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={phoneNumber}
              onChange={event => setPhoneNumber(event.target.value)}

            />
          </Grid>
          <Grid xs={4}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={userName}
              onChange={event => setUserName(event.target.value)}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              variant="outlined"
              type="password"
              required
              value={password}
              onChange={event => setPassword(event.target.value)}

            />
          </Grid>
        </Grid>
        <Button type='submit' variant="contained" color="success" sx={{ float: 'right', mt: 4, mb: 1 }} size="large">
          Add Customer
        </Button>
      </form>
      </Container>
    </React.Fragment>
  );
}
