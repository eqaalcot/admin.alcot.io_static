import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";
import "./All.css";

const ALL_URL = "https://admin.alcot.io:8443/api/account/all";
const LOCK_URL = "https://admin.alcot.io:8443/api/account/lock";
const UNLOCK_URL = "https://admin.alcot.io:8443/api/account/unlock";
const DELETE_URL = "https://admin.alcot.io:8443/api/account/delete";
const CHANGE_PASSWORD_URL = "https://admin.alcot.io:8443/api/account/change_password";

const All = () => {
    const [accounts, setAccounts] = useState([]);
    const [filteredAccounts, setFilteredAccounts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [contextMenu, setContextMenu] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [actionType, setActionType] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [alertData, setAlertData] = useState({ message: "", description: "", visible: false });
    const navigate = useNavigate();

    const triggerAlert = (message, description) => {
        setAlertData({ message, description, visible: true });
        setTimeout(() => {
            setAlertData({ ...alertData, visible: false });
        }, 5000);
    };

    const fetchAccounts = async () => {
        try {
            const response = await fetch(ALL_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setAccounts(data);
                setFilteredAccounts(data);
            } else {
                const errorData = await response.json();
                triggerAlert("Failed to Fetch Accounts", errorData.message || `Status code: ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching accounts:", error);
            triggerAlert("Error", "Unable to fetch data. Please try again later.");
        }
    };

    const handleSearch = () => {
        const trimmedInput = searchInput.trim().toLowerCase();
        setFilteredAccounts(
            trimmedInput === ""
                ? accounts
                : accounts.filter((account) => account.username.toLowerCase().includes(trimmedInput))
        );
    };

    const handleRightClick = (e, account) => {
        e.preventDefault();
        setSelectedAccount(account);
        setContextMenu({ x: e.pageX, y: e.pageY });
    };

    const closeContextMenu = () => setContextMenu(null);

    const openModal = (type) => {
        setActionType(type);
        setShowModal(true);
        closeContextMenu();
    };

    const closeModal = () => {
        setShowModal(false);
        setInputValue("");
        setActionType("");
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-z0-9_]{7,}$/;
        return passwordRegex.test(inputValue)
            ? ""
            : "Password must be at least 7 characters, contain letters and numbers, and only include a-z, 0-9, and _";
    };

    const handleAction = async () => {
        let url, body;

        if (actionType === "lock") {
            if (!inputValue || parseInt(inputValue) <= 0) {
                triggerAlert("Validation Error", "Please enter a valid positive duration.");
                return;
            }
            url = LOCK_URL;
            body = { username: selectedAccount.username, duration: inputValue };
        } else if (actionType === "unlock") {
            url = UNLOCK_URL;
            body = { username: selectedAccount.username };
        } else if (actionType === "changePassword") {
            const validationError = validatePassword();
            if (validationError) {
                triggerAlert("Validation Error", validationError);
                return;
            }
            url = CHANGE_PASSWORD_URL;
            body = { username: selectedAccount.username, password: inputValue };
        } else if (actionType === "delete") {
            url = DELETE_URL;
            body = { username: selectedAccount.username };
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(body),
            });

            if (response.ok) {
                alert(`${actionType.charAt(0).toUpperCase() + actionType.slice(1)} successful for account ${selectedAccount.username}.`);
                closeModal();
                fetchAccounts();
            } else {
                const errorData = await response.json();
                triggerAlert(`Failed to ${actionType}`, errorData.message || `Status code: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error performing ${actionType} action:`, error);
            triggerAlert("Error", `An error occurred while trying to ${actionType} the account.`);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    return (
        <div className="all-container" onClick={closeContextMenu}>
            <h2>All Registered Accounts</h2>
            <div className="actions-container">
                <button onClick={fetchAccounts} className="action-button">Refresh</button>
                <button onClick={() => navigate("/home/register")} className="action-button">Register</button>
                <input
                    type="text"
                    placeholder="Search by username"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="action-button">Search</button>
            </div>

            <table className="account-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAccounts.map((account, index) => (
                        <tr key={account.id} onContextMenu={(e) => handleRightClick(e, account)}>
                            <td>{index + 1}</td> {/* Continuous numbering */}
                            <td>{account.username}</td>
                            <td>{account.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {contextMenu && (
                <div className="context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
                    <button onClick={() => openModal("lock")}>Lock Account</button>
                    <button onClick={() => openModal("unlock")}>Unlock Account</button>
                    <button onClick={() => openModal("changePassword")}>Change Password</button>
                    <button onClick={() => openModal("delete")}>Delete Account</button>
                </div>
            )}

            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2 className="modal-title">
                            {`${actionType.charAt(0).toUpperCase() + actionType.slice(1)} ${
                                actionType === "changePassword" ? "for" : ""
                            } ${selectedAccount.username}`}
                        </h2>

                        {actionType !== "unlock" && actionType !== "delete" && (
                            <input
                                type={actionType === "changePassword" ? "password" : "number"}
                                placeholder={
                                    actionType === "changePassword" ? "Enter new password" : "Enter duration in seconds"
                                }
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="modal-input"
                            />
                        )}

                        <div className="modal-buttons">
                            <button className="confirm-button" onClick={handleAction}>Confirm</button>
                            <button className="cancel-button" onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {alertData.visible && (
                <Alert
                    message={alertData.message}
                    description={alertData.description}
                    type="warning"
                    closable
                    onClose={() => setAlertData({ ...alertData, visible: false })}
                    style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}
                />
            )}
        </div>
    );
};

export default All;
