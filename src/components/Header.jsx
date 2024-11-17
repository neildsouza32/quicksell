import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import DownIcon from "../icons_FEtask/down.svg";
import Display from "../icons_FEtask/Display.svg";

const Header = ({ setCurrentPage }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isSubDropdownOpen, setSubDropdownOpen] = useState(false);
    const [selectedGrouping, setSelectedGrouping] = useState("Status");
    const [selectedOrdering, setSelectedOrdering] = useState("Priority");

    const dropdownRef = useRef(null);
    const subDropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };

    const toggleSubDropdown = () => {
      setSubDropdownOpen(!isSubDropdownOpen);
    };

    const handleGroupingSelect = (option) => {
      setSelectedGrouping(option);
      setSubDropdownOpen(false);
      setDropdownOpen(false);

      if (option === "User") {
        setCurrentPage("user");
        navigate("/user");
      }

      if (option === "Priority") {
        setCurrentPage("priority");
        navigate("/priority");
      }
    };

    const handleOrderingSelect = (option) => {
      setSelectedOrdering(option);
    };

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        subDropdownRef.current && !subDropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setSubDropdownOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

    return (
      <header style={styles.header}>
        <div style={styles.dropdown} ref={dropdownRef}>
          <button style={styles.dropdownBtn} onClick={toggleDropdown}>
            <img src={Display} alt="Left Icon" style={styles.icon} />
            Display
            <img src={DownIcon} alt="Right Icon" style={styles.icon} />
          </button>

          {isDropdownOpen && (
            <div style={styles.dropdownContent}>
              <div style={styles.dropdownItem}>
                <span style={styles.groupingText}>Grouping</span>
                <button style={styles.subDropdownBtn} onClick={toggleSubDropdown}>
                  {selectedGrouping}
                  <img
                    src={DownIcon}
                    alt="Dropdown Icon"
                    style={styles.icon}
                  />
                </button>
                {isSubDropdownOpen && (
                  <div style={styles.subDropdownContent} ref={subDropdownRef}>
                    <button
                      style={styles.subDropdownItem}
                      onClick={() => handleGroupingSelect("User")}
                    >
                      User
                    </button>
                    <button
                      style={styles.subDropdownItem}
                      onClick={() => handleGroupingSelect("Priority")}
                    >
                      Priority
                    </button>
                  </div>
                )}
              </div>
              <div style={styles.dropdownItem}>
                <span style={styles.orderingText}>Ordering</span>
                <button
                  style={styles.subDropdownBtn}
                  onClick={() => handleOrderingSelect("Priority")}
                >
                  {selectedOrdering}
                  <img
                    src={DownIcon}
                    alt="Dropdown Icon"
                    style={styles.icon}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: "10px 20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  dropdown: {
    position: "relative",
  },
  dropdownBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    color: "#333",
    padding: "5px 10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "15px",
    width: "120px",
    gap: "8px",
  },
  icon: {
    width: "16px",
    height: "16px",
  },
  dropdownContent: {
    position: "absolute",
    top: "125%",
    left: "0",
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    minWidth: "250px",
    padding: "10px",
  },
  dropdownItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  groupingText: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#888888",
  },
  orderingText: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#888888",
  },
  subDropdownBtn: {
    backgroundColor: "white",
    border: "1px solid #ddd",
    padding: "5px 5px",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    fontSize: "14px",
    width: "120px",
  },
  subDropdownContent: {
    position: "absolute",
    top: "100%",
    left: "100%",
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    minWidth: "180px",
    padding: "15px",
  },
  subDropdownItem: {
    backgroundColor: "white",
    border: "none",
    padding: "8px 12px",
    textAlign: "left",
    cursor: "pointer",
    width: "100%",
    fontSize: "15px",
  },
};

export default Header;
