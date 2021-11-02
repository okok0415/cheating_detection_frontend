import React from "react";
import { Link } from "react-router-dom"
function authentication() {

    return (
        <>
            <div className="prepare">
                <div className="info">
                    <div className="info-title">Authentication 과정</div>
                    <div className="info-content">
                        <div>
                            시험 응시자와 신분증의 사진이 일치하는 지 대조하는 과정입니다.<br /><br />
                            1. 카메라가 켜지면 안경을 제외한 마스크나 선글라스등 얼굴을 가리는 물체를 치워 주세요.<br /> <br />
                            2. 얼굴을 카메라 중앙에 위치한 후 본인 확인 버튼을 눌러주세요.<br /><br />
                            3. 대조하는 데에는 3~4초 정도 소요될 수 있습니다. 기다려주세요.<br /><br />
                            4. 일치하는 시험 응시자는 다음 단계로 넘어갈 수 있습니다.
                        </div>
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