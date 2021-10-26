import React, { useState, useEffect } from "react";
import "../CSS/infNav.css";
import { ReactComponent as AuthIcon } from "./address-card-solid.svg";
import { ReactComponent as CollectIcon } from "./collect.svg";
import { ReactComponent as TestIcon } from "./laptop-house-solid.svg";

function TestNav() {
    const [calibrate, setCalibrate] = useState(false);
    const [collect, setCollect] = useState(false);
    const [test, setTest] = useState(false);

    useEffect(() => {
        if (window.location.pathname === "/test/authentication" || window.location.pathname === "/authentication") {
            setCalibrate(true);
            setCollect(false);
            setTest(false);
        }
        else if (window.location.pathname === "/test/collect") {
            setCalibrate(false);
            setCollect(true);
            setTest(false);
        }
        else if (window.location.pathname === "/test/test") {
            setCalibrate(false);
            setCollect(false);
            setTest(true);
        }
        else {
            setCalibrate(false);
            setCollect(false);
            setTest(false);
        }
    }, []);


    return (
        <>
            <div className="TestNav">
                <div></div>
                <div></div>
                <div className={calibrate ? "bordernav" : ""}>
                    <div>
                        <div className="icontext"><AuthIcon width="40" height="40" /></div>
                        <div className="navitem">Authentication</div>
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
                        <div className="navitem">Test</div>
                    </div>
                </div>
                <div></div>
                <div></div>
            </div>
        </>
    )
}

export default TestNav;