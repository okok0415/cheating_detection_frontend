import React from "react";
import { Link } from "react-router-dom"
function calibrate() {

    return (
        <>
            <div className="prepare">
                <div className="info">
                    <div className="info-title">Calibrate</div>
                    <div className="info-content">
                        3D 좌표와 2D좌표의 변환 행렬을 구하는 과정입니다.<br /><br />
                        1. 체스보드판 이미지를 출력 혹은 핸드폰 이미지로 준비합니다.<br /><br />
                        2. 보여주기 버튼을 누른 후 체스보드 판을 카메라에 비춥니다.<br /><br />
                        3. 각도를 변경하세요라는 문구가 나오면 다른 각도에서 체스보드판을 비춥니다.<br /><br />
                        4. 4번 반복합니다.
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