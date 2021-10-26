import React, { useContext } from "react";
import { useEffect } from "react";
import Webcam from "react-webcam"
import { WebSocketContext } from './AuthenticationWebSocketProvider';
import { Link } from "react-router-dom";


function Authentication() {
    const ws = useContext(WebSocketContext);
    const webcamRef = React.useRef<any>(null);


    let localStream: any = null;
    const processImage: any = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        ws.current.send(imageSrc);
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
        window.location.href = "/test/authentication"
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
                    <div className="info-title">Authentication 과정</div>
                    <div className="info-content">
                        <Webcam audio={false} height={380} width={500} ref={webcamRef} screenshotFormat="image/jpeg" />
                    </div>

                    <div className="button-bottom">

                        <div className="btn-next" onClick={left}>이전</div>
                        <div className="btn-next" onClick={processImage}>보여주기</div>
                        <div className="btn-next" onClick={right}>다음</div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Authentication;