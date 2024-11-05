import React, { useState } from "react"; 
import "../TabMenu/tab.css"; 
import Menu from "./menu";// Importing the 'Menu' data (likely an array of objects containing menu items) 
import MenuItems from "./MenuItems"; // Importing the 'MenuItems' component that displays the filtered menu items
import CatMenu from "./CateMenu"; // Importing the 'CateMenu' component that renders category buttons for filtering


const allCateValues = [
  ...new Set(Menu.map((curElem) => curElem.category)), 
  // Using map() to extract the category values from the 'Menu' array and creating a Set to get unique values
  "all", 
  // Adding an "all" category to allow resetting the filter to show all items
];
console.log(allCateValues); // Logging the unique category values and "all" to the console for debugging


const Gallery = () => {
  const [items, setItems] = useState(Menu); 
  // 'items' holds the current list of menu items, initialized with the full 'Menu'
  // 'setItems' is the function to update the 'items' state

  const [catItems, setCatItems] = useState(allCateValues); 
  // 'catItems' holds the list of category values for the filter, initialized with 'allCateValues'
  // 'setCatItems' can be used to update the list of categories if needed

  const filterMenu = (category) => { 
    // Defining the 'filterMenu' function that filters items based on the selected category
    if (category === "all") { 
      // If "all" is selected, reset 'items' to show the full 'Menu'
      setItems(Menu);
      return; 
    
    }
    const updatedItems = Menu.filter((curElem) => { 
      // Otherwise, filter the 'Menu' array to show only items that match the selected category
      return curElem.category === category; 
      // Returning items whose 'category' matches the selected category
    });
    setItems(updatedItems); 
    // Updating the 'items' state with the filtered list of items
  };

  return (
    <>
      <h3 className="mt-5 main-heading" style={{ textAlign: "center", fontSize: "36px" }}>
        ORDER YOUR DESIRED FABRIC
      </h3>
      <hr /> 

      {/* Rendering the 'CatMenu' component and passing 'filterMenu' and 'catItems' as props */}
      <CatMenu filterMenu={filterMenu} catItems={catItems} />

      {/* Rendering the 'MenuItems' component and passing the filtered 'items' as props */}
      <MenuItems items={items} />
    </>
  );
};

export default Gallery; 


/*
items holds the list of menu items, and setItems updates that list when a filter is applied.
catItems holds the unique list of categories.
filterMenu handles the filtering logic based on the selected category.
If "all" is selected, it resets to the full Menu list. Otherwise, it filters by the selected category.
*/
