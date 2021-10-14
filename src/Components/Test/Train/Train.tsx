import React from "react";
import { useEffect } from "react";
import react from "../Train/logo192.png";
import Webcam from "react-webcam"
function Train() {
    const target = document.querySelector("#arrow")
    const clientRect = target?.getBoundingClientRect();

    const webcamRef = React.useRef<any>(null);
    const [imgSrc, setImgSrc] = React.useState<any>(null);
    let localStream: any = null;
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

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
            webcamRef.current.srcObject = localStream.current;
            webcamRef.current.muted = true;
        });
    }, []);
    return (
        <>
            <div className="arrow">
                <img id="arrow" src={react} onClick={capture} alt="" />
            </div>
            <div>
                <Webcam className="webcam" audio={false} height={500} width={500} ref={webcamRef} screenshotFormat="image/jpeg" />
                <img src={imgSrc} alt="" />
            </div>
        </>
    )
}



export default Train;