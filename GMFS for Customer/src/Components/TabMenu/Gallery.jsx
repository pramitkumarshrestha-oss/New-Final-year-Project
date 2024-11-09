import React, { useContext, useState, useEffect } from "react";
import "../TabMenu/tab.css";
import Menu from "./menu";
import MenuItems from "./MenuItems";
import CatMenu from "./CateMenu";
import { StoreContext } from "../../Contexts/StoreContext";

const allCateValues = [
  ...new Set(Menu.map((curElem) => curElem.category)),
  "all",
];

const Gallery = () => {
  const { searchItem } = useContext(StoreContext); // Accessing searchItem from StoreContext
  const [items, setItems] = useState(Menu);
  const [catItems, setCatItems] = useState(allCateValues);

  const filterMenu = (category) => {
    if (category === "all") {
      setItems(Menu);
      return;
    }
    const updatedItems = Menu.filter(
      (curElem) => curElem.category === category
    );
    setItems(updatedItems);
  };

  // Update displayed items based on search term
  useEffect(() => {
    if (searchItem) {
      setItems(
        Menu.filter(
          (item) => item.name.toLowerCase().includes(searchItem.toLowerCase())
        )
      );
    } else {
      setItems(Menu); // Show all items if search term is cleared
    }
  }, [searchItem]); // Runs every time searchItem changes

  return (
    <>
      <h3
        className="mt-5 main-heading"
        style={{ textAlign: "center", fontSize: "36px" }}
      >
        ORDER YOUR DESIRED FABRIC
      </h3>
      <hr />
      <CatMenu filterMenu={filterMenu} catItems={catItems} />
      <MenuItems items={items} /> {/* Pass filtered or search items to MenuItems component */}
    </>
  );
};

export default Gallery;
