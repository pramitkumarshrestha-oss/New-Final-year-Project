import {
  FaUserCircle,
  FaShoppingCart,
  FaShoppingBag,
  FaEye,
  FaPencilAlt,
} from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Workers = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchAllWorkers = async () => {
      try {
        const response = await axios.get("http://localhost:3010/workersList");
        console.log(response.data);
        setWorkers(response.data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };
    fetchAllWorkers();
  }, []);

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4">
        <h5 className="mb-0">Worker Details</h5>
      </div>

      <div className="table-responsive mt-3">
        <table className="table table-bordered v-align">
          <thead className="thead-dark">
            <tr>
              <th>SN</th>
              <th>FULL NAME</th>
              <th>GENDER</th>
              <th>AGE</th>
              <th>JOINED DATE</th>
              <th>ADDRESS</th>
              <th>PHONE NUMBER</th>
              <th>CITIZENSHIP NUMBER</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker, index) => (
              <tr key={worker.id || index}>
                <td>{index + 1}</td>
                <td>
                  <div className="d-flex align-items-center productBox">
                    <div className="info pl-0">
                      <h6>{worker.name || "N/A"}</h6>
                    </div>
                  </div>
                </td>
                <td>{worker.gender || "N/A"}</td>
                <td>{worker.age || "N/A"}</td>
                <td>{worker.joinedDate || "N/A"}</td>
                <td>{worker.address || "N/A"}</td>
                <td>{worker.phoneNumber || "N/A"}</td>
                <td>{worker.citizenshipNumber || "N/A"}</td>
                <td>
                  <div className="actions d-flex align-items-center">
                    <Button className="secondary" color="secondary">
                      <FaEye />
                    </Button>
                    <Button className="success" color="success">
                      <FaPencilAlt />
                    </Button>
                    <Button className="error" color="error">
                      <MdDelete />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link to="/worker/form">
        <button className="circular-button">+</button>
      </Link>
    </div>
  );
};

export default Workers;
