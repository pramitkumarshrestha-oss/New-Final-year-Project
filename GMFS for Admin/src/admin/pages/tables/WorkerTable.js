import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import NavBar from "../../AdminNavBar";
import { Alert, Typography } from "@mui/material";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from 'react-router-dom';
import SnackBar from "../../../components/SnackBar";



export default function WorkerTable() {
  const columns = [
  { field: "_id", hide: true, editable: true },
  {
    field: "id",
    headerName: "SN",
    width: 90,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "name",
    headerName: "Full Name",
    width: 220,
    headerClassName: "super-app-theme--header",
    editable: true,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 130,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 120,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "joinedDate",
    headerName: "Joined Date",
    width: 250,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "address",
    headerName: "Address",
    width: 190,
    headerClassName: "super-app-theme--header",
    editable: true,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 150,
    headerClassName: "super-app-theme--header",
    editable: true,
  },
  {
    field: "userName",
    headerName: "User Name",
    width: 200,
    headerClassName: "super-app-theme--header",
    editable: true,
  },
  {
    field: "citizenshipNumber",
    headerName: "Citizenship Number",
    width: 250,
    headerClassName: "super-app-theme--header",
    editable: true,
  },
  {
    field: "popularity",
    headerName: "Popularity",
    width: 250,
    headerClassName: "super-app-theme--header",
    editable: true,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: "250",
    filterable: false,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      const onUpdateClick = (e) => {
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
          const options = {
            method: "PATCH",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: thisRow,
            url: `http://localhost:5000/api/worker/${thisRow._id}`,
          };

          axios(options);
        } catch (error) {
          console.log(error);
        }
      };

      const onDeleteClick = (e) => {
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

        axios.delete(`http://localhost:5000/api/worker/${thisRow._id}`);
      };

      return (
        <div>
          <Tooltip title="Click to update">
            <Button
              sx={{
                backgroundColor: "#DDFFBB",
                color: "black",
                m: 2,
                boxShadow: "0 2px 4px darkslategray",
                ":hover": { backgroundColor: "black", color: "#DDFFBB" },
              }}
              onClick={onUpdateClick}
            >
              Update
            </Button>
          </Tooltip>
          <Tooltip title="Duoble Click to Delete">
            <Button
              sx={{
                backgroundColor: "red",
                color: "white",
                m: 4,
                boxShadow: "0 2px 4px darkslategray",
                ":hover": { backgroundColor: "white", color: "red" },
              }}
              onDoubleClick={onDeleteClick}
            >
              Delete
            </Button>
          </Tooltip>
        </div>
      );
    },
  },
];
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
   const [open, setIsOpen] = useState(false);
   const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    fetchData();

    async function fetchData() {
      const rows = await axios.get("http://localhost:5000/api/worker");
      //Filtering the object to be matched with the table
      let index = 1;
      await rows.data.forEach((object) => {
        Object.assign(object, { id: index++ });
        console.log(object);
      });
      setWorkers(rows.data);
    }
  }, [open]);

  return (
    <>
      <NavBar />
      <Typography variant="h4" sx={{margin: 3,marginLeft: 11, marginTop:11,  fontFamily: 'inherit',fontWeight:'bold', fontSize:30, display:'inline-block'}}>Worker's </Typography>
      <Typography variant="h4" sx={{margin: -2,  fontFamily: 'inherit',fontWeight:'bold', fontSize:33, display:'inline-block',color:'#2AF598'}}>Details </Typography>
      <Box
        sx={{
          height: 300,
          width: "98%",
          "& .super-app-theme--header": {
            backgroundColor: "#32a9db",
            fontSize: 17,
            color: "white",
          },
        }}
      >
        <div
          style={{
            height: 400,
            width: "89%",
            backgroundColor: "white",
            
         margin:'80px',
            borderColor: "black",
            position:"absolute",
          
          }}
        >
      <SnackBar isOpen={open} autoHideDuration={6000} message="Confrim Action" handleClose={handleClose} />
          <DataGrid
            rows={workers}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[5]}
            headerHeight={80}
          />
          <Tooltip title="Add a Worker">
            <Button
            onClick={()=>{
              navigate('/admin/workerForm')
            }}
              sx={{
                backgroundColor: "#009879",
                color: "white",
                m: 4,
                borderRadius: "60%",
                width: "60px",
                height: "60px",
                position: "absolute",
                right: "-17px",
               
              
                boxShadow: "0 2px 4px darkslategray",
                ":hover": { backgroundColor: "white", color: "#009879" },
              
              }
             
            }
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </div>
      </Box>
    </>
  );
}
