import { useState } from "react";
import AuthIcon from "./icons/Auth.png"
import { useEffect } from "react";
function Step() {
    const [check, setCheck] = useState("step-icon");
    const [title, setTitle] = useState("");
    const [inf, setInf] = useState("");
    const [image, setImage] = useState<any>();

    const firstStep = {
        title: "Authentication 과정",
        inf: "Authentication 과정은 다음과 같이 이루어집니다.",
        image: AuthIcon
    }
    const secondStep = {
        title: "Collect 과정",
        inf: "Collect 과정은 다음과 같이 이루어집니다.",
        image: AuthIcon
    }
    const thirdStep = {
        title: "Test 과정",
        inf: "Test 과정은 다음과 같이 이루어집니다.",
        image: AuthIcon
    }

    const prevHandler = () => {
        if (check === "step-icon") {
            setCheck("step-icon")
            setTitle(firstStep.title)
            setInf(firstStep.inf)
            setImage(firstStep.image)
        } else if (check === "step-icon2") {
            setCheck("step-icon")
            setTitle(firstStep.title)
            setInf(firstStep.inf)
            setImage(firstStep.image)
        } else if (check === "step-icon3") {
            setCheck("step-icon2")
            setTitle(secondStep.title)
            setInf(secondStep.inf)
            setImage(secondStep.image)
        }
    }

    const nextHandler = () => {
        if (check === "step-icon") {
            setCheck("step-icon2")
            setTitle(secondStep.title)
            setInf(secondStep.inf)
            setImage(secondStep.image)
        } else if (check === "step-icon2") {
            setCheck("step-icon3")
            setTitle(thirdStep.title)
            setInf(thirdStep.inf)
            setImage(thirdStep.image)
        } else if (check === "step-icon3") {
            setCheck("step-icon3")
            setTitle(thirdStep.title)
            setInf(thirdStep.inf)
            setImage(thirdStep.image)
        }
    }
    useEffect(() => {
        prevHandler();
    }, []);
    return (
        <div className="second-block">
            <div className="step">

                <div className="icon-space">
                    <div></div>
                    <div className={check}></div>
                    <div></div>
                </div>
                <div className="step-content">
                    <div className="step-left">
                        <div className="step-title">{title}</div>
                        <div className="step-information">
                            {inf}
                        </div>
                        <div>
                            <div className="step-btn" onClick={prevHandler}>이전</div>
                            <div className="step-btn" onClick={nextHandler}>다음</div>
                        </div>
                    </div>
                    <div className="step-right"><img src={image} width="400" /></div>
                </div>
            </div>
        </div>
    )
}

export default Step;


/*
                    <div></div>
                    <div></div>
                    <div className="icon-circle" onClick={() => setCheck(1)}>
                        {check === 1 ? <i className="fas fa-circle"></i> : <i className="far fa-circle"></i>}
                    </div>
                    <div className="icon-circle" onClick={() => setCheck(2)}>
                        {check === 2 ? <i className="fas fa-circle"></i> : <i className="far fa-circle"></i>}
                    </div>
                    <div className="icon-circle" onClick={() => setCheck(3)}>
                        {check === 3 ? <i className="fas fa-circle"></i> : <i className="far fa-circle"></i>}
                    </div>
                    <div className="icon-circle" onClick={() => setCheck(4)}>
                        {check === 4 ? <i className="fas fa-circle"></i> : <i className="far fa-circle"></i>}
                    </div>
                    <div></div>
                    <div></div>
                    */
