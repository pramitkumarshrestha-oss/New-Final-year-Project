import { BsThreeDotsVertical } from "react-icons/bs";
import Button from '@mui/material/Button';
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { IoIosTimer } from "react-icons/io";


const DashboardBox=(props)=>{
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const ITEM_HEIGHT = 48;

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return(
        <Button className="dashboardBox" style={{
            backgroundImage:`linear-gradient(to right, ${props.color?.[0]} , ${props.color?.[1]})`
        }}>
        {
            props.grow == true?
            <span className="chart"><FaArrowTrendUp/></span>
            :

            <span className="chart"><FaArrowTrendDown/></span>


        }
        <div className="d-flex w-100">
            <div className="col1">
                <h4 className="text-white mb-0">{props.title}</h4>
                <span className="text-white">{props.count}</span>
            </div>
            
            <div className="ml-auto">
            {
                props.icon?
                <span className="icon">
                    {props.icon? props.icon : ''}
                </span>
                :

                ''
        }

            </div>
            
        </div>
        <div className="d-flex align -items-center w-100 bottomEle">
               <h6 className="text-white mb-0 mt-0">Last Month</h6>
               <div className="ml-auto">
               <Button className="ml-auto toggleIcon"onClick={handleClick}><BsThreeDotsVertical/></Button>
               <Menu
        className="dropdown_menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        <MenuItem onclick={handleClose}>
           <IoIosTimer/> Last Day
        </MenuItem>
        <MenuItem onclick={handleClose}>
        <IoIosTimer/> Last Week
        </MenuItem>
        <MenuItem onclick={handleClose}>
        <IoIosTimer/> Last Month
        </MenuItem>
        <MenuItem onclick={handleClose}>
        <IoIosTimer/> Last Year
        </MenuItem>
      </Menu>
               </div>
               </div>
        </Button>
               
    )
}

export default DashboardBox;