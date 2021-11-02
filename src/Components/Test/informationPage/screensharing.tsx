
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../../Actions/userAction";

function Screensharing() {
    const [supervisor, setSupervisor] = useState("");

    const dispatch = useDispatch();
    useEffect(() => {
        const i: any = dispatch(getUser);
        i.then((res: any) => {
            setSupervisor(res.payload.supervisor)
        })
    }, []);

    return (
        <>
            <div className="prepare">
                <div className="info">
                    <div className="info-title">ScreenSharing 과정</div>
                    <div className="info-content">
                        {supervisor === 'true' ? '당신은 관리자입니다.' : '당신은 학생입니다.'}
                    </div>
                    <div className="button-bottom">
                        <Link to="/student/test">
                            <div className="btn-next">네!</div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Screensharing;