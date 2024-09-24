import React, { useState } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container } from "@mui/material";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import InventoryIcon from '@mui/icons-material/Inventory';
import Tooltip from "@mui/material/Tooltip";
import { useNavigate} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import AlertDialog  from "../../../components/dialouge";



const StyledCard = styled(Card)({
  transition: "box-shadow 0.3s",
  "&:hover": {
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  },
});

export default function ProductCard(props) {
  const navigate = useNavigate();
  const [open,isDialougeOpen] = useState(false);
  const handleConfirm = async() => {
    const deletedProduct = await axios.delete(`http://localhost:5000/api/product/${props.id}`)
    const deletedStock = await axios.delete(`http://localhost:5000/api/product/stocks/${deletedProduct.data._id}`)
    isDialougeOpen(false)
    navigate('/admin/home')
  };

  const handleClose = () => {
    isDialougeOpen(false)
  };
  
 
  return (
    <>
    <StyledCard sx={{ maxWidth: 345,m:'3%' }}>
      <Card sx={{ maxWidth: 345, backgroundColor: "black",color:'#2AF598' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="180"
            src={`https://source.unsplash.com/random/?${props.title}`}
            alt={props.title}
          />
          <CardContent>
            <Typography
              gutterBottom={true}
              fontSize={"27px"}
              component="div"
              fontWeight="bold"
              fontFamily={"inherit"}
            >
              {props.title}
            </Typography>
            <Typography
              gutterBottom={true}
              fontSize={"27px"}
              component="div"
              fontWeight="bold"
              fontFamily={"serif"}
              textAlign={"right"}
            >
              {props.total}
            </Typography>
          </CardContent>
          {props.crud === true && (
            <>
            <Container style={{textAlign:'end' , backgroundColor:'aquamarine', paddingRight:0}} >
              <Tooltip title="Update Stock">
                <Button
                  onClick={() => {
                    navigate("/admin/productForm",{state:{action:"Update Stock",_id: props.id, title: props.title}});
                  }}
                  sx={{
                    backgroundColor: "#DDFFBB",
                    color: "black",
                    m: 2,
                    boxShadow: "0 2px 4px darkslategray",
                    ":hover": { backgroundColor: "black", color: "#DDFFBB" },
                 
                    borderRadius: "10%",
                    width: "40px",
                    height: "40px",
                 
                  }}
                >
                  <InventoryIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Double Click To Delete The Product">
                <Button
                  onClick={() => {
                
                    isDialougeOpen(true)

                  }}
                  sx={{
                    backgroundColor: "red",
                    color: "black",
                    m: 2,
                    borderRadius: "10%",
                    width: "40px",
                    height: "40px",
                    alignItems:'right',
                    boxShadow: "0 2px 4px darkslategray",
                    ":hover": { backgroundColor: "black", color: "#d0611e" },
                  }}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
              </Container>
            </>
          )}
        </CardActionArea>
      </Card>
    </StyledCard>
    <AlertDialog 
    isOpen={open}
    title = {"Delete Item Conformation"}
    body = {"Do you really want to delete the item?"}
    onConfirm = {handleConfirm}
    onClose = {handleClose}
    confirmLabel ={"Delete"}
    cancelLabel = {"Cancel"}
    />
    </>
  );
}
