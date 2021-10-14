import React, { useState } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Actions/userAction";
import { ReactComponent as CDIcon } from "../Navbar/icons/cheating_detection_2.svg";
import "./CSS/Login.css";
function Signin(props: any) {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [ufocus, setUfocus] = useState(false);
    const [pfocus, setPfocus] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch();

    const onsfocusHandler = (e: any) => {
        setUfocus(!ufocus);
    }

    const onpfocusHandler = (e: any) => {
        setPfocus(!pfocus);
    }

    const onUsernameHandler = (e: any) => {
        setUsername(e.currentTarget.value);
    };

    const onPasswordHandler = (e: any) => {
        setPassword(e.currentTarget.value);
    };

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();
        let body = {
            username: Username,
            password: Password,
        };
        console.log(body)
        dispatch(await loginUser(body))
        setRedirect(true);
    };

    if (redirect) {
        return (<Redirect to="/" />)
    }

    return (
        <div className="register">
            <form
                onSubmit={onSubmitHandler} className="register-form">
                <div className="title">
                    <CDIcon />
                </div>
                <div className="title">
                    로그인
                </div>
                <div className={ufocus || Username !== "" ? "input-div one focus" : "input-div one"}>
                    <div className="i">
                        <i className="fas fa-id-card"></i>
                    </div>
                    <div>
                        <h5>학번</h5>
                        <input onClick={onsfocusHandler} className="input" type="string" value={Username} onChange={onUsernameHandler} required />
                    </div>
                </div>
                <div className={pfocus || Password !== "" ? "input-div one focus" : "input-div one"}>
                    <div className="i">
                        <i className="fas fa-lock"></i>
                    </div>
                    <div>
                        <h5>비밀번호</h5>
                        <input onClick={onpfocusHandler} className="input" type="password" value={Password} onChange={onPasswordHandler} required />
                    </div>
                </div>
                <Link to="/register" className="information">
                    계정이 없으신가요? ...회원가입
                </Link>
                <div className="submit">
                    <button className="button" type="submit">제출</button>
                </div>
            </form>
        </div>
    );
}

export default withRouter(Signin);
