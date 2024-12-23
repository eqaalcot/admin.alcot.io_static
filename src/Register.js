import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
/* Goal:
负责收集用户名、密码和角色 (user/admin)，
发送一个POST请求到后端的 /register 接口。
如果后端验证成功，显示注册成功提示，并可跳转到登录页面(还没有做)。
如果验证失败（如用户名或密码不符合要求或其他问题），则提示错误信息。
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

    // 处理表单提交
    const handleSubmit = async (e) => {
        e.preventDefault(); // 阻止表单默认的刷新行为
    
        // 验证用户名和密码是否符合规则
        const usernameError = validateUsername();
        const passwordError = validatePassword();
    
        if (usernameError || passwordError) {
            // 如果验证失败，显示错误信息
            setErrorMessage(usernameError || passwordError);
        } else {
            // 如果验证通过，清空错误信息
            setErrorMessage("");
        
            // 准备要发送到后端的数据
            const data = { role, username, password };
        
            try {

                // 向后端发送 POST 请求
                const response = await fetch("https://admin.alcot.io:8443/api/account/register", {
                    method: "POST",
                    credentials:"include",
                    headers: { "Content-Type": "application/json" }, 
                    body: JSON.stringify(data), // 将数据转换为 JSON 格式
                });
        
                // 检查 HTTP 响应状态码
                if (response.ok) {  // 如果状态码请求成功
                    const result = await response.json(); // 将后端返回的数据转换为 JavaScript 对象
                    console.log("Registration Succeed:", result); // 在控制台输出成功信息
                    alert("Registration Succeed!"); // 弹出成功提示
                    console.log(`cookie is ${document.cookie}`);
                } else {
                    setErrorMessage(`Registration failed. Response's status code error(Status: ${response.status}).`);
                }
            } catch (error) {
                // 如果请求过程中发生网络错误
                console.error(error); // 在控制台输出错误信息
                setErrorMessage("Registration failed! Please try again later."); // 显示网络错误提示
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
