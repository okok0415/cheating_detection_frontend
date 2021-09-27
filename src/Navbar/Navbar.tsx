import React from "react";
import { Link } from "react-router-dom";
import NavItem from "./Functions/NavItems";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as LogoutIcon } from "./icons/logout.svg";
import { ReactComponent as CDIcon } from "./icons/cheating_detection_2.svg";
import "./CSS/Navbar.css";

function Navbar() {
    return (
        <>
            <nav className="navbar">
                <Link to='/' className="navbar-title"><CDIcon /></Link>
                <ul className="navbar-nav">
                    <NavItem item="Test" url="/test">

                    </NavItem>
                    <NavItem item="Result" url="/result">

                    </NavItem>
                    <NavItem item={<CogIcon />} url="/settings">

                    </NavItem>
                    <NavItem item={<LogoutIcon />} url="/login">

                    </NavItem>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;