import { Link } from "react-router-dom";

function test() {
    return (
        <>
            <div className="prepare">
                <div className="info">
                    <div className="info-title">Test 과정</div>
                    <div className="info-content">

                    </div>
                    <div className="button-bottom">
                        <Link to="/webcam">
                            <div className="btn-next">네!</div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default test;