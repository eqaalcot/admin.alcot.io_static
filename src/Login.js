import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import { AntDesignOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';


/*Goal:
负责收集用户名和密码， 
发送一个POST请求到后端的/login接口。
如果后端验证成功，可以存储返回的JWT（？）在cookie里。 
如果验证失败，则提示 “用户名或密码错误”。
*/        

const Login = () => {
    // 状态管理：保存用户名、密码和错误信息
    const [username, setUsername] = useState(""); // 用户名输入框的值
    const [password, setPassword] = useState(""); // 密码输入框的值
    const [errorMessage, setErrorMessage] = useState(""); // 错误信息

    const navigate = useNavigate(); // Hook for navigation
    // 表单提交事件处理
    const handleSubmit = async (e) => {
        e.preventDefault(); // 阻止表单的默认刷新行为

        // 准备发送到后端的数据
        const data = { username, password };

        // 注释掉实际请求的部分
        
        try {
            // 向后端发送POST请求
            const response = await fetch("https://admin.alcot.io:8443/api/account/login", {
                method: "POST",
                headers: { 
                    Accept: 'application/json',
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(data), // 转换为JSON格式后发送
            });

            // 检查 HTTP 响应状态码
            if (response.ok) {
                const result = await response.json(); // 将后端返回的数据转换为JavaScript对象
                console.log("Login successful:", result); // 在控制台输出登录成功信息
                setErrorMessage(""); // 清空错误信息
                alert("Login successful!"); // 弹出登录成功提示
                navigate("/home"); // 跳转到主页面
            } else {
                setErrorMessage(`Login failed. Response's status code error(Status: ${response.status}).`); 
            }
        } catch (error) {
            console.error("Error:", error); // 控制台输出网络错误信息
            setErrorMessage("Login failed. Please try again later."); 
        }
        
       // 模拟跳转逻辑（忽略登录验证）
    //    setErrorMessage(""); // 清空错误信息
    //    navigate("/home"); // 跳转到主页面

    };


    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Sign in</h2>
                <form>
                    <input
                        type="text"
                        placeholder="Username"
                        className="login-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // 保存输入的用户名
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // 保存输入的密码
                    />
                    {/* <button type="submit" className="login-button">LOGIN</button> */}
                    <Button type="primary" className="login-button" size="large" icon={<AntDesignOutlined />} onClick={handleSubmit}>
                        LOGIN
                    </Button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                
                {/* <p className="signup-link">
                    Don't have an account? <Link to="/register">Sign up</Link> 
                </p> */}
            </div>
        </div>
    );
};

export default Login;
