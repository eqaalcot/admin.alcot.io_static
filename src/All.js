import React, { useState, useEffect } from "react";
import "./All.css";

const All = () => {
  const [accounts, setAccounts] = useState([]); // State to store fetched accounts
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  // Fetch data from the backend
  const fetchAccounts = async () => {
    try {
      const response = await fetch("https://admin.alcot.io:8443/api/account/all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json(); // Parse JSON response
        setAccounts(data); // Update accounts state with fetched data
        setErrorMessage(""); // Clear error message
      } else {
        setErrorMessage(`Failed to fetch accounts. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
      setErrorMessage("Unable to fetch data. Please try again later.");
    }
  };

  // Fetch accounts on component mount
  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="all-container">
      <h2>All Registered Accounts</h2>
      <button onClick={fetchAccounts} className="refresh-button">
        Refresh
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <table className="account-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.username}</td>
              <td>{account.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default All;
