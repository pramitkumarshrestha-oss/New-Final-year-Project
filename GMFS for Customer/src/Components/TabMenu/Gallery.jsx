import React, { useState } from "react";
import "../TabMenu/tab.css";
import Menu from "./menu";
import MenuItems from "./MenuItems";
import CatMenu from "./CateMenu";

const allCateValues = [
  ...new Set(Menu.map((curElem) => curElem.category)),
  "all",
];
console.log(allCateValues);

const Gallery = () => {
  const [items, setItems] = useState(Menu);

  const [catItems, setCatItems] = useState(allCateValues);
  const filterMenu = (category) => {
    if (category === "all") {
      setItems(Menu);
      return;
    }
    const updatedItems = Menu.filter((curElem) => {
      return curElem.category === category;
    });
    setItems(updatedItems);
  };
  return (
    <>
      <h3 className="mt-5 main-heading" style={{ textAlign: "center", fontSize:"36px"}}>
       ORDER YOUR DESIRED FABRIC
      </h3>
      <hr />
      {/*Our Menu List will come here */}
      <CatMenu filterMenu={filterMenu} catItems={catItems} />
      {/*Our Menu Items will come here */}
      <MenuItems items={items} />
    </>
  );
};

export default Gallery;
// items holds the list of menu items, and setItems updates that list when a filter is applied.
// catItems holds the unique list of categories.
// filterMenu handles the filtering logic based on the selected category.
// If "all" is selected, it resets to the full Menu list. Otherwise, it filters by the selected category.
