import React, { useContext, useState, useEffect } from "react";
import "../TabMenu/tab.css";
import MenuItems from "./MenuItems";
import CateMenu from "./CateMenu";
import { StoreContext } from "../../Contexts/StoreContext";

const Gallery = () => {
  const { products, searchItem } = useContext(StoreContext); // Use products from StoreContext
  const [items, setItems] = useState(products);
  const [catItems, setCatItems] = useState([]);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(products.map((curElem) => curElem.category)),
      "all",
    ];
    setCatItems(uniqueCategories);
  }, [products]);

  const filterMenu = (category) => {
    if (category === "all") {
      setItems(products);
      return;
    }
    const updatedItems = products.filter(
      (curElem) => curElem.category === category
    );
    setItems(updatedItems);
  };

  useEffect(() => {
    if (searchItem) {
      setItems(
        products.filter((item) =>
          item.name.toLowerCase().includes(searchItem.toLowerCase())
        )
      );
    } else {
      setItems(products);
    }
  }, [searchItem, products]);

  return (
    <>
      <h3 className="mt-5 main-heading" style={{ textAlign: "center", fontSize: "36px" }}>
        ORDER YOUR DESIRED FABRIC
      </h3>
      <hr />
      <CateMenu filterMenu={filterMenu} catItems={catItems} />
      <MenuItems items={items} />
    </>
  );
};

export default Gallery;
