import React, { useState } from "react";
import "./Delete.css";

/* 
Goal:
负责根据输入的用户名发送POST请求到后端的/delete接口。
如果找到用户数据并成功删除，显示被删除的用户信息。
如果未找到或发生错误，提示“用户不存在”或其他错误信息。
*/

const Delete = () => {
  const [username, setUsername] = useState(""); // 输入的用户名
  const [deletedUserInfo, setDeletedUserInfo] = useState(null); // 被删除的用户信息
  const [errorMessage, setErrorMessage] = useState(""); // 错误信息

  const handleDelete = async (e) => {
      e.preventDefault(); 
      try {
          //向后端发送POST请求到/delete接口                        
          const response = await fetch("https://admin.alcot.io:8443/api/account/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({ username }), //将用户名数据转换为JSON格式
          });

          if (response.ok) {
            const data = await response.json(); 
            setDeletedUserInfo(data); //保存被删除的用户信息
            setErrorMessage(""); //清空错误信息
          } else {
            setDeletedUserInfo(null);
            setErrorMessage(`Failed to delete user. Status: ${response.status}`); // 显示其他错误信息
          }
      } catch (error) {
          console.error("Error:", error);
          setErrorMessage("Unable to delete user. Please try again later."); 
      }
    };

    return (
        <div className="delete-container">
            <div className="delete-card">
                <form onSubmit={handleDelete}>
                    <label htmlFor="username" className="delete-label">
                        Search username to delete:
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="delete-input"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // 更新用户名状态
                    />
                    <button type="submit" className="delete-button">
                        Delete
                    </button>
                </form>

                {/* 显示被删除的用户信息 */}
                {deletedUserInfo && (
                    <div className="deleted-user-info">
                        <p><strong>Username:</strong> {deletedUserInfo.username}</p>
                        <p><strong>Password:</strong> {deletedUserInfo.password}</p>
                        <p><strong>Role:</strong> {deletedUserInfo.role}</p>
                    </div>
                )}

                {/* 显示错误信息 */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Delete;
