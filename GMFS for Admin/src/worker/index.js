import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./Navbar";
import "./index.css";
import { Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';

export default function Index() {
  const { state } = useLocation();

  const { workerId } = state;
  const [Item, setItem] = useState([]);
console.log('d',workerId);
  useEffect(() => {
    async function fetchData() {
      const productData = await axios.get(
        `http://localhost:5000/api/getWorks/${workerId}`
      );
      setItem(productData.data);
    }
    fetchData();
  }, [workerId]);
  return (
    <>
      <NavBar />
      <Typography variant="h4" sx={{margin: 3,marginLeft: 11, marginTop:11,  fontFamily: 'inherit',fontWeight:'bold', fontSize:30, display:'inline-block',color:'#2AF598'}}>तपाईको कारखानाको काम हरु</Typography>

      <div className="c-wrapper-worker">
        {Item &&
          Item.length > 0 &&
          Item.map((i, index) => {
            console.log(i);
            return (
              <div className="worker-card" key={index}>
                <img
                  src={`https://source.unsplash.com/random/?${i.productName}`}
                  alt={i.productName}
                />
                <div>
                  <p>बस्त्रु  : {i.productName}</p>
                  <p>सीलाउने संख्या  : {i.piecesAssigned}</p>
                </div>
                <span className={i.isComplted ? "work-comlete" : "work-incomlete"}>{i.isComplted ? "पुरा" : "अदुरो"}</span>
              </div>
            );
          })}
      </div>
    </>
  );
}
