import React, { useContext } from "react";
import { useEffect } from "react";
import Webcam from "react-webcam"
import { WebSocketContext } from './CalibrateWebSocketProvider';
import { Link } from "react-router-dom";


function Calibrate() {
    const ws = useContext(WebSocketContext);
    const webcamRef = React.useRef<any>(null);
    const [video, setVideo] = React.useState<any>(false);
    const [count, setCount] = React.useState(0);

    let localStream: any = null;
    const processImage: any = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        ws.current.send(imageSrc);
        setTimeout(processImage, 1000);
        setVideo(true);
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
    const left = () => {
        clearInterval(processImage);
        window.location.href = "/test/calibrate"
    }
    const right = () => {
        clearInterval(processImage);
        window.location.href = "/test/collect"
    }
    useEffect(() => {
        getWebcam((stream: any) => {
            localStream = stream;
            webcamRef.current.srcObject = localStream;
            webcamRef.current.muted = true;
        });
    }, []);

    return (
        <>
            <div className="prepare">
                <div className="info">
                    <div className="info-title">Calibrate 과정</div>
                    <div className="info-content">
                        <Webcam audio={false} height={380} width={500} ref={webcamRef} screenshotFormat="image/jpeg" />
                    </div>

                    <div className="button-bottom">
                        <button onClick={processImage}>보여주기</button>
                        <div className="btn-next" onClick={left}>이전</div>
                        <div className="btn-next" onClick={right}>다음</div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Calibrate;