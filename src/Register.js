import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
/* Goal:
�����ռ��û���������ͽ�ɫ (user/admin)��
����һ��POST���󵽺�˵� /register �ӿڡ�
��������֤�ɹ�����ʾע��ɹ���ʾ��������ת����¼ҳ��(��û����)��
�����֤ʧ�ܣ����û��������벻����Ҫ����������⣩������ʾ������Ϣ��
*/

const Register = () => {
    const [role, setRole] = useState("user"); 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Validate username based on role
    const validateUsername = () => {
        if (role === "ADMIN") {
            const adminRegex = /^[a-z0-9_]{5,30}$/; // Admin regex
            return adminRegex.test(username)? "": "Username must be between 5-30(inclusive) characters and only contain a-z, 0-9, and _";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex
            return emailRegex.test(username) ? "" : "Username must be a valid email";
        }
    };

    // Validate password
    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-z0-9_]{7,}$/; // Password regex
        return passwordRegex.test(password)? "": "Password must be at least 7 characters, contain letters and numbers, and only include a-z, 0-9, and _";
    };

    // ������ύ
    const handleSubmit = async (e) => {
        e.preventDefault(); // ��ֹ��Ĭ�ϵ�ˢ����Ϊ
    
        // ��֤�û����������Ƿ���Ϲ���
        const usernameError = validateUsername();
        const passwordError = validatePassword();
    
        if (usernameError || passwordError) {
            // �����֤ʧ�ܣ���ʾ������Ϣ
            setErrorMessage(usernameError || passwordError);
        } else {
            // �����֤ͨ������մ�����Ϣ
            setErrorMessage("");
        
            // ׼��Ҫ���͵���˵�����
            const data = { role, username, password };
        
            try {

                // ���˷��� POST ����
                const response = await fetch("https://admin.alcot.io:8443/api/account/register", {
                    method: "POST",
                    credentials:"include",
                    headers: { "Content-Type": "application/json" }, 
                    body: JSON.stringify(data), // ������ת��Ϊ JSON ��ʽ
                });
        
                // ��� HTTP ��Ӧ״̬��
                if (response.ok) {  // ���״̬������ɹ�
                    const result = await response.json(); // ����˷��ص�����ת��Ϊ JavaScript ����
                    console.log("Registration Succeed:", result); // �ڿ���̨����ɹ���Ϣ
                    alert("Registration Succeed!"); // �����ɹ���ʾ
                    console.log(`cookie is ${document.cookie}`);
                } else {
                    setErrorMessage(`Registration failed. Response's status code error(Status: ${response.status}).`);
                }
            } catch (error) {
                // �����������з����������
                console.error(error); // �ڿ���̨���������Ϣ
                setErrorMessage("Registration failed! Please try again later."); // ��ʾ���������ʾ
            }
        }
    };  
    

    return (
        <div className="register-container">
        <div className="register-card">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
            {/* Role */}
            <label>
                <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="register-input"
                >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
                </select>
            </label>

            {/* Username */}
            <input
                type="text"
                placeholder="Username"
                className="register-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            {/* Password */}
            <input
                type="password"
                placeholder="Password"
                className="register-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* Display Error Message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* Register Button */}
            <button type="submit" className="register-button">
                Register
            </button>
            </form>
            {/* <p className="login-link">
                Have an account? <Link to="/">Login here</Link>
            </p> */}
        </div>
        </div>
    );
};

export default Register;
