import React, { useState } from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser, loginUser } from "../../Actions/userAction";
import { ReactComponent as CDIcon } from "../Navbar/icons/cheating_detection_2.svg";
import Loader from "react-loader-spinner";
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
    const [isLoading, setIsLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
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
            setIsLoading(true);
            register();
        }
    };

    const register = async () => {
        const uploadData = new FormData();
        uploadData.append('username', Username);
        uploadData.append('password', Password);
        uploadData.append('image', IDcard, IDcard.name);
        await dispatch(registerUser(uploadData))
            .then((res) => {
                console.log(res)
            })
            .then(() => {
                login();
            })
    }

    const login = async () => {
        let body = {
            username: Username,
            password: Password,
        };
        dispatch(await loginUser(body))
        setRedirect(true)
    }

    if (redirect) {
        alert("신분증에 있는 이름과 생년월일이 맞는지 확인하세요. 다르다면 올바르게 변경해주세요.")
        return (<Redirect to="/checkitems" />)
    }
    if (isLoading) {

        return (
            <div className="register">
                <div className="register-form">
                    <div>사진을 확인하는 데 3~4초 정도 소요됩니다. 잠시만 기다려 주세요.</div>
                    <Loader type="Oval" color="#3d66ba" height="300" width="300" timeout={5000} />
                </div>
            </div>
        )
    }
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
                <div className={pfocus || Password !== "" ? "input-div one focus" : "input-div one"}>
                    <div className="i">
                        <i className="fas fa-lock"></i>
                    </div>
                    <div>
                        <h5>비밀번호</h5>
                        <input onClick={onpfocusHandler} className="input" type="password" value={Password} onChange={onPasswordHandler} required />
                    </div>
                </div>
                {(pfocus || Password !== '') && <div className="bottom-text">영문(a~z), 숫자(0~9), 특수문자 모두 포함 8자 이상.</div>}
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
