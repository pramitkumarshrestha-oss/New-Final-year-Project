
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { MdOutlineAssignmentInd } from "react-icons/md";
import axios from "axios";
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [workerName, setWorkerName] = useState("");
  console.log(orders);
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3010/list");
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  const handleAssign = async (orderId) => {
    try {
      console.log(orderId);
      const response = await axios.post("http://localhost:3010/api/workers", {
        orderId,
      });
      fetchAllOrders();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Order List</h5>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Orders</h3>

          <div className="table-responsive mt-3">
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>CUSTOMER NAME</th>
                  <th>PRODUCT NAME</th>
                  <th>SIZE</th>
                  <th>WORKERS</th>
                  <th>ORDER ON</th>
                  <th>PRICE IN NRS</th>
                  <th>ITEMS ORDERED</th>
                  <th>ORDER STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((info, index) => {
                  return (
                    <tr key={index}>
                      <td>{`${info.deliveryInfo.firstName} ${info.deliveryInfo.lastName}`}</td>
                      <td>
                        <div className="d-flex align-items-center productBox">
                          <div className="info pl-0">
                            {info.orderedItems.map((item, index) => {
                              return <h6 key={index}>{item.name}</h6>;
                            })}
                          </div>
                        </div>
                      </td>
                      <td>{info.orderedItems.map((item, index) => {
                              return <h6 key={index}>{item.size}</h6>;
                            })}</td>
                      <td>{info.assignedWorkerId?.name}</td>
                      {/* <td>1</td> */}

                      <td>{info.createdAt}</td>

                      <td>{info.totalAmount}</td>
                      <td>
                        {info.orderedItems.map((item, index) => {
                          return <h6 key={index}>{item.quantity}</h6>;
                        })}
                      </td>

                      <td>{info.orderStatus}</td>

                      {/* <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td> */}
                      <td>
                        <div className="actions d-flex align-items-center">
                          <Button
                            className="secondary"
                            color="secondary"
                            onClick={() => handleAssign(info._id)}
                          >
                            <MdOutlineAssignmentInd />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Order;
