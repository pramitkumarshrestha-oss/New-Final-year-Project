import React from "react";
import Slider from "react-slick";
import { BiSolidCategory } from "react-icons/bi";
import { AiOutlineStock } from "react-icons/ai";
import { MdRateReview } from "react-icons/md";
import { MdPublishedWithChanges } from "react-icons/md";




const ProductView = ()=>{

  // var productSliderOptions = {
  //   dots: false,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1
  // };

    return(
        <>
          <div className="right-content w-100">
            <div className="card shadow border-0 w-100 flex-row p-4">
                <h5 className="mb-0">Product View </h5>
            </div>
            
            <div className="card productDetailsSection">
            <div className="row">
              <div className="col-md-5">
              {/* <Slider {...productSliderOptions}> */}
                <div className="item pt-3 pb-3 pl-4 pr-4">
                <h6 className="mb-4">Product Gallery</h6>
                  <img src="https://i.pinimg.com/564x/a3/d0/d6/a3d0d68edaa80ab2bb9b16dd710837b2.jpg" alt="fabric" className="w-100"/>
                </div>
              {/* </Slider> */}
              </div>
              <div className="col-md-7">
              <div className=" pt-3 pb-3 pl-4 pr-4">
              <h6 className="mb-4">Product Details</h6>
             <div className="textField">
             <h4>Chiffon Fabric</h4>
             <p>Exclusive chifffon fabric for you to design</p>
             </div>

             <div className="productInfo mt-3">
              <div className="row mb-2">
                <div className="col-sm-5 d-flex align-items-center">
                  <span className="icon"><BiSolidCategory/></span>
                  <span className="name">Category</span>
                </div>
                <div className="col-sm-7">
                :  <span>Chiffon</span>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-sm-5 d-flex align-items-center">
                  <span className="icon"><AiOutlineStock/></span>
                  <span className="name">Stock</span>
                </div>
                <div className="col-sm-7">
                :  <span>30</span>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-sm-5 d-flex align-items-center">
                  <span className="icon"><MdRateReview/></span>
                  <span className="name">Review</span>
                </div>
                <div className="col-sm-7">
                :  <span>(03)Review</span>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-sm-5 d-flex align-items-center">
                  <span className="icon"><MdPublishedWithChanges/></span>
                  <span className="name">Published</span>
                </div>
                <div className="col-sm-7">
                :  <span>02 Aug 2024</span>
                </div>
              </div>

             </div>

             <div></div>
              </div>

              </div>
            </div>
          </div>

          </div>

         
          
        </>
    )
}
export default ProductView;