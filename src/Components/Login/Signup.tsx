import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Actions/userAction";
import { ReactComponent as CDIcon } from "../Navbar/icons/cheating_detection_2.svg";
import "./CSS/Login.css";
function Signup(props: any) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPasword, setConfirmPasword] = useState("");
    const dispatch = useDispatch();

    const onEmailHandler = (e: any) => {
        setEmail(e.currentTarget.value);
    };

    const onNameHandler = (e: any) => {
        setName(e.currentTarget.value);
    };

    const onPasswordHanlder = (e: any) => {
        setPassword(e.currentTarget.value);
    };

    const onConfirmPasswordHandler = (e: any) => {
        setConfirmPasword(e.currentTarget.value);
    };

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        if (Password === ConfirmPasword) {
            let body = {
                email: Email,
                name: Name,
                password: Password,
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
        <div>
            <form
                onSubmit={onSubmitHandler} className="register-form">
                <CDIcon />
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="test" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHanlder} />

                <label>ConfirmPasword</label>
                <input
                    type="password"
                    value={ConfirmPasword}
                    onChange={onConfirmPasswordHandler}
                />
                <br />
                <button type="submit">회원 가입</button>
            </form>
        </div>
    );
}

export default withRouter(Signup);
