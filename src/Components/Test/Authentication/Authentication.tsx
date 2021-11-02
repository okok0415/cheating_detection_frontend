import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Webcam from "react-webcam"
import { WebSocketContext } from './AuthenticationWebSocketProvider';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../../../Actions/userAction";


function Authentication() {
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();
    const ws = useContext(WebSocketContext);
    const webcamRef = React.useRef<any>(null);


    let localStream: any = null;
    const processImage: any = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        let data = {
            frame: imageSrc,
            username: username
        }
        ws.current.send(JSON.stringify(data));
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
        const i: any = dispatch(getUser);
        i.then((res: any) => {
            setUsername(res.payload.username)
        })
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