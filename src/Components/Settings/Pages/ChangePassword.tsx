import React from "react";
import "../CSS/Settings.css";

function ChangePassword() {

    return (
        <>

            <div className='myprofile-content'>
                <form className='myprofile-changepw'>
                    <div className="myprofile-title">
                        비밀번호 변경
                    </div>
                    <div className="myprofile-instance">
                        <div className="left">기존 비밀번호</div>
                        <input type="password" className="inputvalue" />
                    </div>
                    <div className="myprofile-instance">
                        <div className="left">새로운 비밀번호</div>
                        <input type="password" className="inputvalue" />
                    </div>
                    <div className="myprofile-instance">
                        <div className="left">비밀번호 확인</div>
                        <input type="password" className="inputvalue" />
                    </div>
                    <div className="myprofile-instance">
                        <div className="left"></div>
                        <input type="submit" className="inputvalue btn" value="비밀번호 변경" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangePassword;