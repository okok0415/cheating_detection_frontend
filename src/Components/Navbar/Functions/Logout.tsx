import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { logoutUser } from '../../../Actions/userAction';
import "../CSS/Navbar.css";


function Logout(props: any) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const onLogoutHandler = async (e: any) => {
        e.preventDefault();
        
        dispatch(await logoutUser())
        window.location.replace(props.url);
    };

    return (
        <li className={'nav-item'}>
            <Link to={props.url} className={typeof (props.item) == "string" ? "string-button" : 'icon-button'} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onClick={onLogoutHandler}>
                {props.item}
            </Link>

            {open && props.children}
        </li>
    )
}


export default Logout;