import { FaUserCircle } from "react-icons/fa";
import DashboardBox from "./components/dashboardBox";
import { FaShoppingCart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useState, useEffect } from "react";
import { IoIosTimer } from "react-icons/io";
import Button from "@mui/material/Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Chart } from "react-google-charts";
import WorkIcon from "@mui/icons-material/Work";
import axios from "axios";

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];
export const options = {
  backgroundColor: "transparent",
  chartArea: { width: "100%", height: "100%" },
};

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showBy, setshowBy] = useState("");
  const [dashBoarddata, setDashBoarddata] = useState("");
  const open = Boolean(anchorEl);

  const ITEM_HEIGHT = 48;

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("http://localhost:3010/api/adminDashboard");
      console.log(res.data);
      setDashBoarddata(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="row dashboardBoxWrapperRow">
          <div className="col-md-8">
            <div className="dashboardBoxWrapper d-flex">
              <DashboardBox
                title="Total Customers"
                count={dashBoarddata.totalCustomers}
                color={["#1da256", "#48d483"]}
                icon={<FaUserCircle />}
                grow={true}
              />
              <DashboardBox
                title="Total Orders"
                count={dashBoarddata.totalOrders}
                color={["#c012e2", "#eb64fe"]}
                icon={<FaShoppingCart />}
              />
              <DashboardBox
                title="Total orders Completed"
                count={dashBoarddata.totalOrdersCompleted}
                color={["#2c78e5", "#60aff5"]}
                icon={<WorkIcon />}
              />
              <DashboardBox
                title="Total pending orders"
                count={dashBoarddata.totalPendingOrders}
                color={["#f4cd", "#f3cd29"]}
                icon={<GiStarsStack />}
              />
              <DashboardBox
                title="Total Workers"
                count={dashBoarddata.totalWorkers}
                color={["#e1950e", "#f3cd29"]}
                icon={<GiStarsStack />}
              />

              <DashboardBox
                title="Total Amount"
                count={dashBoarddata.totalAmount}
                color={["#e1950e", "#f3cd29"]}
                icon={<GiStarsStack />}
              />

              <DashboardBox
                title="Total Product"
                count={dashBoarddata.totalProduct}
                color={["#e1950e", "#f3cd29"]}
                icon={<GiStarsStack />}
              />
            </div>
          </div>
          {/* <div className="col-md-4 pl-0">
            <div className="box graphBox">
              <div className="d-flex align -items-center w-100 bottomEle">
                <h6 className="text-white mb-0 mt-0">Total Sales</h6>
              </div>
              <h3 className="text-white font-weight-bold">Rs. 1,50,000</h3>

              <Chart
                chartType="PieChart"
                width="100%"
                height="170px"
                data={data}
                options={options}
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
