import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();

  // Fetch all workers from the server on initial render
  useEffect(() => {
    const fetchAllWorkers = async () => {
      try {
        const response = await axios.get("http://localhost:3010/workersList");

        setWorkers(response.data); // Update state with the worker data
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };
    fetchAllWorkers();
  }, []);

  // Delete Worker
  const deleteWorker = async (id) => {
    if (!id) {
      console.error("Worker ID is missing.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3010/editWorker/deleteWorker`,
        {
          id,
        }
      );
      console.log(response.data.message); // Log the response message

      // Remove the deleted worker from the local state
      setWorkers(workers.filter((worker) => worker._id !== id)); // Filter workers list to remove the deleted one
    } catch (error) {
      console.error("Error deleting worker:", error);
    }
  };

  //For Editing Worker

  const handleEditWorker = (elem) => {
    navigate("/editWorker", { state: elem });
  };

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
              <th>EMAIL</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker, index) => (
              <tr key={worker._id || index}>
                <td>{index + 1}</td>
                <td>{worker.name || "N/A"}</td>
                <td>{worker.gender || "N/A"}</td>
                <td>{worker.age || "N/A"}</td>
                <td>
                  {worker.joinedDate
                    ? new Date(worker.joinedDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{worker.address || "N/A"}</td>
                <td>{worker.phoneNumber || "N/A"}</td>
                <td>{worker.email || "N/A"}</td>
                <td>
                  <div className="actions d-flex align-items-center">
                    <Button
                      className="success"
                      color="success"
                      onClick={() => handleEditWorker(worker)}
                    >
                      <FaPencilAlt />
                    </Button>
                    <Button
                      className="error"
                      color="error"
                      onClick={() => deleteWorker(worker._id)} // Correctly passing _id to deleteWorker
                    >
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
