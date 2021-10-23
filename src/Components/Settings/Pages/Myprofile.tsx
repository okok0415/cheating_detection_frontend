import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../../Actions/userAction";
import "../CSS/Settings.css";

function Myprofile() {
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [birth, setBirth] = useState("")
    const [datejoined, setDatejoined] = useState("")

    const dispatch = useDispatch();
    useEffect(() => {
        const i: any = dispatch(getUser);
        i.then((res: any) => {
            setUsername(res.payload.username)
            setName(res.payload.name)
            setBirth(res.payload.birth)
            setDatejoined(res.payload.date_joined)

        })
    }, []);


    return (
        <>
            <div className='myprofile-content'>
                <div className='myprofile-profile'>
                    <div className="myprofile-title">
                        내 프로필
                    </div>
                    <div className="myprofile-instance">
                        <div className="left">아이디(학번) </div>
                        <div className="right">{username}</div>
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
                        <div className="left">가입일</div>
                        <div className="right">{datejoined}</div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Myprofile;