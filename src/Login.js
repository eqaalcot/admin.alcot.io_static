import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
/*Goal:
�����ռ��û��������룬 
����һ��POST���󵽺�˵�/login�ӿڡ�
��������֤�ɹ������Դ洢���ص�JWT��������cookie� 
�����֤ʧ�ܣ�����ʾ ���û�����������󡱡�
*/        

const Login = () => {
    // ״̬���������û���������ʹ�����Ϣ
    const [username, setUsername] = useState(""); // �û���������ֵ
    const [password, setPassword] = useState(""); // ����������ֵ
    const [errorMessage, setErrorMessage] = useState(""); // ������Ϣ

    const navigate = useNavigate(); // Hook for navigation
    // ���ύ�¼�����
    const handleSubmit = async (e) => {
        e.preventDefault(); // ��ֹ����Ĭ��ˢ����Ϊ

        // ׼�����͵���˵�����
        const data = { username, password };

        // ע�͵�ʵ������Ĳ���
        
        try {
            // ���˷���POST����
            const response = await fetch("https://admin.alcot.io:8443/api/account/login", {
                method: "POST",
                headers: { 
                    Accept: 'application/json',
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(data), // ת��ΪJSON��ʽ����
            });

            // ��� HTTP ��Ӧ״̬��
            if (response.ok) {
                const result = await response.json(); // ����˷��ص�����ת��ΪJavaScript����
                console.log("Login successful:", result); // �ڿ���̨�����¼�ɹ���Ϣ
                setErrorMessage(""); // ��մ�����Ϣ
                alert("Login successful!"); // ������¼�ɹ���ʾ
                // Print all response headers
                //console.log(`cookie is ${document.cookie}`);
                //console.log(`set-cookie is ${response.headers.get('set-cookie')}`);

                navigate("/home"); // ��ת����ҳ��
            } else {
                setErrorMessage(`Login failed. Response's status code error(Status: ${response.status}).`); 
            }
        } catch (error) {
            console.error("Error:", error); // ����̨������������Ϣ
            setErrorMessage("Login failed. Please try again later."); 
        }
        
       // ģ����ת�߼������Ե�¼��֤��
    //    setErrorMessage(""); // ��մ�����Ϣ
    //    navigate("/home"); // ��ת����ҳ��

    };


    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Sign in</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="login-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // ����������û���
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // �������������
                    />
                    <button type="submit" className="login-button">LOGIN</button>
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
