import React, { CSSProperties } from "react";
import { useEffect } from "react";
import react from "../Train/logo192.png";
import Webcam from "react-webcam"
import { TrainData } from "./TrainData";

function Train() {


    const webcamRef = React.useRef<any>(null);
    const [imgSrc, setImgSrc] = React.useState<any>(null);
    const [count, setCount] = React.useState(0);
    const [array, setArray] = React.useState<any>(TrainData[count]);
    const [column, setColumn] = React.useState<number>(0);
    const [row, setRow] = React.useState<number>(0);
    let localStream: any = null;


    const clickHandler = () => {

        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        setCount(count + 1);
        setArray(TrainData[count]);
        const target = document.querySelector("#arrow")
        const clientRect = target?.getBoundingClientRect();
        console.log(clientRect)
        if (count >= 9) {
            setColumn(Math.floor(Math.random() * (16)));
            setRow(Math.floor(Math.random() * (16)));
        }
    }


    const getWebcam = (callback: any) => {
        try {
            const constraints = {
                'video': true,
                'audio': false
            }
            navigator.mediaDevices.getUserMedia(constraints)
                .then(callback);
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }
    useEffect(() => {
        getWebcam((stream: any) => {
            localStream = stream;
            webcamRef.current.srcObject = localStream;
            webcamRef.current.muted = true;
        });

        clickHandler();

    }, []);


    return (
        <div className="third-test">
            <div className="train" >
                <div className={array.className} style={{ gridRow: row, gridColumn: column }}>
                    <img id="arrow" src={react} onClick={clickHandler} alt="" width="50" height="50" />
                </div>
            </div>
            <div>
                <Webcam className="webcam" audio={false} height={500} width={500} ref={webcamRef} screenshotFormat="image/jpeg" />
                <img src={imgSrc} alt="" />
            </div>
        </div>
    )
}



export default Train;