import React, { useState, useEffect } from "react";
import "../CSS/infNav.css";
import { ReactComponent as AuthIcon } from "./address-card-solid.svg";
import { ReactComponent as CollectIcon } from "./collect.svg";
import { ReactComponent as TestIcon } from "./laptop-house-solid.svg";
import { ReactComponent as ChessIcon } from "./chess-pawn-solid.svg";

function TestNav() {
    const [auth, setAuth] = useState(false);
    const [calibrate, setCalibrate] = useState(false);
    const [collect, setCollect] = useState(false);
    const [test, setTest] = useState(false);

    useEffect(() => {
        if (window.location.pathname === "/test/authentication" || window.location.pathname === "/authentication") {
            setAuth(true);
            setCalibrate(false);
            setCollect(false);
            setTest(false);
        }
        else if (window.location.pathname === "/test/calibrate") {
            setAuth(false);
            setCalibrate(true);
            setCollect(false);
            setTest(false);
        }
        else if (window.location.pathname === "/test/collect") {
            setAuth(false);
            setCalibrate(false);
            setCollect(true);
            setTest(false);
        }
        else if (window.location.pathname === "/test/screensharing") {
            setAuth(false);
            setCalibrate(false);
            setCollect(false);
            setTest(true);
        }
        else {
            setAuth(false);
            setCalibrate(false);
            setCollect(false);
            setTest(false);
        }
    }, []);


    return (
        <>
            <div className="TestNav">
                <div className="navitems">
                    <div></div>
                    <div></div>
                    <div className={auth ? "bordernav" : ""}>
                        <div>
                            <div className="icontext"><AuthIcon width="40" height="40" /></div>
                            <div className="navitem">Authentication</div>
                        </div>
                    </div>
                    <div></div>
                    <div className={calibrate ? "bordernav" : ""}>
                        <div>
                            <div className="icontext"><ChessIcon width="40" height="40" /></div>
                            <div className="navitem">Calibrate</div>
                        </div>
                    </div>
                    <div></div>
                    <div className={collect ? "bordernav" : ""}>
                        <div>
                            <div className="icontext"><CollectIcon width="40" height="40" /></div>
                            <div className="navitem">Collect</div>
                        </div>
                    </div>
                    <div></div>
                    <div className={test ? "bordernav" : ""}>
                        <div>
                            <div className="icontext"><TestIcon width="45" height="45" /></div>
                            <div className="navitem">ScreenSharing</div>
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default TestNav;