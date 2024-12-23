import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Find from "./Find";
import Register from "./Register";
import Delete from "./Delete";
import All from "./All"; // Import the All component
import "./Home.css";

const Home = () => {
    return (
        <div className="home-layout">
        {/* Left Navbar */}
        <div className="navbar">
            <h1>My App</h1>
            <ul>
            <li>
                <Link to="/home/find">Find</Link>
            </li>
            <li>
                <Link to="/home/register">Register</Link>
            </li>
            <li>
                <Link to="/home/delete">Delete</Link>
            </li>
            <li>
                <Link to="/home/all">All</Link> {/* Add a link to the All page */}
            </li>
            </ul>
        </div>

        {/* Right Content */}
        <div className="content">
            <Routes>
            <Route path="find" element={<Find />} />
            <Route path="register" element={<Register />} />
            <Route path="delete" element={<Delete />} />
            <Route path="all" element={<All />} /> {/* Add the All route */}
            </Routes>
        </div>
        </div>
    );
};

export default Home;
