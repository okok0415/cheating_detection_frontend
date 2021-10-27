import { useState } from "react";
import AuthIcon from "./icons/Auth.png"
import { useEffect } from "react";
function Step() {
    const [check, setCheck] = useState("step-icon");
    const [title, setTitle] = useState("");
    const [inf, setInf] = useState<any>("");
    const [image, setImage] = useState<any>();

    const firstStep = {
        title: "Authentication 과정",
        inf: <div>
            시험 응시자와 신분증의 사진이 일치하는 지 대조하는 과정입니다.<br /><br />
            1. 카메라가 켜지면 안경을 제외한 마스크나 선글라스등 얼굴을 가리는 물체를 치워 주세요.<br /> <br />
            2. 얼굴을 카메라 중앙에 위치한 후 본인 확인 버튼을 눌러주세요.<br /><br />
            3. 대조하는 데에는 3~4초 정도 소요될 수 있습니다. 기다려주세요.<br /><br />
            4. 일치하는 시험 응시자는 다음 단계로 넘어갈 수 있습니다.
        </div>,
        image: AuthIcon
    }
    const secondStep = {
        title: "Data Collect 과정",
        inf: <div>
            시험 응시자의 현재 환경에 맞는 영상 데이터를 수집하여 Eye Tracking의 정확도를 높이기 위한 과정입니다.<br /><br />
            1.	시작 버튼을 누르면 Data Collect 페이지로 넘어가며 특정 아이콘이 화면에 표시됩니다.<br /><br />
            2.	응시자는  그림이 나타난 위치에 시선을 고정시킨 후 그림을 클릭하면 다른 위치에 아이콘이 표시가 될 것입니다.<br /><br />
            3.	아이콘은 9개의 고정된 위치와 5개의 랜덤한 위치에 나타날 것입니다.<br /><br />
            4.	총 14개의 그림을 클릭하고 나서는 모델 학습이 진행이 되니 완료가 되기 전까지는 브라우저를 종료하거나 다른 페이지로 이동하지 말아야 합니다.<br />
        </div>,
        image: AuthIcon
    }

    const thirdStep = {
        title: "Screen Sharing 과정",
        inf: "Screen Sharing 과정은 다음과 같이 이루어집니다.",
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
