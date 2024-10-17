import React from "react";

// Defining a functional component 'CateMenu' that takes 'filterMenu' and 'catItems' as props
const CateMenu = ({ filterMenu, catItems }) => {
  return (
    <>
      <div className="menu-tabs container">
        <div className="menu-tab d-flex justify-content-around">
       
          {catItems.map((curElem, index) => {
   // Mapping over the 'catItems' array to dynamically generate a button for each category
            return (
              <button
                className="btn btn-warning"
                key={index}
                onClick={() => filterMenu(curElem)} // Adding an onClick event handler that triggers the 'filterMenu' function with the current category
              >
              
                {curElem} 
              </button>
            );
          })}
          {/* <button
            className="btn btn-warning"
            onClick={() => filterMenu("Silk")}
          >
            Silk
          </button>
          <button
            className="btn btn-warning"
            onClick={() => filterMenu("cotton")}
          >
            cotton
          </button>
          <button
            className="btn btn-warning"
            onClick={() => filterMenu("Chiffon")}
          >
            Chiffon
          </button>
          {/* <button className="btn btn-warning" onClick={() => setItems(Menu)}>
            All{" "}
          </button> */}
        </div>
      </div>
    </>
  );
};

export default CateMenu;
