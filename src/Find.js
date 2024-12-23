import React, { useState } from "react";
import "./Find.css";
/* Goal:
�������������û����������Ϣ������POST�������ˣ�����get������
����ҵ��û����ݣ���ʾ����û���Ϣ��
����Ҳ������˷��ش�����ʾ "�û�������" ������������Ϣ��
*/
const Find = () => {
    const [username, setUsername] = useState(""); // input username
    const [userInfo, setUserInfo] = useState(null); // returned user info
    const [errorMessage, setErrorMessage] = useState(""); 

    const handleFind = async (e) => {
        e.preventDefault(); 

        try {
            // ���˷���POST����/find�ӿڣ������û�������
            const response = await fetch("http://backend-server/find", {
                method: "POST", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({ username }), 
            });
        
            // �����Ӧ״̬���Ƿ�ok
            if (response.ok) {
                const data = await response.json(); // �����ص�JSON����ת��ΪJS����
                setUserInfo(data); // �����ص��û���Ϣ���浽״̬��
                setErrorMessage(""); // ���֮ǰ�д�����Ϣ�������Щ��Ϣ
            } else {
                setUserInfo(null); //����û���Ϣ
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
