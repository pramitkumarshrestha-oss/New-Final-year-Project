import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import NavBar from '../../AdminNavBar';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Alert from "../../../message/Alert";
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';

export default function ProductForm() {
  const [name, setName] = useState('');
  const [same, setSame] = useState('ss');
  const [total, setTotal] = useState('');
  const [price,setPrice] = useState('')
  const [description,setDescription] = useState('')

  const [triggred, setTrigger] = useState(false);
  const navigate = useNavigate()
  const { state } = useLocation();

  const { action,_id,title } = state;



  console.log(action,_id,title);

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(action === "Add Product"){
      const product = {
        'name': name,
        'price':price,
        'description':description
      } 


      try {
        const postProduct = {
            method: 'POST',  //url mai post ki atch bhanera dekha
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: product,
            url: 'http://localhost:5000/api/product',
          };
          
          const postedProduct = await axios(postProduct); //dimag laga
  
          const stock = {
            'productId': postedProduct.data._id,
            'total': total,
          }
      
  
          const postStock = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: stock,
            url: 'http://localhost:5000/api/product/stocks',
          };
          
          axios(postStock);
  
      } catch(error) {
        console.log(error)
      }

    }else{
      console.log("aako chu");
      const productUpdate = {
        'total': total,
        'price':price,
        'description':description
      }
      

      const patchStock = {
        method: 'PATCH',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: productUpdate,
        url: `http://localhost:5000/api/product/stocks/${_id}`,
      };
      console.log( `http://localhost:5000/api/product/stocks/${_id}`);
      const test = await axios(patchStock);
      console.log('test',test);
      if (test.data === null) {
              const stock = {
        'productId': _id,
        'total': total,
      }
  

      const postStock = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: stock,
        url: 'http://localhost:5000/api/product/stocks',
      };
      
      axios(postStock);
      }



    }  
    setTrigger(true)
    setTimeout(() => {
      setTrigger(false)
    }, 2000);
    setName('')
    setTotal('')
    navigate('/admin/products')
    
   
  }
  return (
    <React.Fragment>
      <NavBar />
      <Typography variant="h4" sx={{ mt: 6, fontFamily: 'inherit', fontWeight: 'medium', fontSize: 35, textAlign: 'center',color:'#2AF598' }}>{action === "Update Stock" ? "Update Product Stock" : "Add A Product" }</Typography>
      <Container maxWidth="lg" sx={{ mt: 9,position: 'absolute', zIndex: -1, left: '50%', transform: 'translateX(-50%)'}}>
      <form  onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid xs={4}>
            <TextField
              label={action === "Update Stock" ? title : "Product Name" }
              fullWidth
              margin="normal"
              variant="outlined"
              disabled={action === "Update Stock" ? true : false }
              required
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              label="Total"
              fullWidth
              margin="normal"
              type="number"
              variant="outlined"
              required
              value={total}
              onChange={event => setTotal(event.target.value)}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              label="Price"
              fullWidth
              margin="normal"
              type="number"
              disabled={action === "Update Stock" ? true : false }
              variant="outlined"
              required
              value={price}
              onChange={event => setPrice(event.target.value)}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </Grid>
        </Grid>
        <Button type='submit' variant="contained" color="success" sx={{ float: 'right', mt: 4, mb: 1 }} size="large">
          {action}
        </Button>
        <Alert isTriggred={triggred} title="Worker Added Sucessfully" type='success' />
      </form>
      </Container>
    </React.Fragment>
  );
}
