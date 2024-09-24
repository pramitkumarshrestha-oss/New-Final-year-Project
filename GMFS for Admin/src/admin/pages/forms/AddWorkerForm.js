import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import NavBar from '../../AdminNavBar';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Alert from "../../../message/Alert";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function WorkerForm() {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [joinedDate, setJoinedDate] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [triggred, setTrigger] = useState(false);
  const navigate = useNavigate()
  const [citizenshipNumber, setCitizenshipNumber] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(joinedDate);
    const data = {
      'name': name,
      'gender': gender,
      'age': '23',
      'joinedDate': joinedDate,
      'address': address,
      'phoneNumber': phoneNumber,
      'userName': userName,
      'password': password,
      'citizenshipNumber': citizenshipNumber
    }

    try {
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
        url: 'http://localhost:5000/api/worker/',
      };

      axios(options);

    } catch (error) {
      console.log(error)
    }
    setTrigger(true)
    setTimeout(() => {
      setTrigger(false)
    }, 2000);
    setName('')
    setAddress('')
    setCitizenshipNumber('')
    setAge('')
    setPhoneNumber('')
    setGender('')
    setJoinedDate('')
    setUserName('')
    setPassword('')
    navigate('/admin/workerTable')


  }
  return (
    <React.Fragment>
      <NavBar />
      <Typography variant="h4" sx={{ mt: 6, fontFamily: 'inherit', fontWeight: 'medium', fontSize: 35, textAlign: 'center',color:'#2AF598' }}>Add A Worker</Typography>
      <Container maxWidth="lg" sx={{ mt: 9, position: 'absolute', zIndex: -1, left: '50%', transform: 'translateX(-50%)' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid xs={4}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                variant="outlined"
                type="text"
                required
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </Grid>
            <Grid xs={4}>
              <TextField
                label="Age"
                fullWidth
                margin="normal"
                variant="outlined"
                type="number"
                required
                value={age}
                onChange={event => setAge(event.target.value)}
              />
            </Grid>
            <Grid xs={4}>
              <FormControl required>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="male"
                  name="radio-buttons-group"
                  row
                  value={gender}
                  onChange={event => setGender(event.target.value)}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid xs={4}>
              <TextField
                helperText="Employee Joined Date"
                fullWidth
                margin="normal"
                variant="outlined"
                type="date"
                required
                value={joinedDate}
                onChange={event => setJoinedDate(event.target.value)}

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
                type="number"
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
            <Grid xs={4}>

              <TextField
                label="Citizenship Number"
                fullWidth
                margin="normal"
                variant="outlined"
                required
                value={citizenshipNumber}
                onChange={event => setCitizenshipNumber(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button type='submit' variant="contained" color="success" sx={{ float: 'right', mt: 4, mb: 1 }} size="large">
            Add Worker
          </Button>
          <Alert isTriggred={triggred} title="Worker Added Sucessfully" type='success' />
        </form>
      </Container>
    </React.Fragment>
  );
}
