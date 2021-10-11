import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Actions/userAction";
import { ReactComponent as CDIcon } from "../Navbar/icons/cheating_detection_2.svg";
import "./CSS/Login.css";
function Signup(props: any) {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [Birth, setBirth] = useState("");
    const [ConfirmPasword, setConfirmPasword] = useState("");
    const [IDcard, setIDcard] = useState<any>();
    const [ufocus, setUfocus] = useState(false);
    const [nfocus, setNfocus] = useState(false);
    const [bfocus, setBfocus] = useState(false);
    const [pfocus, setPfocus] = useState(false);
    const [cfocus, setCfocus] = useState(false);
    const dispatch = useDispatch();

    const onufocusHandler = (e: any) => {
        setUfocus(!ufocus);
    }

    const onnfocusHandler = (e: any) => {
        setNfocus(!nfocus);
    }

    const onbfocusHandler = (e: any) => {
        setBfocus(!bfocus);
    }

    const onpfocusHandler = (e: any) => {
        setPfocus(!pfocus);
    }

    const oncfocusHandler = (e: any) => {
        setCfocus(!cfocus);
    }


    const onUsernameHandler = (e: any) => {
        setUsername(e.currentTarget.value);
    };

    const onNameHandler = (e: any) => {
        setName(e.currentTarget.value);
    };

    const onBirthHandler = (e: any) => {
        setBirth(e.currentTarget.value);
    };

    const onPasswordHandler = (e: any) => {
        setPassword(e.currentTarget.value);
    };

    const onConfirmPasswordHandler = (e: any) => {
        setConfirmPasword(e.currentTarget.value);

    };
    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        if (Password !== ConfirmPasword) {
            console.log("비밀번호 불일치");
        } else {

            const uploadData = new FormData();
            uploadData.append('username', Username);
            uploadData.append('name', Name);
            uploadData.append('birth', Birth);
            uploadData.append('password', Password);
            uploadData.append('image', IDcard, IDcard.name);
            console.log(uploadData);
            dispatch(registerUser(uploadData))
        }
    };
    return (
        <div className="register">
            <form
                onSubmit={onSubmitHandler} className="register-form">
                <div className="title">
                    <CDIcon />
                </div>
                <div className="title">
                    회원가입
                </div>
                <div className={ufocus || Username !== "" ? "input-div one focus" : "input-div one"}>
                    <div className="i">
                        <i className="fas fa-id-card"></i>
                    </div>
                    <div>
                        <h5>학번</h5>
                        <input onClick={onufocusHandler} className="input" type="string" value={Username} onChange={onUsernameHandler} required />
                    </div>
                </div>
                <div className={nfocus || Name !== "" ? "input-div one focus" : "input-div one"}>
                    <div className="i">
                        <i className="fas fa-user"></i>
                    </div>
                    <div>
                        <h5>이름</h5>
                        <input onClick={onnfocusHandler} className="input" type="string" value={Name} onChange={onNameHandler} required />
                    </div>
                </div>
                <div className={bfocus || Birth !== "" ? "input-div one focus" : "input-div one"}>
                    <div className="i">
                        <i className="fas fa-calendar-week"></i>
                    </div>
                    <div>
                        <h5>생년월일</h5>
                        <input onClick={onbfocusHandler} className="input" type="string" value={Birth} onChange={onBirthHandler} required />
                    </div>
                </div>
                {(bfocus || Birth !== '') && <div className="bottom-text">YYYYMMDD 형태로 작성.</div>}
                <div className={pfocus || Password !== "" ? "input-div one focus" : "input-div one"}>
                    <div className="i">
                        <i className="fas fa-lock"></i>
                    </div>
                    <div>
                        <h5>비밀번호</h5>
                        <input onClick={onpfocusHandler} className="input" type="password" value={Password} onChange={onPasswordHandler} required />
                    </div>
                </div>
                {(pfocus || Password !=='') && <div className="bottom-text">영문(a~z), 숫자(0~9), 특수문자 모두 포함 8자 이상.</div>}
                <div className={cfocus || ConfirmPasword !== "" ? "input-div one focus" : "input-div one"}>
                    <div className="i">
                        <i className="fas fa-lock"></i>
                    </div>
                    <div>
                        <h5>비밀번호 확인</h5>
                        <input onClick={oncfocusHandler} className="input" type="password" value={ConfirmPasword} onChange={onConfirmPasswordHandler} required />
                    </div>
                </div>
                {(cfocus || ConfirmPasword !== '') && <div className="bottom-text">영문(a~z), 숫자(0~9), 특수문자 모두 포함 8자 이상.</div>}
                <div className="label">
                    <div className="idcard-icon"><i className="fas fa-id-card idcard"></i></div>
                    <label className="left">  신분증</label>
                    <input className="right" type="file" accept='image/jpg, image/png, image/jpeg, image/gif' onChange={(e: any) => setIDcard(e.target.files[0])} required />
                </div>
                <Link to="/login" className="information">
                    이미 계정이 있으십니까? ...로그인
                </Link>
                <div className="submit">
                    <button className="button" type="submit">제출</button>
                </div>
            </form>
        </div>
    );
}

export default withRouter(Signup);
