
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
import { getUser } from '../../../Actions/userAction';

function Test() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [videoconnect, setVideoconnect] = useState(false)
    const [imageSrc, setImageSrc] = useState<any>();
    const [message, setMessage] = useState<string[]>([""]);
    const [video, setVideo] = useState<any>([]);
    const dispatch = useDispatch();
    const webcamRef: any = React.useRef<any>(null);
    const webSocketURL: string = "ws://localhost:8000/ws/chat/lobby/"
    const webSocketVideoURL: string = "ws://localhost:8000/ws/test/"
    let ws = useRef<WebSocket | any>(null);
    let wsVideo = useRef<WebSocket | any>(null);
    let localStream: MediaStream
    const InitialConnect = () => { //PeertoPeerConnection Websocket
        ws.current = new WebSocket(webSocketURL);

        ws.current.onopen = () => {
            console.log("connected to " + webSocketURL);

            sendSignal('new-peer', {})
        };
        ws.current.onmessage = (event: any) => {
            webSocketOnMessage(event)
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

    const webSocketOnMessage = (event: any) => {
        const parsedData = JSON.parse(event.data)

        const peerUsername = parsedData['peer'];
        const action = parsedData['action'];

        if (username == peerUsername) {
            return;
        }

        const receiver_channel_name = parsedData['message']['receiver_channel_name']

        if (action == 'new-peer') {
            createOfferer(peerUsername, receiver_channel_name)

            return;
        }
    }

    const sendSignal = (action: string, message: Object) => {
        const jsonStr = JSON.stringify({
            'peer': username,
            'action': action,
            'message': message
        })

        ws.current.send(jsonStr)
    }

    const createOfferer = (peerUsername: string, receiver_channel_name: string) => {
        const peer = new RTCPeerConnection(undefined);

        addLocalTracks(peer);

        const dc = peer.createDataChannel('channel');
        dc.onopen = () => {
            console.log('DATA CHANNEL Connection opened!')
        }
        dc.onmessage = (event: any) => {
            dcOnMessage(event)
        }

        const remoteVideo = createVideo(peerUsername);
        setOnTrack(peer, remoteVideo);
    }

    const addLocalTracks = (peer: RTCPeerConnection) => {
        localStream.getTracks().forEach(track => {
            peer.addTrack(track, localStream)
        })
    }

    const dcOnMessage = (event: any) => {
        const data = JSON.parse(event.data);
        if (message.length <= 10) {
            setMessage([
                ...message,
                `${data.peer} : ${data.message}`
            ])
        } else {
            message.splice(1, 1);
            setMessage([
                ...message,
                `${data.peer} : ${data.message}`
            ])
        }
    }
    /*
    const createVideo = (peerUsername: string) => {
        const newVideo = <Webcam id={peerUsername + "-video"} className="webcam" audio={false} height={224} width={295} ref={webcamRef} screenshotFormat="image/jpeg" />

        setVideo([
            ...video,
            newVideo
        ])

        return webcamRef;
    }
    */
    const createVideo = (peerUsername: string) => {
        const videoContainer = document.querySelector('#video-container')
        const remoteVideo = document.createElement('video')

        remoteVideo.id = peerUsername + '-video';
        remoteVideo.autoplay = true;
        remoteVideo.playsInline = true

        var videoWrapper = document.createElement('div');
        videoContainer?.appendChild(videoWrapper);
        videoWrapper.appendChild(remoteVideo)

        return remoteVideo
    }
    const setOnTrack = (peer: RTCPeerConnection, remoteVideo: HTMLVideoElement) => {
        const remoteStream: any = new MediaStream();

        remoteVideo.srcObject = remoteStream;
        peer.ontrack = async (event: any) => {
            remoteStream.addTrack(event.track, remoteStream);
        }
    }
    useEffect(() => {
        InitialConnect();
        InitialVideoConnect();
        setTimeout(processImage, 3000);

        getWebcam((stream: any) => {
            localStream = stream;
            webcamRef.current.srcObject = localStream;
            webcamRef.current.muted = true;
        });

        const i: any = dispatch(getUser);
        i.then((res: any) => {
            setUsername(res.payload.username)
            setName(res.payload.name)
            console.log(username);
            console.log(name);
        })

    }, []);

    const InitialVideoConnect = () => { //backend로 보낼 Video Websocket
        wsVideo.current = new WebSocket(webSocketVideoURL);

        wsVideo.current.onopen = () => {
            console.log("connected to " + webSocketVideoURL);
            setVideoconnect(true)
        };
        wsVideo.current.onmessage = (event: any) => {
            webSocketVideoOnMessage(event)
        }
        wsVideo.current.onclose = (error: string) => {
            console.log("disconnect from " + webSocketVideoURL);
            console.log(error)
            setVideoconnect(false)
        };
        wsVideo.current.onerror = (error: string) => {
            console.log("connection error " + webSocketVideoURL);
            console.log(error);
            setVideoconnect(false)
        };
    }
    const webSocketVideoOnMessage = (event: any) => {
        const parsedData = JSON.parse(event.data)
        const message = parsedData
        console.log(message)

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

    const processImage: any = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        wsVideo.current.send(imageSrc);
        setTimeout(processImage, 30);
    }
    return (
        <div className="test">
            <div id="video-container">
                {video}
            </div>
            <Webcam id="supervisor-webcam" className="webcam" audio={false} height={224} width={295} ref={webcamRef} screenshotFormat="image/jpeg" />
            <div>{message}</div>
        </div>
    )
}

export default Test;