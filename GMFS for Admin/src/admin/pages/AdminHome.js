import React , { useEffect, useState }from "react";
import NavBar from "../AdminNavBar";
import Card from "./Card";
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";
import  BarChart  from "./BarChart";
import axios from 'axios';
import { Link } from 'react-router-dom';


const Home = () => {
  const [result, setResult] = useState();
  const [raw, setRaw] = useState();
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get('http://localhost:5000/api/getNumber');
      const rawMat = await axios.get('http://localhost:5000/api/rawMaterial')
      setResult(data)
      setRaw(rawMat.data)
     
    }
    fetchData();
  },[]);
  
 
  return (
    <>
      <NavBar />
      <Typography variant="h4" sx={{margin: 3,  fontFamily: 'inherit',fontWeight:'bold', fontSize:30, display:'inline-block'}}>Welcome </Typography>
      <Typography variant="h4" sx={{margin: -2,  fontFamily: 'inherit',fontWeight:'bold', fontSize:37, display:'inline-block',color:'#2AF598'}}>Admin!! </Typography>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={4}  >
          <Link style={{ textDecoration: 'none' }} to={'/admin/workerTable'} >
          {result && <Card   title="Worker" category={'worker'} number={result.data[0]} detail={`There ${result.data[0]} workers currently in your Garment`} />}
          </Link>
        </Grid>
        <Grid item xs={4}>
        <Link style={{ textDecoration: 'none' }} to={'/admin/customerTable'} >
        {result && <Card title="Customer" number={result.data[1]} category={'customer'} detail={`There are ${result.data[1]} customers currently in your Garment`} />}
        </Link>
        </Grid>
        <Grid item xs={4}>
        <Link style={{ textDecoration: 'none' }} to={'/admin/orderTable'} >
        {result && <Card title="Orders" number={result.data[2]} category={'order'} detail={`There are ${result.data[2]} orders currently in your Garment`} />}
        </Link>
        </Grid>
        <Grid item xs={4}>
        <Link style={{ textDecoration: 'none' }} to={'/admin/rawMaterialsTable'} >
        {result && <Card title="Raw Materials" number={result.data[3]} category={'stock'} detail={`There are ${result.data[3]} raw materials currently in your Garment`} />}
        </Link>
        </Grid>
        <Grid item xs={4}>
        <Link style={{ textDecoration: 'none' }} to={'/admin/products'} >
        {result && <Card title="Stock" number={result.data[4]} category={'garment'} detail={`There are ${result.data[4]} stock items currently in your Garment`} />}
        </Link>
        </Grid>
        <Grid item xs={4}>
        <Link style={{ textDecoration: 'none' }} to={'/admin/products'} >
        {result && <Card  title="Product" number={result.data[5]} detail={`There are ${result.data[5]} products currently in your Garment`}/>}
        </Link>
        </Grid>
      
        <Grid item xs={12}>
         { raw && <BarChart data={raw} />}
        </Grid>
      
      </Grid>     
    
    </>


  );
};

export default Home;
