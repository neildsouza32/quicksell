import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Card from "./components/Card/Card";
import Display from "./components/Display";
import UserPage from './components/UserPage';
import PriorityPage from "./components/PriorityPage";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("display");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      <Router>
        <Header setCurrentPage={handlePageChange} />
        {currentPage === "display" && <Display />}
        <Card />
        <Routes>
          <Route path="/user" element={<UserPage />} />
          <Route path="/priority" element={<PriorityPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
