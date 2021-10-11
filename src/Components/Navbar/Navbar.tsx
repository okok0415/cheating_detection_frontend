import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavItem from "./Functions/NavItems";
import Logout from "./Functions/Logout";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as LogoutIcon } from "./icons/logout.svg";
import { ReactComponent as CDIcon } from "./icons/cheating_detection_2.svg";
import "./CSS/Navbar.css";

function Navbar() {
    const [test, setTest] = useState(false);
    const [result, setResult] = useState(false);
    const [settings, setSettings] = useState(false);

    useEffect(() => {
        if (window.location.pathname === "/") {
            setTest(false);
            setResult(false);
            setSettings(false);
        }
        else if (window.location.pathname === "/test") {
            setTest(true);
            setResult(false);
            setSettings(false);
        } else if (window.location.pathname === "/result") {
            setResult(true);
            setTest(false);
            setSettings(false);
        } else if (window.location.pathname === "/settings") {
            setSettings(true);
            setTest(false);
            setResult(false);
        } else {
            setTest(false);
            setResult(false);
            setSettings(false);
        }
    }, []);

    const replaceURL = () => {
        window.location.replace("/");
    }
    return (
        <>
            <nav className="navbar">
                <Link to='/' className="navbar-title" onClick={replaceURL}><CDIcon /></Link>
                <ul className='navbar-nav'>
                    <NavItem item="Test" url="/test" border={test}>

                    </NavItem>
                    <NavItem item="Result" url="/result" border={result}>

                    </NavItem>
                    <NavItem item={<CogIcon />} url="/settings" border={settings}>

                    </NavItem>
                    <Logout item={<LogoutIcon />} url="/login">

                    </Logout>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;