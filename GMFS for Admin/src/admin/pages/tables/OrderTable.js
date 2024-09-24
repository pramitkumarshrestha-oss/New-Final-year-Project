import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import NavBar from '../../AdminNavBar';
import { Typography } from "@mui/material";
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from 'react-router-dom';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SnackBar from "../../../components/SnackBar";
import Alert from "../../../components/SnackBar";


export default function OrderTable() {
  

const columns = [
  { field: "_id", hide: true, editable: true },
  { field: 'id', headerName: 'SN', width: 100, headerClassName: 'super-app-theme--header' },
  { field: 'customerID', headerName: 'Customer Name', width: 200, headerClassName: 'super-app-theme--header' },
  { field: 'productID', headerName: 'Product Name', width: 190, headerClassName: 'super-app-theme--header' },
  { field: 'workerId', headerName: 'Workers', width: 250,headerClassName: 'super-app-theme--header'  },
  { field: 'updatedAt', headerName: 'Ordered On', width: 200 ,headerClassName: 'super-app-theme--header' },
  { field: 'totalPrice', headerName: 'Price in Nrs', width: 150 ,headerClassName: 'super-app-theme--header' },
  { field: 'totalItem', headerName: 'Items Ordered', width: 150 ,headerClassName: 'super-app-theme--header' },
  { field: 'isCompleted', headerName: 'Order Status', width: 150 ,headerClassName: 'super-app-theme--header'},
  { field: 'workersNumber', headerName: 'Worker Number', width: 150 ,headerClassName: 'super-app-theme--header',editable: true,   type: "number",},
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: "250",
    filterable: false,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      const onUpdateClick = async(e) => {
        setIsOpen(true)
        e.stopPropagation(); // don't select this row after clicking
        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );
          
           
        try {
          const test = await axios.get(`http://localhost:5000/api/getWorkers/${thisRow.workersNumber}`)
          const data = {
            workerId: test.data
          }
          
          const options = {
            method: "PATCH",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: data,
            url: `http://localhost:5000/api/order/customOrder/${thisRow._id}`,
          };

          axios(options);
          
          // setTrigger(true)
          // setTimeout(() => {
          //   setTrigger(false)
          // }, 2000);
        
        } catch (error) {
          console.log(error);
        }
      };

      const onDeleteClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking
        setIsOpen(true)
        const api = params.api;
        const thisRow = {};
        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );

        const data = {
          isCompleted: true,
        }
        const options = {
          method: "PATCH",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: data,
          url: `http://localhost:5000/api/order/customOrder/${thisRow._id}`,
        };

        axios(options);

      };
      return (
        <div>

          <Tooltip title="Auto Assign Workers">
            <Button
                sx={{
                  backgroundColor: "#009879",
                  color: "white",
                  boxShadow: "0 2px 4px darkslategray",
                  ":hover": { backgroundColor: "white", color: "#009879" },
                }}
                onClick={onUpdateClick}
            >
              <EngineeringIcon/>
            </Button>
          </Tooltip>
          <Tooltip title="Double Click to Mark as Done">
            <Button
            disabled={params.isCompleted? true : false}
             sx={{
              backgroundColor: "yellow",
              color: "blue",
              m: 4,
              boxShadow: "0 2px 4px darkslategray",
              ":hover": { backgroundColor: "white", color: "green" },
            }}
            onDoubleClick={onDeleteClick}
            >
             <CheckCircleIcon/>
            </Button>
          </Tooltip>
        </div>
      );
    },
  },
];
  const [customer, setCustomer] = useState([]);
  const [open, setIsOpen] = useState(false);
   const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
  };
  const name = ["Ajit","Rojesh","Satish","Manish","Shirish"]
  const nameArray = []
  useEffect(() => {
    fetchData()

    async function fetchData() {

      const rows = await axios.get('http://localhost:5000/api/order/customOrder');
      //console.log(rows.data[0].workerId);
      //rows.data.map((order)=>{
      //  order.workerId.map((e)=>{
      //       const randomNumber = Math.floor(Math.random() * 5);
      //  nameArray.push(name[randomNumber])
      //  })
      //})
    
      let index = 1
      await rows.data.forEach((object) => {
        Object.assign(object, { id: index++ });
        Object.assign(object,{productID:object?.productID?.name})
        Object.assign(object,{customerID:object?.customerID?.name})
        // Object.assign(object,{workerId:object.workerId.name})
        // console.log(typeof object.workerId.name);
      },
      )
      setCustomer(rows.data)
    }
    
  }, [open])


  return (
    <>
      <NavBar />
      <Typography variant="h4" sx={{margin: 3,marginLeft: 11, marginTop:11,  fontFamily: 'inherit',fontWeight:'bold', fontSize:30, display:'inline-block'}}>Your </Typography>
      <Typography variant="h4" sx={{margin: -2,  fontFamily: 'inherit',fontWeight:'bold', fontSize:33, display:'inline-block',color:'#2AF598'}}>Orders</Typography>
      <SnackBar isOpen={open} autoHideDuration={6000} message="Confrim Action" handleClose={handleClose} />
      <Box
      sx={{
        height: 300,
        width: '100%',
        
        '& .super-app-theme--header': {
          backgroundColor: '#32a9db',
          color:'white',
          fontSize: 18
        },
      }}
    >
      <SnackBar isOpen={open} autoHideDuration={6000} message="Complete Action?" handleClose={handleClose} />
           <div style={{ height: 420, width: '88%', margin: '85px', borderColor: 'black',  position:"absolute", fontSize: '80px'
          }}>
        <DataGrid
          rows={customer}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          headerHeight= {80}
        />
      </div>
      </Box>
    </>
  );
}