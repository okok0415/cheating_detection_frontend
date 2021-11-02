import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword, getUser } from "../../../Actions/userAction";
import "../CSS/Settings.css";

function ChangePassword() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [old_password, setOld_password] = useState("");

    const dispatch = useDispatch();

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        if (password !== password2) {
            alert("비밀번호가 서로 같지 않습니다")
        }
        else if (old_password === password || old_password === password2) {
            alert("기존 비밀번호와 변경 비밀번호가 같습니다")
        }
        else {
            let body = {
                username: username,
                password: password,
            }
            dispatch(changePassword(body))
        }
    }

    useEffect(() => {
        const i: any = dispatch(getUser);
        i.then((res: any) => {
            setUsername(res.payload.username)
        })
    }, []);

    return (
        <>

            <div className='myprofile-content'>
                <form className='myprofile-changepw' onSubmit={onSubmitHandler}>
                    <div className="myprofile-title">
                        비밀번호 변경
                    </div>
                    <div className="myprofile-instance">
                        <div className="left">기존 비밀번호</div>
                        <input type="password" className="inputvalue" value={old_password} onChange={(e) => setOld_password(e.currentTarget.value)} />
                    </div>
                    <div className="myprofile-instance">
                        <div className="left">새로운 비밀번호</div>
                        <input type="password" className="inputvalue" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
                    </div>
                    <div className="myprofile-instance">
                        <div className="left">비밀번호 확인</div>
                        <input type="password" className="inputvalue" value={password2} onChange={(e) => setPassword2(e.currentTarget.value)} />
                    </div>
                    <div className="myprofile-instance">
                        <div className="left"></div>
                        <button type="submit" className="inputvalue btn">비밀번호 변경</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangePassword;