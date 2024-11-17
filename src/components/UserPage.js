import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import LogoTodo from "../icons_FEtask/To-do.svg";
import LogoInProgress from "../icons_FEtask/in-progress.svg";
import LogoDone from "../icons_FEtask/Done.svg";
import LogoRight1 from "../icons_FEtask/add.svg";
import LogoRight2 from "../icons_FEtask/3dot.svg";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const leftLogos = {
    Todo: LogoTodo,
    "In progress": LogoInProgress,
    Done: LogoDone,
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
        setUsers(result.users || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderSection = (userId, status) => {
    if (!data || !Array.isArray(data)) return null;

    const userTickets = data.filter((task) => task.userId === userId && task.status === status);

    if (userTickets.length === 0) {
      return <p style={styles.noTasks}>No tasks available for this user.</p>;
    }

    return userTickets.map((task, index) => (
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
        {users.map((user) => (
          <div style={styles.section} key={user.id}>
            <div style={styles.header}>
              <h2 style={styles.sectionTitle}>{user.name}</h2>
              <div style={styles.logosRight}>
                <img src={LogoRight1} alt="Right Logo 1" style={styles.logoRight} />
                <img src={LogoRight2} alt="Right Logo 2" style={styles.logoRight} />
              </div>
            </div>
            {["Todo", "In progress", "Done"].map((status) => (
              <div style={styles.subSection} key={status}>
                <div style={styles.header}>
                  <img src={leftLogos[status]} alt={`${status} Logo`} style={styles.logoLeft} />
                  <h3 style={styles.subSectionTitle}>{status}</h3>
                </div>
                {renderSection(user.id, status)}
              </div>
            ))}
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
    display: "flex",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    padding: "20px",
    backgroundColor: "transparent",
    outline: "none",
    border: "none",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  section: {
    flex: "1 1 300px",
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
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  subSection: {
    padding: "12px",
    marginBottom: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  subSectionTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#555",
  },
  noTasks: {
    fontStyle: "italic",
    color: "#888",
  },
};

export default UserPage;
