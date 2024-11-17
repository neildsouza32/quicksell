import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import LogoEvents from "../icons_FEtask/Backlog.svg";
import LogoTodo from "../icons_FEtask/To-do.svg";
import LogoInProgress from "../icons_FEtask/in-progress.svg";
import LogoDone from "../icons_FEtask/Done.svg";
import LogoCancelled from "../icons_FEtask/Cancelled.svg";
import LogoRight1 from "../icons_FEtask/add.svg";
import LogoRight2 from "../icons_FEtask/3dot.svg";

const Display = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const leftLogos = {
    Backlog: LogoEvents,
    Todo: LogoTodo,
    "In progress": LogoInProgress,
    Done: LogoDone,
    Cancelled: LogoCancelled,
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

  const renderSection = (status) => {
    if (!data || !Array.isArray(data)) return null;

    const filteredCards = data.filter((task) => task.status?.toLowerCase() === status.toLowerCase());

    if (filteredCards.length === 0) {
      return <p style={styles.noTasks}>No tasks available in this section.</p>;
    }

    return filteredCards.map((task, index) => (
      <Card
        key={task.id || index}
        title={task.title || "Untitled"}
        description={task.tag?.join(", ") || "No tags provided."}
        status={task.status || "Unknown status"}
      />
    ));
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
        {["Backlog", "Todo", "In progress", "Done", "Cancelled"].map((sectionTitle) => (
          <div style={styles.section} key={sectionTitle}>
            <div style={styles.header}>
              <img src={leftLogos[sectionTitle]} alt={`${sectionTitle} Logo`} style={styles.logoLeft} />
              <h2 style={styles.sectionTitle}>{sectionTitle}</h2>
              <div style={styles.logosRight}>
                <img src={LogoRight1} alt="Right Logo 1" style={styles.logoRight} />
                <img src={LogoRight2} alt="Right Logo 2" style={styles.logoRight} />
              </div>
            </div>
            {renderSection(sectionTitle)}
          </div>
        ))}
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
  },
  container: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    padding: "20px",
    backgroundColor: "transparent",
    outline: "none",
    border: "none",
  },
  section: {
    flex: 1,
    padding: "16px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "relative",
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
  logosRight: {
    display: "flex",
    gap: "10px",
  },
  logoRight: {
    width: "20px",
    height: "20px",
  },
  sectionTitle: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  noTasks: {
    fontStyle: "italic",
    color: "#888",
  },
};

export default Display;
