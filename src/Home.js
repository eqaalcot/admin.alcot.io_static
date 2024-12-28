import React from "react"; 
import { Link, Routes, Route } from "react-router-dom";
import Find from "./Find";
import Register from "./Register";
import All from "./All"; 
import "./Home.css";

// Application version constant
const APP_VERSION = "0.1.1";

const Home = () => {
    return (
        <div className="home-layout">
            {/* Left Navbar */}
            <div className="navbar">
                <h1>My App</h1>
                <ul>
                    <li>
                        <Link to="/home/all">Accounts</Link> {/* Add a link to the All page */}
                    </li>
                    <li>
                        <Link to="/home/find">Find</Link>
                    </li>
                </ul>
                {/* Version number at the bottom */}
                <div className="version">
                    Version {APP_VERSION}
                </div>
            </div>

            {/* Right Content */}
            <div className="content">
                <Routes>
                    <Route path="find" element={<Find />} />
                    <Route path="register" element={<Register />} />
                    <Route path="all" element={<All />} /> {/* Add the All route */}
                </Routes>
            </div>
        </div>
    );
};

export default Home;
