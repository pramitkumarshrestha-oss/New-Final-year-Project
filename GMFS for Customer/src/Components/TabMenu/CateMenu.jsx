import React from "react";

const CateMenu = ({ filterMenu, catItems }) => {
  return (
    <>
      <div className="menu-tabs container">
        <div className="menu-tab d-flex justify-content-around">
          {catItems.map((curElem, index) => {
            return (
              <button
                className="btn btn-warning"
                key={index}
                onClick={() => filterMenu(curElem)}
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
