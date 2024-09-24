import React , { useEffect, useState } from "react";
import   NavBar   from "../AdminNavBar";
import ProductCard from "./products/ProductCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from 'react-router-dom';


const Products = () => {

  const [Item, setItem] = useState([]);
  const navigate = useNavigate();
  const [stockItem, setstockItem] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const stockData = await axios.get('http://localhost:5000/api/product/stocks/all');
      const productData = await axios.get('http://localhost:5000/api/product/all');
      setstockItem(stockData.data)
      setItem(productData.data)

    }
    fetchData();
  },[]);
  
  return (
    <>
       <NavBar/>
      <Typography variant="h4" sx={{mt: 6, ml:'8%',  fontFamily: 'inherit',fontWeight:'bold', textAlign: 'left',fontSize:30, display:'inline-block'}}>Your</Typography>
      <Typography variant="h4" sx={{margin: 1,  fontFamily: 'inherit',fontWeight:'bold', fontSize:34, display:'inline-block',color:'#08AEEA'}}>Products</Typography>

      <Typography variant="h4" sx={{ mt: 6, mr:'8%',mb:'8%' ,fontFamily: 'inherit', color:'#2AF598 ', fontWeight: 'bold', fontSize: 30, textAlign: 'right' }}>In Stock</Typography>

       <Box sx={{ flexGrow: 1, mt:'2%', ml: "8%" }}>
      <Grid container spacing={2}>
      
      {stockItem.map((product, index) => (
            <Grid key={index} item xs={4}>
              <ProductCard title={product.productId.name} total={product.total} />
            </Grid>
          ))}
      </Grid>
    </Box>

    <Typography variant="h4" sx={{ mt: 6, mr:'8%',mb:'8%' ,fontFamily: 'inherit',color:"#0388fcff", fontWeight: 'bold', fontSize: 30, textAlign: 'right' }}>All Products</Typography>
    <Box sx={{ flexGrow: 1, mt:'40px', ml: "8%", mb:"1%" }}>
      <Grid container spacing={2}>
      
      {Item.map((product, index) => (
            <Grid key={index} item xs={4}>
              <ProductCard title={product.name} crud={true} id={product._id} />
            </Grid>
          ))}
      </Grid>
    </Box>
    <Tooltip title="Add a Product">
    <Button
            onClick={()=>{
              navigate('/admin/productForm',{state:{action:"Add Product"}})
            }}
              sx={{
                backgroundColor: "aquamarine",
                color: "white",
                m:6,
                mb: 6,
                borderRadius: "60%",
                width: "60px",
                height: "60px",
                position: "absolute",
                right: "54px",
                boxShadow: "0 2px 4px darkslategray",
                ":hover": { backgroundColor: "aquamarine", color: "green" },
              
              }
             
            }
            >
            <AddIcon />
            </Button>
            </Tooltip>
      
    </>
  );
};

export default Products;
