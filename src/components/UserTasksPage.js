import React, { useState, useEffect } from 'react';

const UserTasksPage = () => {
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);

  // Fetching users and tickets data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('/api/users');
        const ticketsResponse = await fetch('/api/tickets');
        
        const usersData = await usersResponse.json();
        const ticketsData = await ticketsResponse.json();
        
        setUsers(usersData.users);
        setTickets(ticketsData.tickets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  // Group tasks by userId
  const groupTasksByUser = () => {
    return users.map((user) => {
      const userTasks = tickets.filter((ticket) => ticket.userId === user.id);
      return { user, tasks: userTasks };
    });
  };

  const groupedTasks = groupTasksByUser();

  return (
    <div style={styles.container}>
      {groupedTasks.map(({ user, tasks }) => (
        <div key={user.id} style={styles.userSection}>
          <h2>{user.name}</h2>
          <div style={styles.taskList}>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div key={task.id} style={styles.taskItem}>
                  <h4>{task.title}</h4>
                  <p>Status: {task.status}</p>
                  <p>Priority: {task.priority}</p>
                </div>
              ))
            ) : (
              <p>No tasks assigned to this user.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Add some basic styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f8f8',
  },
  userSection: {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  taskList: {
    marginTop: '10px',
  },
  taskItem: {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f1f1f1',
    borderRadius: '5px',
  },
};

export default UserTasksPage;
