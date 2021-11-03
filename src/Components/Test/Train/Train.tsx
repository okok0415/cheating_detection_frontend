import React, { useContext } from "react";
import { useEffect } from "react";
import react from "../Train/logo192.png";
import Webcam from "react-webcam"
import { TrainData } from "./TrainData";
import { WebSocketContext } from './TrainWebSocketProvider';
import Loader from "react-loader-spinner";

let time = 0;
// getscreenshot이 문제다. 화면 크기 보내줘야됨.
function Train() {
    const ws = useContext(WebSocketContext);
    const webcamRef: any = React.useRef<any>(null);
    //const [json, setJson] = React.useState<any>([]);
    const [imgSrc, setImgSrc] = React.useState<any>(null);
    const [count, setCount] = React.useState(0);
    const [array, setArray] = React.useState<any>(TrainData[count]);
    const [column, setColumn] = React.useState<number>(0);
    const [row, setRow] = React.useState<number>(0);
    let localStream: any = null;
    const [loading, setLoading] = React.useState(true);


    const clickHandler = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc)
        setCount(count + 1);
        setArray(TrainData[count]);
        const target = document.querySelector("#arrow")
        const clientRect = target?.getBoundingClientRect();
        const sendinf = {
            'message': 'clicked',
            'bottom': clientRect?.bottom,
            'height': clientRect?.height,
            'left': clientRect?.left,
            'right': clientRect?.right,
            'top': clientRect?.top,
            'width': clientRect?.width,
            'x': clientRect?.x,
            'y': clientRect?.y,
            'frame': imageSrc,
        }
        //setJson((json: any) => [...json, sendinf])

        if (count >= 9 && count < 14) {
            let column = Math.floor(Math.random() * (16));
            let row = Math.floor(Math.random() * (16));

            while (row < 6 && (column > 5 && column < 11)) {
                column = Math.floor(Math.random() * (16));
                row = Math.floor(Math.random() * (16));
            }
            setColumn(column);
            setRow(row);


        }
        if (count !== 0) {
            console.log(JSON.stringify(sendinf))
            ws.current.send(JSON.stringify(sendinf))
            processImage();
            //setLoading(true)
        }
    }

    const processImage: any = () => {
        if (time < 9) {
            const imageSrc = webcamRef.current.getScreenshot();
            const sendinf = {
                'message': 'only-frame',
                'frame': imageSrc,
            }
            console.log(JSON.stringify(sendinf))
            time += 1;
            ws.current.send(JSON.stringify(sendinf));
            setTimeout(processImage, 30);
        } else {
            time = 0;
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
        const sendinf = {
            'message': 'screen-size',
            'width': window.screen.width,
            'height': window.screen.height
        }
        setTimeout(() => {
            ws.current.send(JSON.stringify(sendinf))
            setLoading(false)
        }, 4000);
    }, []);

    ws.current.onmessage = (evt: MessageEvent) => {
        const data = JSON.parse(evt.data)
        if (data) {
            setLoading(false)
        }
    }
    if (loading) {

        return (
            <div className="third-test">
                <div>
                    <Webcam id="webcam" className="webcam" audio={false} height={224} width={295} ref={webcamRef} screenshotFormat="image/jpeg" />
                </div>
                <div className="register-form">
                    <div>잠시만 기다려 주세요.</div>
                    <Loader type="Oval" color="#3d66ba" height="300" width="300" timeout={5000} />
                </div>
            </div>
        )
    }
    /*
    if (count === 15) {
        window.location.replace("/test/test");
    }
    */
    return (
        <div className="third-test">
            <div className="absolute">
                <Webcam id="webcam" className="webcam" audio={false} height={224} width={295} ref={webcamRef} screenshotFormat="image/jpeg" />
            </div>
            <div className="train" >
                <div className={array.className} style={{ gridRow: row, gridColumn: column }}>
                    <img id="arrow" src={react} onClick={clickHandler} alt="" width="50" height="50" />
                </div>
            </div>
        </div>
    )
}



export default Train;