import { Link } from "react-router-dom";

function collect() {
    return (
        <>
            <div className="prepare">
                <div className="info">
                    <div className="info-title">Collect 과정</div>
                    <div className="info-content">
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