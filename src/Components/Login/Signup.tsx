import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Actions/userAction";
import { ReactComponent as CDIcon } from "../Navbar/icons/cheating_detection_2.svg";
import "./CSS/Login.css";
function Signup(props: any) {
    const [SchoolID, setSchoolID] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [Birth, setBirth] = useState("");
    const [ConfirmPasword, setConfirmPasword] = useState("");
    const formdata = new FormData();
    const dispatch = useDispatch();

    const onSchoolIDHandler = (e: any) => {
        setSchoolID(e.currentTarget.value);
    };

    const onNameHandler = (e: any) => {
        setName(e.currentTarget.value);
    };

    const onBirthHandler = (e: any) => {
        setBirth(e.currentTarget.value);
    };

    const onPasswordHanlder = (e: any) => {
        setPassword(e.currentTarget.value);
    };

    const onConfirmPasswordHandler = (e: any) => {
        setConfirmPasword(e.currentTarget.value);
    };

    const onImageHandler = (e: any) => {
        const image = e.target.files[0];
        formdata.append('img', image);
    }
    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        if (Password === ConfirmPasword) {
            let body = {
                schoolID: SchoolID,
                name: Name,
                birth: Birth,
                password: Password,
                image: formdata
            };
            dispatch(registerUser(body))
            /*
                .then((res: any) => {
                    alert("가입이 정상적으로 완료되었습니다");
                    props.history.push("/login");
                });
        */
        } else {
            alert("비밀번호가 일치하지 않습니다");
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
                <div className="label">
                    <label className="left">학번</label>
                    <input className="right" type="string" value={SchoolID} onChange={onSchoolIDHandler} placeholder="B000000" />
                </div>
                <div className="label">
                    <label className="left">이름</label>
                    <input className="right" type="test" value={Name} onChange={onNameHandler} placeholder="홍길동" />
                </div>
                <div className="label">
                    <label className="left">생년월일</label>
                    <input className="right" type="test" value={Birth} onChange={onBirthHandler} placeholder="YYYYMMDD" />
                </div>
                <div className="label">
                    <label className="left">비밀번호</label>
                    <input className="right" type="password" value={Password} onChange={onPasswordHanlder} />
                </div>
                <div className="label">
                    <label className="left">비밀번호 확인</label>
                    <input
                        className="right"
                        type="password"
                        value={ConfirmPasword}
                        onChange={onConfirmPasswordHandler}
                    />
                </div>
                <div className="label">
                    <label className="left">신분증</label>
                    <input className="right" type="file" accept='image/jpg, image/png, image/jpeg, image/gif' onChange={onImageHandler} />
                </div>
                <button type="submit">회원 가입</button>
            </form>
        </div>
    );
}

export default withRouter(Signup);
