import React, { useState, useEffect } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeName, getUser, loginUser } from "../../Actions/userAction";
import { ReactComponent as CDIcon } from "../Navbar/icons/cheating_detection_2.svg";
import "./CSS/Login.css";
function CheckItems(props: any) {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("")
    const [birth, setBirth] = useState("")
    const [cname, setCname] = useState("")
    const [cbirth, setCbirth] = useState("");
    const [redirectchange, setRedirectchange] = useState(false);
    const [redirectskip, setRedirectskip] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const i: any = dispatch(getUser);
        i.then((res: any) => {
            setUsername(res.payload.username)
            setName(res.payload.name)
            setBirth(res.payload.birth)
        })
    }, []);

    const onsubmitHandler = (e: any) => {
        e.preventDefault();
        let body = {
            username: username,
            name: cname,
            birth: cbirth
        }
        dispatch(changeName(body))
        setRedirectchange(true);
    }

    const onskipHandler = (e: any) => {
        e.preventDefault();
        setRedirectskip(true)
    }

    if (redirectchange) {
        alert("성공적으로 변경하였습니다!")
        return (<Redirect to="/" />)
    }

    if (redirectskip) {
        return (<Redirect to="/" />)
    }
    return (
        <div className="checkitems">
            <div className="checkitems-form">
                <div className="title">
                    정보 확인
                </div>
                <div className="myprofile-instance">
                    <div className="left">이름</div>
                    <div className="right">{name}</div>
                </div>
                <div className="myprofile-instance">
                    <div className="left">생년월일</div>
                    <div className="right">{birth}</div>
                </div>
                <div className="inf-text">이 정보가 맞나요? 아니라면...</div>
                <div className="myprofile-instance">
                    <div className="left">변경할 이름</div>
                    <input type="name" className="inputvalue" value={cname} onChange={(e) => setCname(e.currentTarget.value)} />
                </div>
                <div className="myprofile-instance">
                    <div className="left">변경할 생년월일</div>
                    <input type="birth" className="inputvalue" value={cbirth} onChange={(e) => setCbirth(e.currentTarget.value)} />
                </div>
                <div className="submit">
                    <button className="button" onClick={onsubmitHandler}>변경</button>
                    <button className="button" onClick={onskipHandler}>Skip</button>
                </div>
            </div>
        </div>
    );
}

export default CheckItems;
