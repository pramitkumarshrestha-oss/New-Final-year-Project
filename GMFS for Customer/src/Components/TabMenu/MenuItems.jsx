import React, { useContext } from "react";
import { StoreContext } from "../../Contexts/StoreContext";

const MenuItems = ({ items }) => {
  // Defining the MenuItems component that receives 'items' as props
  const { addToCart, removeFromCart, cartItems } = useContext(StoreContext); // Destructuring 'addToCart', 'removeFromCart', and 'cartItems' from StoreContext using useContext hook
  console.log(cartItems);

  return (
    <>
      <div className="menu-items contanier-fluid mt-5">
        <div className="row1">
          <div className="col-11 mx-auto">
            <div className="row my-5 flex-row">
              {items.map((elem) => {
                const { id, name, image, description, price } = elem;

                return (
                  <div className="item1" key={id}>
                    <div className="Item-inside">
                      {/*For Images*/}
                      <div className="col-12 col-md-12 col-lg-4 img-div">
                        <img src={image} alt={name} className="img-fluid" />
                      </div>
                      {/* For Menu items description*/}
                      <div className="col-12 col-md-12 col-lg-8">
                        <div className="main-ttile pt-4 pb-3">
                          <h1>{name}</h1>
                          <p>{description}</p>
                        </div>
                        <div className="menu-price-book">
                          <div className="price-book-divide d-flex justify-content-between ">
                            <h2>{price}</h2>
                            <a href="#">
                              <button
                                className="btn btn-primary"
                                onClick={() => addToCart(id)}
                              >
                                Add to cart
                              </button>
                            </a>
                          </div>
                          <p>*Prices may vary on bulk of quantity.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItems;
