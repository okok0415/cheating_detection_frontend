import React, { useContext } from "react";
import { useEffect } from "react";
import Webcam from "react-webcam"
import { WebSocketContext } from './CalibrateWebSocketProvider';
import { Link } from "react-router-dom";


function Calibrate() {
    const ws = useContext(WebSocketContext);
    const webcamRef = React.useRef<any>(null);
    const [intervalId, setIntervalId] = React.useState<any>(0);
    const [loop, setLoop] = React.useState(true);

    let localStream: any = null;
    const processImage: any = () => {

        console.log("2123213")

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

    ws.current.onmessage = (evt: MessageEvent) => {
        const data = JSON.parse(evt.data)
        console.log(data)
        if (data.message === 'lim') {
            setLoop(false)
            console.log(loop)
        }
    }
    let tf = true
    const onclick = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        ws.current.send(imageSrc);

        ws.current.onmessage = (evt: MessageEvent) => {
            const data = JSON.parse(evt.data)
            console.log(data)
            if (data.message === 'stop') {
                tf = false
                console.log(tf)
            }
            else if (data.message === 'change') {
                alert("각도를 변경하세요")
            }
            else if (data.message === 'finish') {
                alert("다음 단계로 넘어갑니다")
                window.location.href = "/test/collect"
            }
        }
        if (tf) {
            console.log(tf)
            setTimeout(onclick, 100)
        }
        else {
            console.log(tf)
        }
    }


    //erwerssasdasd
    return (
        <>
            <div className="prepare">
                <div className="info">
                    <div className="info-title">Calibrate 과정</div>
                    <div className="info-content">
                        <Webcam audio={false} height={380} width={500} ref={webcamRef} screenshotFormat="image/jpeg" />
                    </div>

                    <div className="button-bottom">
                        <button onClick={onclick}>보여주기</button>
                        <div className="btn-next" onClick={left}>이전</div>
                        <div className="btn-next" onClick={right}>다음</div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Calibrate;