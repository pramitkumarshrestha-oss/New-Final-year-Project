import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Groups2Icon from '@mui/icons-material/Groups2';
import BuildIcon from '@mui/icons-material/Build';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PaidIcon from '@mui/icons-material/Paid';
import LogoutIcon from '@mui/icons-material/Logout';
import Inventory2Icon from '@mui/icons-material/Inventory2';

const sidebarData = [
  {
    title: "Home",
    path: "/admin/home",
    icon: <HomeIcon />,
    cName: "nav-text"
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: <CheckroomIcon />,
    cName: "nav-text"
  },
  {
    title: "Raw Materials",
    path: "/admin/rawMaterialsTable",
    icon: <BuildIcon />,
    cName: "nav-text"
  },
  {
    title: "Stock",
    path: "/admin/products",
    icon: <Inventory2Icon />,
    cName: "nav-text"
  },
  {
    title: "Customers",
    path: "/admin/customerTable",
    icon: <PaidIcon />,
    cName: "nav-text"
  },
  {
    title: "Orders",
    path: "/admin/orderTable",
    icon: <ShoppingCartIcon />,
    cName: "nav-text"
  },
  {
    title: "Workers",
    path: "/admin/workerTable",
    icon: <Groups2Icon />,
    cName: "nav-text"
  },
  {
    title: "Logout",
    path: "/",
    icon: <LogoutIcon/>,
    cName: "nav-text"
  },
];

export default sidebarData;
