import React from "react";
import { Link } from "react-router-dom"
function authentication() {

    return (
        <>
            <div className="prepare">
                <div className="info">
                    <div className="info-title">Authentication 과정</div>
                    <div className="info-content">

                        Authentication 단계에서는 회원가입 할 때 제출했던 신분증과<br /><br />
                        웹 캠에 있는 본인을 비교하는 단계입니다.<br /><br />
                        버튼을 누르고 웹 캠이 켜지면 카메라를 똑바로 쳐다보고 <br /><br />
                        제출 버튼을 눌러주세요!<br /><br />

                    </div>
                    <div className="button-bottom">
                        <Link to="/authentication">
                            <div className="btn-next">네!</div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default authentication;