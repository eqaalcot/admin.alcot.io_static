import React, { useState } from "react";
import "./Delete.css";

/* 
Goal:
�������������û�������POST���󵽺�˵�/delete�ӿڡ�
����ҵ��û����ݲ��ɹ�ɾ������ʾ��ɾ�����û���Ϣ��
���δ�ҵ�����������ʾ���û������ڡ�������������Ϣ��
*/

const Delete = () => {
  const [username, setUsername] = useState(""); // ������û���
  const [deletedUserInfo, setDeletedUserInfo] = useState(null); // ��ɾ�����û���Ϣ
  const [errorMessage, setErrorMessage] = useState(""); // ������Ϣ

  const handleDelete = async (e) => {
      e.preventDefault(); 
      try {
          //���˷���POST����/delete�ӿ�                        
          const response = await fetch("https://admin.alcot.io:8443/api/account/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({ username }), //���û�������ת��ΪJSON��ʽ
          });

          if (response.ok) {
            const data = await response.json(); 
            setDeletedUserInfo(data); //���汻ɾ�����û���Ϣ
            setErrorMessage(""); //��մ�����Ϣ
          } else {
            setDeletedUserInfo(null);
            setErrorMessage(`Failed to delete user. Status: ${response.status}`); // ��ʾ����������Ϣ
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
                        onChange={(e) => setUsername(e.target.value)} // �����û���״̬
                    />
                    <button type="submit" className="delete-button">
                        Delete
                    </button>
                </form>

                {/* ��ʾ��ɾ�����û���Ϣ */}
                {deletedUserInfo && (
                    <div className="deleted-user-info">
                        <p><strong>Username:</strong> {deletedUserInfo.username}</p>
                        <p><strong>Password:</strong> {deletedUserInfo.password}</p>
                        <p><strong>Role:</strong> {deletedUserInfo.role}</p>
                    </div>
                )}

                {/* ��ʾ������Ϣ */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Delete;
