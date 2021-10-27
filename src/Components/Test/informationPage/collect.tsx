import { Link } from "react-router-dom";

function collect() {
    return (
        <>
            <div className="prepare">
                <div className="info">
                    <div className="info-title">Collect 과정</div>
                    <div className="info-content">
                        <div>
                            시험 응시자의 현재 환경에 맞는 영상 데이터를 수집하여 Eye Tracking의 정확도를 높이기 위한 과정입니다.<br /><br />
                            1.	시작 버튼을 누르면 Data Collect 페이지로 넘어가며 특정 아이콘이 화면에 표시됩니다.<br /><br />
                            2.	응시자는  그림이 나타난 위치에 시선을 고정시킨 후 그림을 클릭하면 다른 위치에 아이콘이 표시가 될 것입니다.<br /><br />
                            3.	아이콘은 9개의 고정된 위치와 5개의 랜덤한 위치에 나타날 것입니다.<br /><br />
                            4.	총 14개의 그림을 클릭하고 나서는 모델 학습이 진행이 되니 완료가 되기 전까지는 브라우저를 종료하거나 다른 페이지로 이동하지 말아야 합니다.<br />
                        </div>
                    </div>
                    <div className="button-bottom">
                        <Link to="/train">
                            <div className="btn-next">네!</div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default collect;