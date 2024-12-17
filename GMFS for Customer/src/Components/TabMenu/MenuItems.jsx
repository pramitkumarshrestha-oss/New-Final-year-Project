import React, { useContext } from "react";
import { StoreContext } from "../../Contexts/StoreContext";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const MenuItems = ({ items }) => {
  const { addToCart } = useContext(StoreContext);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const url = "http://localhost:3010";

  const handleAddToCart = (id) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      addToCart(id);
    }
  };

  return (
    <div className="menu-items container-fluid mt-5">
      <div className="row">
        <div className="col-11 mx-auto">
          <div className="row my-5 flex-row">
            {items.map((elem) => {
              const { _id, name, image, description, price } = elem;
              return (
                <div className="item1" key={_id}>
                  <div className="Item-inside">
                    <div className="col-12 col-md-12 col-lg-4 img-div">
                      <img
                        src={`${url}/${image}`}
                        alt={name}
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-12 col-md-12 col-lg-8">
                      <div className="main-title pt-4 pb-3">
                        <h1>{name}</h1>
                        <p>{description}</p>
                      </div>
                      <div className="menu-price-book">
                        <div className="price-book-divide d-flex justify-content-between">
                          <h2>Rs.{price}</h2>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleAddToCart(_id)}
                          >
                            Add to cart
                          </button>
                        </div>
                        <p>*Prices may vary on bulk quantity.</p>
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
  );
};

export default MenuItems;
