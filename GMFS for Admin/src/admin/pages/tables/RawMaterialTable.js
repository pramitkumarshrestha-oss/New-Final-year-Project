import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import NavBar from "../../AdminNavBar";
import {  Typography } from "@mui/material";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import SnackBar from "../../../components/SnackBar";



export default function RawMaterialTable() {
  const columns = [
    { field: "_id", hide: true, editable: true },
    { field: "id", headerName: "SN", width: 150, headerClassName: "super-app-theme--header" },
    { field: "name", headerName: "Item", width: 150, headerClassName: "super-app-theme--header", editable: true },
    { field: "quantity", headerName: "Quantity", type: "number", width: 150, headerClassName: "super-app-theme--header", editable: true },
    { field: "unit", headerName: "Unit", type: "number", width: 150, headerClassName: "super-app-theme--header", editable: true },
    { field: "pricePerQuantity", headerName: "Price Per Quantity", width: 200, headerClassName: "super-app-theme--header", editable: true },
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
            .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
  
          try {
            const options = {
              method: "PATCH",
              headers: { "content-type": "application/x-www-form-urlencoded" },
              data: thisRow,
              url: `http://localhost:5000/api/rawMaterial/${thisRow._id}`,
            };
  
            axios(options);
          } catch (error) {
            console.log(error);
          }
        };
  
        const onDeleteClick = async(e) => {
          setIsOpen(true)
          e.stopPropagation(); // don't select this row after clicking
  
          const api = params.api;
          const thisRow = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
  
           await axios.delete(`http://localhost:5000/api/rawMaterial/${thisRow._id}`);
        };
  
        return (
          <div>
            <Tooltip title="Click to update">
              <Button
                sx={{
                  backgroundColor: "#009879",
                  color: "white",
                  boxShadow: "0 2px 4px darkslategray",
                  ":hover": { backgroundColor: "white", color: "#009879" },
                }}
                onClick={onUpdateClick}
              >
                Update
              </Button>
            </Tooltip>
            <Tooltip title="Duobleclick to Delete">
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
  const [rawMaterials, setRawMaterials] = useState([]);
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
      const rows = await axios.get("http://localhost:5000/api/rawMaterial");
      //Filtering the object to be matched with the table
      let index = 1;
      await rows.data.forEach((object) => {
        Object.assign(object, { id: index++ });
        console.log(object);
      });
      setRawMaterials(rows.data);
    }
  }, [open]);

  return (
    <>
      <NavBar />
      <Typography variant="h4" sx={{ margin: 3, marginLeft: 11, marginTop: 11, fontFamily: "inherit", fontWeight: "bold", fontSize: 30, display: "inline-block" }}>
        Your
      </Typography>
      <Typography variant="h4" sx={{ margin: -2, fontFamily: "inherit", fontWeight: "bold", fontSize: 33, display: "inline-block", color: "#2AF598" }}>
        Raw Material
      </Typography>
      <Box
        sx={{
          height: 300,
          width: "100%",
          "& .super-app-theme--header": {
            backgroundColor: "#32a9db",
            color: "white",
            fontSize: 18,
          },
        }}
      >
      <SnackBar isOpen={open} autoHideDuration={6000} message="COnfrim Action" handleClose={handleClose} />

        <div style={{ height: 420, width: "68%", marginLeft: "256px", borderColor: "black", position: "absolute", fontSize: "80px" }}>
          <DataGrid rows={rawMaterials} columns={columns} pageSize={5} rowsPerPageOptions={[5]} headerHeight={80} />
          <Tooltip title="Add a Raw Material">
            <Button
              onClick={() => {
                navigate("/admin/rawMaterialForm");
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
              }}
            >
              <AddIcon /> 
            </Button>
          </Tooltip>
        </div>
      </Box>
    </>
  );
}
