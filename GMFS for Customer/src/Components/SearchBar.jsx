import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../Contexts/StoreContext";
import styles from "../Styles/SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Importing navigate hook for redirection

const SearchBar = () => {
  const { setSearchItem, Menu } = useContext(StoreContext); // Accessing searchItem and Menu from context
  const [input, setInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const navigate = useNavigate(); // For navigation

  // Update filtered results based on search input
  useEffect(() => {
    if (input.trim()) {
      const results = Menu.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [input, Menu]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setSearchItem(value); // Set search item in context
  };

  const handleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleItemClick = (itemId) => {
    navigate(`/product/${itemId}`); // Navigate to product details page
    setInput(""); // Clear input after selection
    setFilteredResults([]); // Clear filtered results
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
                  key={item.id}
                  onClick={() => handleItemClick(item.id)} // Redirect to product page
                  className={styles.dropdownItem}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          ) : input && (
            <div className={styles.noResults}>
              No Results Found
            </div>
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
