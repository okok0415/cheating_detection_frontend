import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavItem from "./Functions/NavItems";
import Logout from "./Functions/Logout";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as LogoutIcon } from "./icons/logout.svg";
import { ReactComponent as CDIcon } from "./icons/cheating_detection_2.svg";
import "./CSS/Navbar.css";
import { useDispatch } from "react-redux";
import { getUser } from "../../Actions/userAction";

function Navbar() {
    const [test, setTest] = useState(false);
    const [result, setResult] = useState(false);
    const [settings, setSettings] = useState(false);
    const [supervisor, setSupervisor] = useState("");

    const dispatch = useDispatch();
    useEffect(() => {
        const i: any = dispatch(getUser);
        i.then((res: any) => {
            setSupervisor(res.payload.supervisor)
        })
    }, []);
    
    useEffect(() => {
        if (window.location.pathname === "/") {
            setTest(false);
            setResult(false);
            setSettings(false);
        }
        else if (window.location.pathname === "/test/authentication" || window.location.pathname === "/test/collect" || window.location.pathname === "/test/test" || window.location.pathname === "/webcam") {
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
                    <NavItem item="Test" url={supervisor === 'true' ? "/supervisor/test" : "/test/authentication"} border={test}>

                    </NavItem>
                    <NavItem item="Result" url="/result" border={result}>

                    </NavItem>
                    <NavItem item={<CogIcon />} url="/settings/myprofile" border={settings}>

                    </NavItem>
                    <Logout item={<LogoutIcon />} url="/login">

                    </Logout>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;