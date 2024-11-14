import React,{useContext, useState} from 'react'
import { Link } from "react-router-dom";
// import img from '../../assets/images/logo.png';
import img from '../../assets/images/logo.png';
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import SearchBox from '../SearchBox';
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
    const [isOpennotificationDrop, setisOpennotificationDrop] = useState(null);

  const openMyAcc = Boolean(anchorEl);
  const openNotifications = Boolean(isOpennotificationDrop);
  const context = useContext(MyContext)

  const handleOpenMyAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };
  const handleOpennotificationsDrop=()=>{
    setisOpennotificationDrop(true)

  }
  const handleClosenotificationsDrop=()=>{
    setisOpennotificationDrop(false)
}

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
                <SearchBox/>
                 </div>
            <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
                <Button className="rounded-circle mr-3">
                <MdLightMode/></Button>
                <Button className="rounded-circle mr-3" ><IoMdCart/>
                
                </Button>
                <Button className="rounded-circle mr-3"><MdEmail/></Button>
                <Button className="rounded-circle mr-3" onClick={handleOpennotificationsDrop}><FaBell/></Button>
                <div className='dropdownWrapper position-relative'>
                <Menu
        anchorEl={isOpennotificationDrop}
        className='notifications dropdown_list'
        id="notifications"
        open={isOpennotificationDrop}
        onClose={handleClosenotificationsDrop}
        onClick={handleClosenotificationsDrop}
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
        <div className='head pl-3 pb-0'>
        <h4>Orders (12)</h4>
</div>
        <Divider className='mb-3'/>
        <div className='scroll'>
        <MenuItem onClick={handleCloseMyAccDrop}>
         <div className='d-flex'> 
         <div>
         <div className='userImg'>
         <span className='rounded-circle'>
            <img src="https://i.pinimg.com/736x/2d/12/dd/2d12dd622717ab6e64d0a4e09f87afe9.jpg" alt="pfp" />
         </span> 
         </div>
         </div>
         <div className='dropdownInfo'>
            <h4>
                <span>
                    <b>Pramit </b>
                    added to his favourite list 
                    <b> Leather belt steve madden </b>
                </span>
            </h4>
            <p className='text-sky mb-o'>few seconds ago!</p>
         </div>
         </div>
        </MenuItem>
        <MenuItem onClick={handleCloseMyAccDrop}>
         <div className='d-flex'> 
         <div>
         <div className='userImg'>
         <span className='rounded-circle'>
            <img src="https://i.pinimg.com/736x/2d/12/dd/2d12dd622717ab6e64d0a4e09f87afe9.jpg" alt="pfp" />
         </span> 
         </div>
         </div>
         <div className='dropdownInfo'>
            <h4>
                <span>
                    <b>Pramit </b>
                    added to his favourite list 
                    <b> Leather belt steve madden </b>
                </span>
            </h4>
            <p className='text-sky mb-o'>few seconds ago!</p>
         </div>
         </div>
        </MenuItem>
        <MenuItem onClick={handleCloseMyAccDrop}>
         <div className='d-flex'> 
         <div>
         <div className='userImg'>
         <span className='rounded-circle'>
            <img src="https://i.pinimg.com/736x/2d/12/dd/2d12dd622717ab6e64d0a4e09f87afe9.jpg" alt="pfp" />
         </span> 
         </div>
         </div>
         <div className='dropdownInfo'>
            <h4>
                <span>
                    <b>Pramit </b>
                    added to his favourite list 
                    <b> Leather belt steve madden </b>
                </span>
            </h4>
            <p className='text-sky mb-o'>few seconds ago!</p>
         </div>
         </div>
        </MenuItem>
        <MenuItem onClick={handleCloseMyAccDrop}>
         <div className='d-flex'> 
         <div>
         <div className='userImg'>
         <span className='rounded-circle'>
            <img src="https://i.pinimg.com/736x/2d/12/dd/2d12dd622717ab6e64d0a4e09f87afe9.jpg" alt="pfp" />
         </span> 
         </div>
         </div>
         <div className='dropdownInfo'>
            <h4>
                <span>
                    <b>Pramit </b>
                    added to his favourite list 
                    <b> Leather belt steve madden </b>
                </span>
            </h4>
            <p className='text-sky mb-o'>few seconds ago!</p>
         </div>
         </div>
        </MenuItem>
        <MenuItem onClick={handleCloseMyAccDrop}>
         <div className='d-flex'> 
         <div>
         <div className='userImg'>
         <span className='rounded-circle'>
            <img src="https://i.pinimg.com/736x/2d/12/dd/2d12dd622717ab6e64d0a4e09f87afe9.jpg" alt="pfp" />
         </span> 
         </div>
         </div>
         <div className='dropdownInfo'>
            <h4>
                <span>
                    <b>Pramit </b>
                    added to his favourite list 
                    <b> Leather belt steve madden </b>
                </span>
            </h4>
            <p className='text-sky mb-o'>few seconds ago!</p>
         </div>
         </div>
        </MenuItem>
        <MenuItem onClick={handleCloseMyAccDrop}>
         <div className='d-flex'> 
         <div>
         <div className='userImg'>
         <span className='rounded-circle'>
            <img src="https://i.pinimg.com/736x/2d/12/dd/2d12dd622717ab6e64d0a4e09f87afe9.jpg" alt="pfp" />
         </span> 
         </div>
         </div>
         <div className='dropdownInfo'>
            <h4>
                <span>
                    <b>Pramit </b>
                    added to his favourite list 
                    <b> Leather belt steve madden </b>
                </span>
            </h4>
            <p className='text-sky mb-o'>few seconds ago!</p>
         </div>
         </div>
        </MenuItem>
        <MenuItem onClick={handleCloseMyAccDrop}>
         <div className='d-flex'> 
         <div>
         <div className='userImg'>
         <span className='rounded-circle'>
            <img src="https://i.pinimg.com/736x/2d/12/dd/2d12dd622717ab6e64d0a4e09f87afe9.jpg" alt="pfp" />
         </span> 
         </div>
         </div>
         <div className='dropdownInfo'>
            <h4>
                <span>
                    <b>Pramit </b>
                    added to his favourite list 
                    <b> Leather belt steve madden </b>
                </span>
            </h4>
            <p className='text-sky mb-o'>few seconds ago!</p>
         </div>
         </div>
        </MenuItem>
        </div>

        <div className='pl-3 pr-3 w-100 pt-2 pb-1'>
        <Button className='btn-blue w-100'>View all Notifications</Button>
        </div>
      </Menu>
                </div>
               <div className="myAccWrapper">
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
        </MenuItem>
        <MenuItem onClick={handleCloseMyAccDrop}>
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
        </MenuItem>
      </Menu>
               </div>
                




                
                
            </div>

            </div>
            </div>
        </header>
       </>
        
       
    )
  
};
export default Header;