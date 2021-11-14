
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import { getUser } from "../../../Actions/userAction";
var mapScreenPeers: any = {};
function Screensharing() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [videoconnect, setVideoconnect] = useState(false)
    const [imageSrc, setImageSrc] = useState<any>();
    const [message, setMessage] = useState<string[]>([""]);
    const [text, setText] = useState<string>("");
    const [video, setVideo] = useState<any>([]);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [userxy, setUserxy] = useState<any>([]);
    const [checkNickname, setCheckNickname] = useState(true)
    const [disable, setDisable] = useState(false)
    //const [mapScreenPeers, setmapScreenPeers] = useState<any>({});
    //let mapScreenPeers: any = {};
    const inputRef: any = useRef<any>(null);
    const webcamRef: any = React.useRef<any>(null);
    const webSocketURL: string = "ws://125.129.130.86:8000/ws/screen/"
    let ws = useRef<WebSocket | any>(null);
    let wsVideo = useRef<WebSocket | any>(null);
    const dispatch = useDispatch();
    //let localStream: any = new MediaStream();
    const [localStream, setLocalStream] = useState<MediaStream>();
    const InitialConnect = () => { //PeertoPeerConnection Websocket
        ws.current = new WebSocket(webSocketURL);

        ws.current.onopen = () => {
            console.log("connected to " + webSocketURL);

            sendSignal('new-peer', {})
        };
        ws.current.onmessage = (event: any) => {
            if (JSON.parse(event.data)['action'] === 'get-frame') {
                webSocketVideoOnMessage(event)
            }
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

        if (username === peerUsername) {
            return;
        }

        const receiver_channel_name = parsedData['message']['receiver_channel_name']

        if (action === 'new-peer') {
            createOfferer(peerUsername, receiver_channel_name)

            return;
        }

        if (action === 'new-offer') {
            const offer = parsedData['message']['sdp']
            createAnswerer(offer, peerUsername, receiver_channel_name);

            return;
        }

        if (action === 'new-answer') {
            const answer = parsedData['message']['sdp'];

            const peer = mapScreenPeers[peerUsername][0]
            console.log(peer)
            peer.setRemoteDescription(answer);
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

        //const remoteVideo = CreateVideo(peerUsername);
        //setOnTrack(peer, remoteVideo);

        /*
        setmapScreenPeers({
            ...mapScreenPeers,
            peerUsername : [peer, dc],           
        })
        */
        mapScreenPeers[peerUsername] = [peer, dc];
        peer.oniceconnectionstatechange = () => {
            const iceConnectionState = peer.iceConnectionState;

            if (iceConnectionState === 'failed' || iceConnectionState === 'disconnected' || iceConnectionState === 'closed') {
                delete mapScreenPeers[peerUsername];
                if (iceConnectionState !== 'closed') {
                    peer.close();
                }
                //removeVideo(remoteVideo)
            }


        }

        peer.onicecandidate = (event: any) => {
            if (event.candidate) {
                console.log('New ice candidate : ', JSON.stringify(peer.localDescription));

                return;
            }

            sendSignal('new-offer', {
                'sdp': peer.localDescription,
                'receiver_channel_name': receiver_channel_name
            })
        }

        peer.createOffer()
            .then(o => peer.setLocalDescription(o))
            .then(() => {
                console.log('Local description set successfully');
            })
    }

    const createAnswerer = (offer: any, peerUsername: string, receiver_channel_name: string) => {
        const peer: any = new RTCPeerConnection(undefined);

        addLocalTracks(peer);

        //const remoteVideo = CreateVideo(peerUsername);
        //setOnTrack(peer, remoteVideo);

        peer.ondatachannel = (event: any) => {
            peer.dc = event.channel
            peer.dc.onopen = () => {
                console.log("Connection opened!");
            }
            peer.dc.onmessage = (event: any) => {
                dcOnMessage(event)
            }
            mapScreenPeers[peerUsername] = [peer, peer.dc];
        }

        peer.oniceconnectionstatechange = () => {
            const iceConnectionState = peer.iceConnectionState;

            if (iceConnectionState === 'failed' || iceConnectionState === 'disconnected' || iceConnectionState === 'closed') {
                delete mapScreenPeers[peerUsername];

                if (iceConnectionState !== 'closed') {
                    peer.close();
                }
                //removeVideo(remoteVideo)
            }


        }

        peer.onicecandidate = (event: any) => {
            if (event.candidate) {
                console.log('New ice candidate : ', JSON.stringify(peer.localDescription));

                return;
            }

            sendSignal('new-answer', {
                'sdp': peer.localDescription,
                'receiver_channel_name': receiver_channel_name
            })
        }

        peer.setRemoteDescription(offer)
            .then(() => {
                console.log('Remote description set successfully for %s.', peerUsername);
                return peer.createAnswer();
            })
            .then((a: any) => {
                console.log('Answer created!');

                peer.setLocalDescription(a);
            })
    }

    const addLocalTracks = (peer: RTCPeerConnection) => {
        console.log(localStream)
        localStream?.getTracks().forEach((track: any) => {
            peer.addTrack(track, localStream)
        })
    }

    const dcOnMessage = (event: any) => {
        const data = JSON.parse(event.data);
        if (data.dcAction === 'message')
            setMessage(data.dcData)
        else if (data.dcAction === 'coordinate') {
            //if (userxy.filter((array: any) => array.username === data.dcData.username)) {
            //    setUserxy(userxy.filter((array: any) => array.username !== data.dcData.username))

            //}
            setUserxy(data.dcData)
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
    /*
     const CreateVideo = (peerUsername: string) => {
 
 
         const videoContainer = document.querySelector('#video-container')
         const remoteVideo = document.createElement('video')
 
         //remoteVideo.ref = webcamRef
         remoteVideo.id = peerUsername + '-video';
         remoteVideo.autoplay = true;
         remoteVideo.playsInline = true
         remoteVideo.width = 300
         remoteVideo.height = 200
 
         var videoWrapper = document.createElement('div');
         videoContainer?.appendChild(videoWrapper);
         videoWrapper.appendChild(remoteVideo)
         return remoteVideo
     }
     */
    const setOnTrack = (peer: RTCPeerConnection, remoteVideo: any) => {
        const remoteStream: any = new MediaStream();
        console.log(remoteStream)
        peer.ontrack = async (event: any) => {
            remoteStream.addTrack(event.track, remoteStream);
        }
        remoteVideo.srcObject = remoteStream;
    }

    const removeVideo = (video: any) => {
        const videoWrapper = video.parentNode;

        videoWrapper.parentNode.removeChild(videoWrapper)
    }

    const getDataChannels = () => {
        var dataChannels = [];

        for (const peerUsername in mapScreenPeers) {
            console.log('mapScreenPeers[', peerUsername, ']: ', mapScreenPeers[peerUsername]);
            var dataChannel = mapScreenPeers[peerUsername][1];
            console.log('dataChannel: ', dataChannel);

            dataChannels.push(dataChannel);
        }

        return dataChannels;
    }

    const btnSendMsg = () => {
        let currenttext;

        if (message.length <= 13) {
            setMessage([
                ...message,
                `${username} : ${text}`
            ])
            currenttext = [...message, `${username} : ${text}`]
        } else {
            message.splice(1, 1);
            setMessage([
                ...message,
                `${username} : ${text}`
            ])
            currenttext = [...message, `${username} : ${text}`]
        }

        const sendmsg = {
            'dcAction': 'message',
            'dcData': currenttext
        }

        var dataChannels = getDataChannels();
        console.log(dataChannels)
        console.log('Sending: ', currenttext);

        // send to all data channels
        for (const index in dataChannels) {
            dataChannels[index].send(JSON.stringify(sendmsg));
        }

        setText("")

    }
    const onKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            btnSendMsg()
        }
    }
    useEffect(() => {

        //InitialVideoConnect();
        //
        getWebcam((stream: any) => {
            console.log(stream);
            setLocalStream(stream);
            console.log(localStream)
            webcamRef.current.srcObject = localStream;
            webcamRef.current.muted = true;
        });


        setUsername(`ScreenSharing ${Math.floor(Math.random() * (100))}`)

    }, []);
    useEffect(() => {

        let currentxy;
        setUserxy([
            ...userxy,
            {
                'username': username,
                'x': x,
                'y': y
            }
        ])
        currentxy = [...userxy, { 'username': username, 'x': x, 'y': y }]
        console.log(currentxy)
        const sendmsg = {
            'dcAction': 'coordinate',
            'dcData': currentxy
        }
        var dataChannels = getDataChannels();
        console.log(dataChannels)
        console.log('Sending : ', x, y)

        // send to all data channels
        for (const index in dataChannels) {
            dataChannels[index].send(JSON.stringify(sendmsg));
        }
    }, [x && y]);
    const btnClick = () => {
        InitialConnect();
        setDisable(true)
    }

    const webSocketVideoOnMessage = (event: any) => {
        const parsedData = JSON.parse(event.data)
        const message = parsedData
        setX(message['x'])
        setY(message['y'])
        //console.log(message)

    }

    const getWebcam = (callback: any) => {
        try {
            const constraints = {
                'video': true,
                'audio': false
            }
            navigator.mediaDevices.getDisplayMedia(constraints)
                .then(callback);
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    const processImage: any = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const jsonStr = JSON.stringify({
            'peer': username,
            'action': "get-frame",
            'message': "",
            'frame': imageSrc
        })
        ws.current.send(jsonStr);
        setTimeout(processImage, 30);
    }


    return (
        <>
            <div className="prepare">
                <div className="info">
                    <div className="info-title">ScreenSharing</div>
                    <div className="info-content">
                        응시자의 화면 공유를 통해 웹 서핑, 컴퓨터 내 부정행위를 막는 과정입니다.<br /><br />
                        1. 본인의 전체 화면을 공유합니다. <br /><br />
                        2. 화면 공유 버튼을 누릅니다.<br /><br />
                        3. 시험 단계로 넘어갑니다.
                        <video ref={webcamRef} width={1} height={1} />
                    </div>
                    <div className="button-bottom">
                        <div className={disable ? "display-none" : "btn-next-bigger"} onClick={btnClick}>ScreenShare 버튼</div>
                        <Link to="/student/test">
                            <div className="btn-next">네!</div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Screensharing;