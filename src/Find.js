import React, { useState } from "react";
import "./Find.css";
/* Goal:
负责根据输入的用户名或相关信息，发送POST请求向后端（或者get？）。
如果找到用户数据，显示相关用户信息。
如果找不到或后端返回错误，提示 "用户不存在" 或其他错误信息。
*/
const Find = () => {
    const [username, setUsername] = useState(""); // input username
    const [userInfo, setUserInfo] = useState(null); // returned user info
    const [errorMessage, setErrorMessage] = useState(""); 

    const handleFind = async (e) => {
        e.preventDefault(); 

        try {
            // 向后端发送POST请求到/find接口，传递用户名数据
            const response = await fetch("http://backend-server/find", {
                method: "POST", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({ username }), 
            });
        
            // 检查响应状态码是否ok
            if (response.ok) {
                const data = await response.json(); // 将返回的JSON数据转换为JS对象
                setUserInfo(data); // 将返回的用户信息保存到状态中
                setErrorMessage(""); // 如果之前有错误信息，清除这些信息
            } else {
                setUserInfo(null); //清空用户信息
                setErrorMessage(`Search failed. Response's status code error(Status: ${response.status}).`); 
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Error occured. Please try again later."); 
        }
        
    };

    return (
        <div className="find-container">
        <div className="find-card">
            <form onSubmit={handleFind}>
            <label htmlFor="username" className="find-label">
                Enter username:
            </label>
            <input
                id="username"
                type="text"
                className="find-input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className="find-button">
                Find
            </button>
            </form>

            {/* Display user info if found */}
            {userInfo && (
            <div className="user-info">
                <p><strong>Username:</strong> {userInfo.username}</p>
                <p><strong>Password:</strong> {userInfo.password}</p>
                <p><strong>Role:</strong> {userInfo.role}</p>
            </div>
            )}

            {/* Display error message if no user found */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        </div>
    );
};

export default Find;
