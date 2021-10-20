import React from "react";
import { Link } from "react-router-dom"
function calibrate() {

    return (
        <>
            <div className="prepare">
                <div className="info">
                    <div className="info-title">Calibrate 과정</div>
                    <div className="info-content">
                        Eye Tracking은 총 3가지 단계로 진행됩니다.<br /><br />
                        Calibrate, Collect과정을 거치고 Test페이지로 이동합니다. <br /><br />
                        1. 체스판 어쩌고 저쩌고 <br /><br />
                        2. 카메라에 들고 뭐시기
                    </div>
                    <div className="button-bottom">
                        <Link to="/calibrate">
                            <div className="btn-next">네!</div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default calibrate;