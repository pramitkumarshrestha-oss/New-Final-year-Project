import { FaUserCircle } from "react-icons/fa";
import DashboardBox from "./components/dashboardBox";
import { FaShoppingCart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useState } from "react";
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
  const [showBysetCatBy, setCatBy] = useState("");
  const open = Boolean(anchorEl);

  const ITEM_HEIGHT = 48;

  // const context = useContext(MyContext);

  // useEfffect(()=>{
  //   context.setisHideSidebarAndHeader(false);
  //   window.scrollTo(0,0);
  // },[]);

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
                title="Total Users"
                count="277"
                color={["#1da256", "#48d483"]}
                icon={<FaUserCircle />}
                grow={true}
              />
              <DashboardBox
                title="New Orders"
                count="112"
                color={["#c012e2", "#eb64fe"]}
                icon={<FaShoppingCart />}
              />
              <DashboardBox
                title="Feedbacks"
                count="350"
                color={["#2c78e5", "#60aff5"]}
                icon={<FaShoppingBag />}
              />
              <DashboardBox
                color={["#e1950e", "#f3cd29"]}
                icon={<GiStarsStack />}
              />
            </div>
          </div>
          <div className="col-md-4 pl-0">
            <div className="box graphBox">
              <div className="d-flex align -items-center w-100 bottomEle">
                <h6 className="text-white mb-0 mt-0">Total Sales</h6>
                <div className="ml-auto">
                  <Button className="ml-auto toggleIcon" onClick={handleClick}>
                    <BsThreeDotsVertical />
                  </Button>
                  <Menu
                    className="dropdown_menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    // open={open}
                    onClose={handleClose}
                    slotProps={{
                      paper: {
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      },
                    }}
                  >
                    <MenuItem onclick={handleClose}>
                      <IoIosTimer /> Last Day
                    </MenuItem>
                    <MenuItem onclick={handleClose}>
                      <IoIosTimer /> Last Week
                    </MenuItem>
                    <MenuItem onclick={handleClose}>
                      <IoIosTimer /> Last Month
                    </MenuItem>
                    <MenuItem onclick={handleClose}>
                      <IoIosTimer /> Last Year
                    </MenuItem>
                  </Menu>
                </div>
              </div>
              <h3 className="text-white font-weight-bold">$3,787,681.00</h3>
              <p>$3,578.90 in last month</p>
              <Chart
                chartType="PieChart"
                width="100%"
                height="170px"
                data={data}
                options={options}
              />
            </div>
          </div>
        </div>
        {/* <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Best Selling Products</h3>

          <div className="row cardFilters mt-3">
            <div className="col-md-3">
              <h4>SHOW BY</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={showBy}
                  onChange={(e) => setshowBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="col-md-3">
              <h4>CATEGORY BY</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={showBysetCatBy}
                  onChange={(e) => setCatBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div> */}

          {/* <div className="table-responsive mt-3">
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th>PRODUCT</th>
                  <th>CATEGORY</th>
                  <th>PRICE</th>
                  <th>STOCK</th>
                  <th>RATING</th>
                  <th>ORDER</th>
                  <th>SALES</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>#1</td>
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
                  <td>unisex</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$25.00</del>
                      <span className="new text-danger">$21.00</span>
                    </div>
                  </td>
                  <td>30</td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="sucess" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#2</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://i.pinimg.com/564x/78/8c/25/788c25a443eda71fe92bcbc70947e755.jpg"
                            className="w-100"
                            alt="Chiffon fabric"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Japanese Silk Fabric</h6>
                        <p>Exclusive Japanese silk fabric for you to design</p>
                      </div>
                    </div>
                  </td>
                  <td>unisex</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$25.00</del>
                      <span className="new text-danger">$21.00</span>
                    </div>
                  </td>
                  <td>30</td>
                  <td>5.0(15)</td>
                  <td>300</td>
                  <td>$35k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="sucess" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#3</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://i.pinimg.com/564x/a2/a0/f5/a2a0f5fd0eef47068273927da6033733.jpg"
                            className="w-100"
                            alt="Linen fabric"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Linen Fabric</h6>
                        <p>Exclusive Linen fabric for you to design</p>
                      </div>
                    </div>
                  </td>
                  <td>unisex</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$20.00</del>
                      <span className="new text-danger">$18.00</span>
                    </div>
                  </td>
                  <td>20</td>
                  <td>4.9(16)</td>
                  <td>400</td>
                  <td>$48k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="sucess" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#4</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://i.pinimg.com/564x/3a/0f/a4/3a0fa4c15bda6eb2b940d4231267839b.jpg"
                            className="w-100"
                            alt="Chiffon fabric"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Silk Fabric</h6>
                        <p>Exclusive chiffon fabric for you to design</p>
                      </div>
                    </div>
                  </td>
                  <td>unisex</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$20.00</del>
                      <span className="new text-danger">$15.00</span>
                    </div>
                  </td>
                  <td>39</td>
                  <td>4.5(20)</td>
                  <td>500</td>
                  <td>$40k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="sucess" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#5</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://i.pinimg.com/564x/84/be/67/84be67418559581d5d55895f947fa4c0.jpg"
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
                  <td>unisex</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$28.00</del>
                      <span className="new text-danger">$25.00</span>
                    </div>
                  </td>
                  <td>50</td>
                  <td>5.0(18)</td>
                  <td>600</td>
                  <td>$50k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="sucess" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#6</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://i.pinimg.com/564x/86/38/6e/86386e7d34236c3c1b216e29d6a48177.jpg"
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
                  <td>unisex</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$25.00</del>
                      <span className="new text-danger">$21.00</span>
                    </div>
                  </td>
                  <td>40</td>
                  <td>4.9(16)</td>
                  <td>450</td>
                  <td>$45k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="sucess" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#7</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://i.pinimg.com/564x/95/a5/de/95a5de148ea29cbebc84da11e4e4d310.jpg"
                            className="w-100"
                            alt="Chiffon fabric"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Lace Fabric</h6>
                        <p>Exclusive chiffon fabric for you to design</p>
                      </div>
                    </div>
                  </td>
                  <td>unisex</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$26.00</del>
                      <span className="new text-danger">$22.00</span>
                    </div>
                  </td>
                  <td>30</td>
                  <td>4.9(16)</td>
                  <td>350</td>
                  <td>$35k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="sucess" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#8</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://i.pinimg.com/564x/9f/a1/a9/9fa1a9168efdf02a294f4c060e951b6f.jpg"
                            className="w-100"
                            alt="Chiffon fabric"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Beaded Lace Fabric</h6>
                        <p>Exclusive beaded lace fabric for you to design</p>
                      </div>
                    </div>
                  </td>
                  <td>unisex</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$24.00</del>
                      <span className="new text-danger">$21.00</span>
                    </div>
                  </td>
                  <td>30</td>
                  <td>4.5(19)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="sucess" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#9</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://i.pinimg.com/564x/a3/d0/d6/a3d0d68edaa80ab2bb9b16dd710837b2.jpg"
                            className="w-100"
                            alt="Chiffon fabric"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Organza Fabric</h6>
                        <p>Exclusive organza fabric for you to design</p>
                      </div>
                    </div>
                  </td>
                  <td>unisex</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$29.00</del>
                      <span className="new text-danger">$25.00</span>
                    </div>
                  </td>
                  <td>50</td>
                  <td>4.9(18)</td>
                  <td>480</td>
                  <td>$58k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="sucess" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#10</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://i.pinimg.com/564x/0b/87/d6/0b87d64e5f6c039e1197df73af80e264.jpg"
                            className="w-100"
                            alt="Chiffon fabric"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Cotton Printed Fabric</h6>
                        <p>Exclusive cotton printed fabric for you to design</p>
                      </div>
                    </div>
                  </td>
                  <td>unisex</td>
                  <td>
                    <div style={{ width: "70px" }}>
                      <del className="old">$25.00</del>
                      <span className="new text-danger">$21.00</span>
                    </div>
                  </td>
                  <td>15</td>
                  <td>5.0(16)</td>
                  <td>700</td>
                  <td>$60k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                      <Button className="sucess" color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </div>
      {/* </div> */}
    </>
  );
};
export default Dashboard;
