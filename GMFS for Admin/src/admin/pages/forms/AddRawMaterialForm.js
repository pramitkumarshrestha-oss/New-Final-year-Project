import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import NavBar from '../../AdminNavBar';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Alert from "../../../message/Alert";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RawMaterialForm() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [pricePerQuantity, setPricePerQuantity] = useState('');
  const [triggred, setTrigger] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      'name': name,
      'quantity': quantity,
      'unit': unit,
      'pricePerQuantity': pricePerQuantity,
    }

    try {
      const options = {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: data,
          url: 'http://localhost:5000/api/rawMaterial/',
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
    setUnit('')
    setPricePerQuantity('')
    setQuantity('')
    navigate('/admin/rawMaterialsTable')
    
   
  }
  return (
    <React.Fragment>
      <NavBar />
      <Typography variant="h4" sx={{ mt: 6, fontFamily: 'inherit', fontWeight: 'medium', fontSize: 35, textAlign: 'center',color:'#2AF598' }}>Add a raw material</Typography>
      <Container maxWidth="lg" sx={{ mt: 9, position: 'absolute', zIndex: -1, left: '50%', transform: 'translateX(-50%)'}}>
      <form  onSubmit={handleSubmit}>
      <Alert isTriggred={triggred} title="Raw Material Added Sucessfully" type='success' />

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
              label="Quantity"
              fullWidth
              type="number"
              margin="normal"
              variant="outlined"
              required
              value={quantity}
              onChange={event => setQuantity(event.target.value)}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              label="Unit"
              fullWidth
              margin="normal"
              variant="outlined"
              type="text"
              required
              value={unit}
              onChange={event => setUnit(event.target.value)}

            />
          </Grid>
          <Grid xs={4}>
            <TextField
              label="Price per Quantity"
              fullWidth
              margin="normal"
              variant="outlined"
              type="number"
              required
              value={pricePerQuantity}
              onChange={event => setPricePerQuantity(event.target.value)}

            />
          </Grid>
        </Grid>
        <Button type='submit' variant="contained" color="success" sx={{ float: 'right', mt: 4, mb: 1 }} size="large">
          Add Raw Material
        </Button>
      </form>
      </Container>
    </React.Fragment>
  );
}
