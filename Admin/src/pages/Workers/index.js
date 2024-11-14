import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import { IoIosTimer } from "react-icons/io";
import Button from '@mui/material/Button';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Chart } from "react-google-charts";
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import chiffonImage from '../../assets/images/Chiffon.jpeg';
import purpleImage from '../../assets/images/purple.jpeg';

import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Workers = ()=>{
    
  const [showBy, setshowBy] =    useState('');
  const [showBysetCatBy, setCatBy] =    useState('');
  

    return(
      <>
         
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
                <tr>
                  <td>#1</td>
                  <td>
                 <div className="d-flex align-items-center productBox">
                 <div className="imgWrapper">
                  
                 </div>
                  <div className="info pl-0">
                  <h6>Anesh Karki</h6>

                  </div>
                 </div>
                  </td>
                  <td>Gay</td>
                  <td>
                  <div style={{width: '70px'}}>
                  {/* <del className="old">$25.00</del> */}
                  <span className="new text-danger">22</span>
                  </div>
                  </td>
                  <td>30</td>
                  <td>Gathhaghar, Bhaktapur</td>
                  <td>9818842356</td>
                  <td></td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary"><FaEye/></Button>
                      <Button className="sucess" color="success"><FaPencilAlt/></Button>
                      <Button className="error"  color="error"><MdDelete/></Button>

                    </div>
                  </td>

                </tr>
                <tr>
                  <td>#1</td>
                  <td>
                 <div className="d-flex align-items-center productBox">
                 <div className="imgWrapper">
                  
                 </div>
                  <div className="info pl-0">
                  <h6>Anesh Karki</h6>

                  </div>
                 </div>
                  </td>
                  <td>Gay</td>
                  <td>
                  <div style={{width: '70px'}}>
                  {/* <del className="old">$25.00</del> */}
                  <span className="new text-danger">22</span>
                  </div>
                  </td>
                  <td>30</td>
                  <td>Gathhaghar, Bhaktapur</td>
                  <td>9818842356</td>
                  <td></td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary"><FaEye/></Button>
                      <Button className="sucess" color="success"><FaPencilAlt/></Button>
                      <Button className="error"  color="error"><MdDelete/></Button>

                    </div>
                  </td>

                </tr>
                <tr>
                  <td>#1</td>
                  <td>
                 <div className="d-flex align-items-center productBox">
                 <div className="imgWrapper">
                  
                 </div>
                  <div className="info pl-0">
                  <h6>Anesh Karki</h6>

                  </div>
                 </div>
                  </td>
                  <td>Gay</td>
                  <td>
                  <div style={{width: '70px'}}>
                  {/* <del className="old">$25.00</del> */}
                  <span className="new text-danger">22</span>
                  </div>
                  </td>
                  <td>30</td>
                  <td>Gathhaghar, Bhaktapur</td>
                  <td>9818842356</td>
                  <td></td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary"><FaEye/></Button>
                      <Button className="sucess" color="success"><FaPencilAlt/></Button>
                      <Button className="error"  color="error"><MdDelete/></Button>

                    </div>
                  </td>

                </tr>
                <tr>
                  <td>#1</td>
                  <td>
                 <div className="d-flex align-items-center productBox">
                 <div className="imgWrapper">
                  
                 </div>
                  <div className="info pl-0">
                  <h6>Anesh Karki</h6>

                  </div>
                 </div>
                  </td>
                  <td>Gay</td>
                  <td>
                  <div style={{width: '70px'}}>
                  {/* <del className="old">$25.00</del> */}
                  <span className="new text-danger">22</span>
                  </div>
                  </td>
                  <td>30</td>
                  <td>Gathhaghar, Bhaktapur</td>
                  <td>9818842356</td>
                  <td></td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary"><FaEye/></Button>
                      <Button className="sucess" color="success"><FaPencilAlt/></Button>
                      <Button className="error"  color="error"><MdDelete/></Button>

                    </div>
                  </td>

                </tr>
                <tr>
                  <td>#1</td>
                  <td>
                 <div className="d-flex align-items-center productBox">
                 <div className="imgWrapper">
                  
                 </div>
                  <div className="info pl-0">
                  <h6>Anesh Karki</h6>

                  </div>
                 </div>
                  </td>
                  <td>Gay</td>
                  <td>
                  <div style={{width: '70px'}}>
                  {/* <del className="old">$25.00</del> */}
                  <span className="new text-danger">22</span>
                  </div>
                  </td>
                  <td>30</td>
                  <td>Gathhaghar, Bhaktapur</td>
                  <td>9818842356</td>
                  <td></td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary"><FaEye/></Button>
                      <Button className="sucess" color="success"><FaPencilAlt/></Button>
                      <Button className="error"  color="error"><MdDelete/></Button>

                    </div>
                  </td>

                </tr>
               
              </tbody>
            </table>
           </div>


           <Link to="/worker/form">
           <button className="circular-button" >+</button>
           </Link>
          
          </div>
          {/* </div> */}
          
          </>
    )
    

}
export default Workers;
