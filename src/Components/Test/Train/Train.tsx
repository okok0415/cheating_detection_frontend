import React, { useContext, useRef } from "react";
import { useEffect } from "react";
import react from "../Train/logo192.png";
import Webcam from "react-webcam"
import { TrainData } from "./TrainData";
import { WebSocketContext } from './TrainWebSocketProvider';
import { Redirect } from "react-router";
function Train() {
    const ws = useContext(WebSocketContext);
    const webcamRef = React.useRef<any>(null);
    //const [json, setJson] = React.useState<any>([]);
    const [imgSrc, setImgSrc] = React.useState<any>(null);
    const [count, setCount] = React.useState(0);
    const [array, setArray] = React.useState<any>(TrainData[count]);
    const [column, setColumn] = React.useState<number>(0);
    const [row, setRow] = React.useState<number>(0);

    let localStream: any = null;


    const clickHandler = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc)
        setCount(count + 1);
        setArray(TrainData[count]);
        const target = document.querySelector("#arrow")
        const clientRect = target?.getBoundingClientRect();
        const sendinf = {
            'bottom': clientRect?.bottom,
            'height': clientRect?.height,
            'left': clientRect?.left,
            'right': clientRect?.right,
            'top': clientRect?.top,
            'width': clientRect?.width,
            'x': clientRect?.x,
            'y': clientRect?.y,
            'frame': imageSrc
        }
        //setJson((json: any) => [...json, sendinf])

        if (count >= 9 && count < 14) {
            setColumn(Math.floor(Math.random() * (16)));
            setRow(Math.floor(Math.random() * (16)));


        }
        if (count !== 0) {
            console.log(JSON.stringify(sendinf))
            ws.current.send(JSON.stringify(sendinf))
        }
    }
    /*
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 200;

    var image = new Image();
    image.src = imgSrc
    image.crossOrigin = 'Anonymous'
    ctx?.drawImage(image, 0, 0, 300, 200)

    const rawdata = canvas.toDataURL("image/jpeg", 0.5)
    console.log(rawdata);
    ws.current.send(rawdata)
    */


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
    if (count === 14) {
        window.location.replace("/webcam");
    }

    return (
        <div className="third-test">
            <div className="train" >
                <div className={array.className} style={{ gridRow: row, gridColumn: column }}>
                    <img id="arrow" src={react} onClick={clickHandler} alt="" width="50" height="50" />
                </div>
            </div>
            <div>
                <Webcam id="webcam" className="webcam" audio={false} height={500} width={500} ref={webcamRef} screenshotFormat="image/jpeg" />
                <img src={imgSrc} alt="" />
            </div>
        </div>
    )
}



export default Train;