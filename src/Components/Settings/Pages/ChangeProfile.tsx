import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeName, changePassword, getUser } from "../../../Actions/userAction";
import "../CSS/Settings.css";

function ChangeProfile() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("")
    const [birth, setBirth] = useState("")
    const [cname, setCname] = useState("")
    const [cbirth, setCbirth] = useState("");

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
    }


    return (
        <>

            <div className='myprofile-content'>
                <form className='myprofile-changepw' onSubmit={onsubmitHandler}>
                    <div className="myprofile-title">
                        프로필 확인, 변경
                    </div>
                    <div className="myprofile-instance">
                        <div className="left">이름</div>
                        <div className="right">{name}</div>
                    </div>
                    <div className="myprofile-instance">
                        <div className="left">생년월일</div>
                        <div className="right">{birth}</div>
                    </div>
                    <div className="myprofile-instance">
                        <div className="left">변경할 이름</div>
                        <input type="name" className="inputvalue" value={cname} onChange={(e) => setCname(e.currentTarget.value)} />
                    </div>
                    <div className="myprofile-instance">
                        <div className="left">변경할 생년월일</div>
                        <input type="birth" className="inputvalue" value={cbirth} onChange={(e) => setCbirth(e.currentTarget.value)} />
                    </div>
                    <div className="myprofile-instance">
                        <div className="left"></div>
                        <button type="submit" className="inputvalue btn">변경</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangeProfile;