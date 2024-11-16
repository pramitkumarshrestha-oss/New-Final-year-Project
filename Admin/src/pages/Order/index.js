import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useEffect, useState } from "react";
import { IoIosTimer } from "react-icons/io";
import Button from "@mui/material/Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Chart } from "react-google-charts";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import chiffonImage from "../../assets/images/Chiffon.jpeg";
import purpleImage from "../../assets/images/purple.jpeg";

import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdOutlineAssignmentInd } from "react-icons/md";
import axios from "axios";
const Order = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3010/list");
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchAllOrders();
  }, []);
  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Order List</h5>
          {orders.map(() => {})}
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Orders</h3>

          <div className="table-responsive mt-3">
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>CUSTOMER NAME</th>
                  <th>PRODUCT NAME</th>
                  <th>WORKERS</th>
                  <th>ORDER ON</th>
                  <th>PRICE IN NRS</th>
                  <th>ITEMS ORDERED</th>
                  <th>ORDER STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Pramit Shrestha</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src={chiffonImage}
                            className="w-100"
                            alt="Chiffon fabric"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Chiffon Fabric</h6>
                        <p>Exclusive chiffon fabric for you to design</p>
                      </div>
                    </div>
                  </td>
                  <td>1</td>

                  <td>2024-05-10</td>

                  <td>Rs 30</td>
                  <td>30</td>
                  <td>True</td>

                  {/* <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td> */}
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <MdOutlineAssignmentInd />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Order;
