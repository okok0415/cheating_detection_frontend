import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import Webcam from "react-webcam"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../../../Actions/userAction";


function Authentication() {
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();
    //const ws = useContext(WebSocketContext);
    const webcamRef = React.useRef<any>(null);
    const webSocketURL: string = "ws://localhost:8000/ws/authentication/"
    let ws = useRef<WebSocket | any>(null);

    const InitialConnect = () => { //PeertoPeerConnection Websocket
        ws.current = new WebSocket(webSocketURL);

        ws.current.onopen = () => {
            console.log("connected to " + webSocketURL);

        };
        ws.current.onmessage = (event: any) => {
            console.log(event)
            const parsedData = JSON.parse(event.data)
            console.log(parsedData)
            if (parsedData['result'] === 'True') {
                alert("인증완료")
                window.location.href = "/test/calibrate"
            }
            else {
                alert("당신은 신분증의 인물과 다릅니다.")
            }
        }
        ws.current.onclose = (error: string) => {
            console.log("disconnect from " + webSocketURL);
            console.log(error)
        };
        ws.current.onerror = (error: string) => {
            console.log("connection error " + webSocketURL);
            console.log(error);
        };
    }


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
        window.location.href = "/test/calibrate"
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
        InitialConnect()
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
                        <div className="btn-next" onClick={processImage}>인증하기</div>
                        <div className="btn-next" onClick={right}>다음</div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Authentication;