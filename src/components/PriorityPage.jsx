import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import LogoTodo from "../icons_FEtask/To-do.svg";
import LogoInProgress from "../icons_FEtask/in-progress.svg";
import LogoDone from "../icons_FEtask/Done.svg";
import LogoRight1 from "../icons_FEtask/add.svg";
import LogoRight2 from "../icons_FEtask/3dot.svg";
import LogoUrgent from "../icons_FEtask/urgent.svg"; 
import LogoHigh from "../icons_FEtask/high.svg";      
import LogoMedium from "../icons_FEtask/mdium.svg";  
import LogoLow from "../icons_FEtask/low.svg";        
import LogoNP from "../icons_FEtask/No-priority.svg";

const PriorityPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const priorityLogos = {
    0: LogoUrgent,   
    1: LogoHigh,     
    2: LogoMedium,   
    3: LogoLow,      
    4: LogoNP,       
  };

  const priorityLabels = {
    0: "Urgent",
    1: "High",
    2: "Medium",
    3: "Low",
    4: "No Priority",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status code: ${response.status}`);
        }
        const result = await response.json();
        setData(result.tickets || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderSection = () => {
    if (!data || !Array.isArray(data)) return null;

    const groupedByPriority = data.reduce((acc, task) => {
      const priority = task.priority !== undefined ? task.priority : 4;  
      if (!acc[priority]) acc[priority] = [];
      acc[priority].push(task);
      return acc;
    }, {});

    return Object.keys(groupedByPriority).map((priorityKey) => {
      const priority = parseInt(priorityKey, 10);
      return (
        <div key={priority} style={styles.prioritySection}>
          <div style={styles.header}>
            <img src={priorityLogos[priority]} alt={priorityLabels[priority]} style={styles.logoLeft} />
            <h3 style={styles.subSectionTitle}>{priorityLabels[priority]}</h3>
          </div>
          {groupedByPriority[priority].map((task) => (
            <Card
              key={task.id}
              title={task.title || "Untitled"}
              description={task.tag?.join(", ") || "No tags provided."}
              status={task.status || "Unknown status"}
            />
          ))}
        </div>
      );
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>Tasks Grouped by Priority</h1>
        </div>

        <div style={styles.prioritySectionsContainer}>
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "#F8F8F8",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  logoLeft: {
    width: "24px",
    height: "24px",
    marginRight: "8px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  prioritySectionsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "space-between",
  },
  prioritySection: {
    flex: "1 1 300px",  
    padding: "16px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "relative",
  },
  subSectionTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#555",
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
};

export default PriorityPage;
