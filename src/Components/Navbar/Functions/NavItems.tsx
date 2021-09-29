import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../CSS/Navbar.css";

function NavItem(props: any) {
    const [open, setOpen] = useState(false);

    const replaceURL = () => {
        window.location.replace(props.url);
    }

    return (
        <li className={props.border ? 'nav-item line-test' : 'nav-item'}>
            <Link to={props.url} className={typeof (props.item) == "string" ? "string-button" : 'icon-button'} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onClick={replaceURL}>
                {props.item}
            </Link>

            {open && props.children}
        </li>
    )
}


export default NavItem;