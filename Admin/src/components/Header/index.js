import React,{useContext, useState} from 'react'
import { Link } from "react-router-dom";
// import img from '../../assets/images/logo.png';
import img from '../../assets/images/logo.png';
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaBell } from "react-icons/fa";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import { BsShieldFillExclamation } from "react-icons/bs";
import Divider from '@mui/material/Divider';
import { MyContext } from '../../App';

const Header = () => {
  

    const [anchorEl, setAnchorEl] = useState(null);
    // const [isOpennotificationDrop, setisOpennotificationDrop] = useState(null);

  const openMyAcc = Boolean(anchorEl);
  // const openNotifications = Boolean(isOpennotificationDrop);
  const context = useContext(MyContext)

  const handleOpenMyAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };
//   const handleOpennotificationsDrop=()=>{
//     setisOpennotificationDrop(true)

//   }
//   const handleClosenotificationsDrop=()=>{
//     setisOpennotificationDrop(false)
// }

    return(
       <>
        <header className="d-flex align-items-center ">
            <div className="container-fluid w-100">
            <div className="row d-flex align-items-center w-100">
            {/* logo wrapper */}
            <div className="col-sm-2 part1">
            <Link to={'/'} className="d-flex align-items-center logo">
            <img src={img}/>
            <span className="ml-2">Garment Management System</span>
            </Link> 
          </div>
            <div className="col-sm-3 d-flex align-items-center part2 pl-4">
                <Button className="rounded-circle mr-3" onClick={()=>context.
                setIsToggleSidebar(!context.isToggleSidebar)}>
                  {
                    context.isToggleSidebar==false ? <MdMenuOpen/> : <MdOutlineMenu/>
                  }
                </Button>
                {/* <SearchBox/>
                 </div> */}
            {/* <div className="col-sm-7 d-flex align-items-center justify-content-end part3"> */}
                {/* <Button className="rounded-circle mr-3">
                <MdLightMode/></Button>
                <Button className="rounded-circle mr-3" ><IoMdCart/>
                
                </Button>
                <Button className="rounded-circle mr-3"><MdEmail/></Button>
                <Button className="rounded-circle mr-3" onClick={handleOpennotificationsDrop}><FaBell/></Button> */}
               
               {/* <div className="myAccWrapper">
               <Button className="myAcc d-flex align-items-center"onClick={handleOpenMyAccDrop}>
                <div className="userImg">
                <span className="rounded-circle">
                     <img src="https://i.pinimg.com/736x/3a/8b/fc/3a8bfcd43efa9f1359387a3da3321d80.jpg" alt="profile" />
                </span>

                </div>
                <div className="userInfo">
                    <h4>Kitty Cat</h4>
                    <p className="mb-0">@kitty10</p>
                </div>
                </Button>
                <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMyAcc}
        onClose={handleCloseMyAccDrop}
        onClick={handleCloseMyAccDrop}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        
        <MenuItem onClick={handleCloseMyAccDrop}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          My Account
        </MenuItem> */}
        {/* <MenuItem onClick={handleCloseMyAccDrop}>
          <ListItemIcon>
            <BsShieldFillExclamation />
          </ListItemIcon>
          Reset Password
        </MenuItem>
        <MenuItem onClick={handleCloseMyAccDrop}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem> */}
      {/* </Menu>
               </div>
                 */}




                
                
            </div>

            </div>
            </div>
        </header>
       </>
        
       
    )
  
};
export default Header;