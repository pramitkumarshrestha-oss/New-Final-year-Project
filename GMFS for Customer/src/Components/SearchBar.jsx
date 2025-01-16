import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../Contexts/StoreContext";
import styles from "../Styles/SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { setSearchItem, products } = useContext(StoreContext);
  const [input, setInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (input.trim()) {
      const results = products.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [input, products]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setSearchItem(e.target.value);
  };

  const handleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleItemClick = (itemId) => {
    console.log("Navigating to product with ID:", itemId);
    navigate(`/product/${itemId}`);
    setInput("");
    setFilteredResults([]);
  };

  return (
    <>
      {showSearchBar && (
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Search fabric"
            value={input}
            onChange={handleInputChange}
            className={styles.search_input}
          />
          {filteredResults.length > 0 ? (
            <ul className={styles.dropdown}>
              {filteredResults.map((item) => (
                <li
                  key={item._id}
                  onClick={() => handleItemClick(item._id)}
                  className={styles.dropdownItem}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          ) : (
            input && <div className={styles.noResults}>No Results Found</div>
          )}
        </div>
      )}
      <FontAwesomeIcon
        icon={faSearch}
        className={styles.search_icon}
        onClick={handleSearchBar}
      />
    </>
  );
};

export default SearchBar;
