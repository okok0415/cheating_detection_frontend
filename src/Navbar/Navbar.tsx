import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Navbar.css";
function Navbar() {
    return (
        <>
            <div className="nav">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/">Blog</Link>
                <Link to="/">Portfolio</Link>
                <Link to="/">Contact</Link>
                <div className="animation start-about"></div>
            </div>
        </>
    )
}

export default Navbar;