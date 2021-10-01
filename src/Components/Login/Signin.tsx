import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Actions/userAction";
import { ReactComponent as CDIcon } from "../Navbar/icons/cheating_detection_2.svg";
import "./CSS/Login.css";
function Signin(props: any) {
    const [SchoolID, setSchoolID] = useState("");
    const [Password, setPassword] = useState("");
    const [sfocus, setSfocus] = useState(false);
    const [pfocus, setPfocus] = useState(false);

    const dispatch = useDispatch();

    const onsfocusHandler = (e: any) => {
        setSfocus(!sfocus);
    }

    const onpfocusHandler = (e: any) => {
        setPfocus(!pfocus);
    }

    const onSchoolIDHandler = (e: any) => {
        setSchoolID(e.currentTarget.value);
    };

    const onPasswordHandler = (e: any) => {
        setPassword(e.currentTarget.value);
    };

    const onSubmitHandler = (e: any) => {
        let body = {
            schoolID: SchoolID,
            password: Password,
        };
        dispatch(loginUser(body))

    };
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
                <div className={sfocus || SchoolID !== "" ? "input-div one focus" : "input-div one"}>
                    <div className="i">
                        <i className="fas fa-id-card"></i>
                    </div>
                    <div>
                        <h5>학번</h5>
                        <input onClick={onsfocusHandler} className="input" type="string" value={SchoolID} onChange={onSchoolIDHandler} required />
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
                {pfocus && <div className="bottom-text">영문(a~z), 숫자(0~9), 특수문자 모두 포함 8자 이상.</div>}
                <div className="submit">
                    <button className="button" type="submit">제출</button>
                </div>
            </form>
        </div>
    );
}

export default withRouter(Signin);
