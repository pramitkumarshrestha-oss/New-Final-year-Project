import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { HiWrench } from "react-icons/hi2";
import { AiOutlineStock } from "react-icons/ai";
import { GrUserWorker } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { RiLoginCircleFill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { IoMdLogOut } from "react-icons/io";






const Sidebar = ()=>{

    const [activeTab, setActiveTab] = useState(null);
    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
    const isOpenSubmenu=(index)=>{
        setActiveTab(index); 
        setIsToggleSubmenu(!isToggleSubmenu)
    }
    return(
        <>
            <div className="sidebar">
                <ul>
                   <li>
                   <Link to="/">
                   <Button className={`w-100 ${activeTab === 0 ? 'active' : ''}`}onClick={()=>isOpenSubmenu(0)}>
                   <span className='icon'> <MdDashboard/></span> 
                   Dashboard <span className='arrow'><FaAngleRight/>
                   </span>
                   </Button>
                   </Link>
                   </li> 
                   <li>
                   
                   <Button className={`w-100 ${activeTab === 1 && isToggleSubmenu===true  ? 'active' : ''}`}onClick={()=>isOpenSubmenu(1)}>
                   <span className='icon'> <MdOutlineProductionQuantityLimits /></span> 
                   Products <span className='arrow'><FaAngleRight/>
                   </span>
                   </Button>
                   <div className={`submenuWrapper ${activeTab === 1 && isToggleSubmenu===true ? 'colapse' : 'colapsed'}`}>
                   <ul className='submenu'>
                    <li><Link to="product/list">Product List</Link></li>
                    <li><Link to="product/view">Product View</Link></li>
                    <li><Link to="product/upload">Product Upload</Link></li>
                   </ul>
                   </div>
                   </li> 
                   <li>
                   <Link to="/">
                   <Button className={`w-100 ${activeTab === 2 ? 'active' : ''}`}onClick={()=>isOpenSubmenu(2)}>
                   <span className='icon'> <FaCartShopping /></span> 
                   Orders <span className='arrow'><FaAngleRight/>
                   </span>
                   </Button>
                   </Link>
                   </li> 
                   <li>
                   <Link to="/">
                   <Button className={`w-100 ${activeTab === 3 ? 'active' : ''}`}onClick={()=>isOpenSubmenu(3)}>
                   <span className='icon'> <HiWrench/></span> 
                   Raw Materials <span className='arrow'><FaAngleRight/>
                   </span>
                   </Button>
                   </Link>
                   </li> 
                   <li>
                   <Link to="/">
                   <Button className={`w-100 ${activeTab === 4 ? 'active' : ''}`}onClick={()=>isOpenSubmenu(4)}>
                   <span className='icon'> <AiOutlineStock/></span> 
                   Stock <span className='arrow'><FaAngleRight/>
                   </span>
                   </Button>
                   </Link>
                   </li> 
                   <li>
                   <Link to="/workers">
                   <Button className={`w-100 ${activeTab === 5 ? 'active' : ''}`}onClick={()=>isOpenSubmenu(5)}>
                   <span className='icon'> <GrUserWorker /></span> 
                   Workers <span className='arrow'><FaAngleRight/>
                   </span>
                   </Button>
                   </Link>
                   </li> 
                   <li>
                   <Link to="/">
                   <Button className={`w-100 ${activeTab === 6 ? 'active' : ''}`}onClick={()=>isOpenSubmenu(6)}>
                   <span className='icon'> <RiLoginCircleFill /></span> 
                   Log In <span className='arrow'><FaAngleRight/>
                   </span>
                   </Button>
                   </Link>
                   </li> 
                   <li>
                   <Link to="/">
                   <Button className={`w-100 ${activeTab === 7 ? 'active' : ''}`}onClick={()=>isOpenSubmenu(7)}>
                   <span className='icon'> <SiGnuprivacyguard/></span> 
                   Sign Up <span className='arrow'><FaAngleRight/>
                   </span>
                   </Button>
                   </Link>
                   </li> 
                   <li>
                   <Link to="/">
                   <Button className={`w-100 ${activeTab === 8 ? 'active' : ''}`}onClick={()=>isOpenSubmenu(8)}>
                   <span className='icon'> <IoMdSettings /></span> 
                   Settings <span className='arrow'><FaAngleRight/>
                   </span>
                   </Button>
                   </Link>
                   </li> 
                   <li>
                   <Link to="/">
                   <Button className={`w-100 ${activeTab === 9 ? 'active' : ''}`}onClick={()=>isOpenSubmenu(9)}>
                   <span className='icon'> <FaBell /></span> 
                   Notifications <span className='arrow'><FaAngleRight/>
                   </span>
                   </Button>
                   </Link>
                   </li> 
                   <li>
                   <Link to="/">
                   <Button className={`w-100 ${activeTab === 10 ? 'active' : ''}`}onClick={()=>isOpenSubmenu(10)}>
                   <span className='icon'> <AiFillMessage /></span> 
                   Messages <span className='arrow'><FaAngleRight/>
                   </span>
                   </Button>
                   </Link>
                   </li> 
                </ul>
                <br/>

                <div className='logoutWrapper'>
                <div className='logoutBox'>
                <Button variant="contained"><IoMdLogOut />Logout</Button>

                </div>
                </div>
            </div>
        </>
    )
}
export default Sidebar;