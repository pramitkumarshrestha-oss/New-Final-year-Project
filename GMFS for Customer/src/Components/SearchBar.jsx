import React, { useContext, useState } from "react";
import { StoreContext } from "../Contexts/StoreContext";
import styles from "../Styles/SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const { setSearchTerm } = useContext(StoreContext); // Use context to update search term
  const [input, setInput] = useState(""); // Local state for input value
  const [showSearchBar, setShowSearchBar] = useState(false);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setSearchTerm(value); // Update the search term in StoreContext
  };
  const handleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };
  return (
    <>
      <div className={styles.searchBarContainer}>
        {showSearchBar && (
          <input
            type="text"
            placeholder="Search fabric"
            value={input}
            onChange={handleInputChange}
            className={styles.search_input}
          />
        )}
      </div>

      <FontAwesomeIcon
        icon={faSearch}
        className={styles.search_icon}
        onClick={handleSearchBar}
      />
    </>
  );
};

export default SearchBar;
