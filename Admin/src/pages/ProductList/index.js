import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch all Products from the server on initial render
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3010/fetchProduct/fetchProduct"
        );

        setProducts(response.data); // Update state with the product data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchAllProducts();
  }, []);

  //  For Deleting the  Product
  const deleteProduct = async (id) => {
    if (!id) {
      console.error("Product ID is missing.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3010/editProduct/deleteProduct`,
        {
          id,
        }
      );
      console.log(response.data.message); // Log the response message

      // Remove the deleted worker from the local state
      setProducts(products.filter((product) => product._id !== id)); // Filter workers list to remove the deleted one
    } catch (error) {
      console.error("Error deleting Product:", error);
    }
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Product List</h5>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Products</h3>

          <div className="table-responsive mt-3">
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>SN</th>
                  <th>PRODUCT</th>
                  <th>CATEGORY</th>
                  <th>PRICE</th>
                  <th>DESCRIPTION</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id || index}>
                    <td>{index + 1}</td>
                    <td>{product.name || "N/A"}</td>
                    <td>{product.category || "N/A"}</td>
                    <td>{product.price || "N/A"}</td>
                    <td>{product.description || "N/A"}</td>
                    <td>
                      <div className="actions d-flex align-items-center">
                        <Button
                          className="success"
                          color="success"
                          // onClick={() => handleEditproduct(product)}
                        >
                          <FaPencilAlt />
                        </Button>
                        <Button
                          className="error"
                          color="error"
                          onClick={() => deleteProduct(product._id)}
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductList;
