// importing dependencies
import React from 'react'
import { Bar } from 'react-chartjs-2'
/* eslint-disable no-unused-vars */
import { Chart } from 'chart.js/auto'
/* eslint-enable no-unused-vars */
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";
import { Link } from 'react-router-dom';


export default function BarChart(props) {
  let labelArr = props.data.map(e => e.name)
  let quantityArr = props.data.map(e => e.quantity)
  const data = {
    labels: labelArr,
    datasets: [
      {
        label: 'Raw Material Quantity',  
        backgroundColor: '#2AF598',
        borderColor: '#2AF598',
        borderWidth: 2,
        hoverBackgroundColor: '#2AF599',
        hoverBorderColor: '#08AEEA',
        data: quantityArr
      }
    ]
  };
  return (
    <>
      <Link style={{ textDecoration: 'none' }} to={'/admin/rawMaterialsTable'} >
      <Typography variant="h5" sx={{ margin: 5, fontFamily: 'inherit', fontWeight: 'medium', fontSize: 28, color:'#08AEEA',textAlign:'center' }}>Your Raw Material Details</Typography>
      </Link>
      <Container sx={{ maxWidth: '150px', width: '100%', display: 'inline-block',marginTop:5,marginLeft:"100px" }}>
        <Bar
          height={7 > 4 ? (7 * 40) + 70 : 225}
          data={data}
          options={{
            plugins:{
              tooltip:{
                callbacks:{
                  beforeTitle: function(context){
                    return 'The units are bundel, piece and than'
                  }
                }
              }
            },
            maintainAspectRatio: false,
            indexAxis: 'y',
            skipNull: true,
            color: 'black',
            borderColor: '#08AEEA',
            scales: {
              y: {
                grid: {
                  drawBorder: true,
                  color: (context) => {
                    if (context.index === undefined) {
                      return '#08AEEA'
                    }
                    return 'transparent'
                  },
                },
              },
              x: {
                grid: {
                  color: (context) => {
                    if (context.index === 0) {
                      return '#08AEEA'
                    }
                    return 'transparent'
                  },
                },
              },
            },
          }}
        />
      </Container>
    </>
  )
}