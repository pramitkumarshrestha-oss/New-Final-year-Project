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


const ProductList = ()=>{
    
   
    

    return(
      <>
         
          <div className="right-content w-100">
            <div className="card shadow border-0 w-100 flex-row p-4">
                <h5 className="mb-0">Product List</h5>
            
            <div className="table-responsive mt-3">
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
                  <img src={chiffonImage} className="w-100" alt="Chiffon fabric" />
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
                  <div style={{width: '70px'}}>
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
                      <Button className="secondary" color="secondary"><FaEye/></Button>
                      <Button className="sucess" color="success"><FaPencilAlt/></Button>
                      <Button className="error"  color="error"><MdDelete/></Button>

                    </div>
                  </td>

                </tr>
                <tr>
                  <td>#2</td>
                  <td>
                 <div className="d-flex align-items-center productBox">
                 <div className="imgWrapper">
                  <div className="img">
                  <img src="https://i.pinimg.com/564x/78/8c/25/788c25a443eda71fe92bcbc70947e755.jpg" className="w-100" alt="Chiffon fabric" />
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
                  <div style={{width: '70px'}}>
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
                      <Button className="secondary" color="secondary"><FaEye/></Button>
                      <Button className="sucess" color="success"><FaPencilAlt/></Button>
                      <Button className="error"  color="error"><MdDelete/></Button>

                    </div>
                  </td>

                </tr>
                <tr>
                  <td>#3</td>
                  <td>
                 <div className="d-flex align-items-center productBox">
                 <div className="imgWrapper">
                  <div className="img">
                  <img src="https://i.pinimg.com/564x/a2/a0/f5/a2a0f5fd0eef47068273927da6033733.jpg" className="w-100" alt="Linen fabric" />
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
                  <div style={{width: '70px'}}>
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
                      <Button className="secondary" color="secondary"><FaEye/></Button>
                      <Button className="sucess" color="success"><FaPencilAlt/></Button>
                      <Button className="error"  color="error"><MdDelete/></Button>

                    </div>
                  </td>

                </tr>
                <tr>
                  <td>#4</td>
                  <td>
                 <div className="d-flex align-items-center productBox">
                 <div className="imgWrapper">
                  <div className="img">
                  <img src="https://i.pinimg.com/564x/3a/0f/a4/3a0fa4c15bda6eb2b940d4231267839b.jpg" className="w-100" alt="Chiffon fabric" />
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
                  <div style={{width: '70px'}}>
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
                      <Button className="secondary" color="secondary"><FaEye/></Button>
                      <Button className="sucess" color="success"><FaPencilAlt/></Button>
                      <Button className="error"  color="error"><MdDelete/></Button>

                    </div>
                  </td>

                </tr>
                <tr>
                  <td>#5</td>
                  <td>
                 <div className="d-flex align-items-center productBox">
                 <div className="imgWrapper">
                  <div className="img">
                  <img src="https://i.pinimg.com/564x/84/be/67/84be67418559581d5d55895f947fa4c0.jpg" className="w-100" alt="Chiffon fabric" />
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
                  <div style={{width: '70px'}}>
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
                      <Button className="secondary" color="secondary"><FaEye/></Button>
                      <Button className="sucess" color="success"><FaPencilAlt/></Button>
                      <Button className="error"  color="error"><MdDelete/></Button>

                    </div>
                  </td>

                </tr>
                <tr>
                  <td>#6</td>
                  <td>
                 <div className="d-flex align-items-center productBox">
                 <div className="imgWrapper">
                  <div className="img">
                  <img src="https://i.pinimg.com/564x/86/38/6e/86386e7d34236c3c1b216e29d6a48177.jpg" className="w-100" alt="Chiffon fabric" />
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
                  <div style={{width: '70px'}}>
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
                      <Button className="secondary" color="secondary"><FaEye/></Button>
                      <Button className="sucess" color="success"><FaPencilAlt/></Button>
                      <Button className="error"  color="error"><MdDelete/></Button>

                    </div>
                  </td>

                </tr>
                <tr>
                  <td>#7</td>
                  <td>
                 <div className="d-flex align-items-center productBox">
                 <div className="imgWrapper">
                  <div className="img">
                  <img src="https://i.pinimg.com/564x/95/a5/de/95a5de148ea29cbebc84da11e4e4d310.jpg" className="w-100" alt="Chiffon fabric" />
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
                  <div style={{width: '70px'}}>
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
                      <Button className="secondary" color="secondary"><FaEye/></Button>
                      <Button className="sucess" color="success"><FaPencilAlt/></Button>
                      <Button className="error"  color="error"><MdDelete/></Button>

                    </div>
                  </td>

                </tr>
                <tr>
                  <td>#8</td>
                  <td>
                 <div className="d-flex align-items-center productBox">
                 <div className="imgWrapper">
                  <div className="img">
                  <img src="https://i.pinimg.com/564x/9f/a1/a9/9fa1a9168efdf02a294f4c060e951b6f.jpg" className="w-100" alt="Chiffon fabric" />
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
                  <div style={{width: '70px'}}>
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
                      <Button className="secondary" color="secondary"><FaEye/></Button>
                      <Button className="sucess" color="success"><FaPencilAlt/></Button>
                      <Button className="error"  color="error"><MdDelete/></Button>

                    </div>
                  </td>

                </tr>
                <tr>
                  <td>#9</td>
                  <td>
                 <div className="d-flex align-items-center productBox">
                 <div className="imgWrapper">
                  <div className="img">
                  <img src="https://i.pinimg.com/564x/a3/d0/d6/a3d0d68edaa80ab2bb9b16dd710837b2.jpg" className="w-100" alt="Chiffon fabric" />
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
                  <div style={{width: '70px'}}>
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
                      <Button className="secondary" color="secondary"><FaEye/></Button>
                      <Button className="sucess" color="success"><FaPencilAlt/></Button>
                      <Button className="error"  color="error"><MdDelete/></Button>

                    </div>
                  </td>

                </tr>
                <tr>
                  <td>#10</td>
                  <td>
                 <div className="d-flex align-items-center productBox">
                 <div className="imgWrapper">
                  <div className="img">
                  <img src="https://i.pinimg.com/564x/0b/87/d6/0b87d64e5f6c039e1197df73af80e264.jpg" className="w-100" alt="Chiffon fabric" />
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
                  <div style={{width: '70px'}}>
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
                      <Button className="secondary" color="secondary"><FaEye/></Button>
                      <Button className="sucess" color="success"><FaPencilAlt/></Button>
                      <Button className="error"  color="error"><MdDelete/></Button>

                    </div>
                  </td>

                </tr>
              </tbody>
            </table>
           </div>

            
          </div>
          </div>
          
          </>
    )
    

}
export default ProductList;