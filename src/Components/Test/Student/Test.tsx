import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
import "../CSS/Test.css";
import { CheckAnswer } from './CheckAnswer';
import Math1 from "./Math1.jpg"
import Math2 from "./Math2.jpg"
var mapPeers: any = {};

function Test() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [videoconnect, setVideoconnect] = useState(false)
    let today = new Date();
    const [message, setMessage] = useState<string[]>([""]);
    const [text, setText] = useState<string>("");

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [cheating, setCheating] = useState("")
    const [userxy, setUserxy] = useState<any>([]);
    const [checkNickname, setCheckNickname] = useState(true)
    //const [mapPeers, setMapPeers] = useState<any>({});
    //let mapPeers: any = {};
    const inputRef: any = useRef<any>(null);

    const webcamRef: any = React.useRef<any>(null);
    const webSocketURL: string = "ws://125.129.130.86:8000/ws/chat/lobby/"
    let ws = useRef<WebSocket | any>(null);
    //let localStream: any = new MediaStream();
    const [localStream, setLocalStream] = useState<MediaStream>();
    const InitialConnect = () => { //PeertoPeerConnection Websocket
        ws.current = new WebSocket(webSocketURL);

        ws.current.onopen = () => {
            console.log("connected to " + webSocketURL);
            processImage()
            sendSignal('new-peer', {})
            const sendinf = {
                'peer': username,
                'action': 'screen-size',
                'message': {},
                'width': window.screen.width,
                'height': window.screen.height
            }
            console.log(sendinf)
            ws.current.send(JSON.stringify(sendinf))
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

            const peer = mapPeers[peerUsername][0]
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
        setMapPeers({
            ...mapPeers,
            peerUsername : [peer, dc],           
        })
        */
        mapPeers[peerUsername] = [peer, dc];
        peer.oniceconnectionstatechange = () => {
            const iceConnectionState = peer.iceConnectionState;

            if (iceConnectionState === 'failed' || iceConnectionState === 'disconnected' || iceConnectionState === 'closed') {
                delete mapPeers[peerUsername];
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
            mapPeers[peerUsername] = [peer, peer.dc];
        }

        peer.oniceconnectionstatechange = () => {
            const iceConnectionState = peer.iceConnectionState;

            if (iceConnectionState === 'failed' || iceConnectionState === 'disconnected' || iceConnectionState === 'closed') {
                delete mapPeers[peerUsername];

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

        for (const peerUsername in mapPeers) {
            console.log('mapPeers[', peerUsername, ']: ', mapPeers[peerUsername]);
            var dataChannel = mapPeers[peerUsername][1];
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
        inputRef.current.focus()

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

        inputRef.current.focus()
        /*
        const i: any = dispatch(getUser);
        i.then((res: any) => {
            setUsername(res.payload.username)
            setName(res.payload.name)
            console.log(username);
            console.log(name);
        })
        */

    }, []);
    useEffect(() => {

        let currentxy;
        setUserxy([
            ...userxy,
            {
                'username': username,
                'cheating': cheating,
                'x': x,
                'y': y,
                'time': `${today.getHours()}??? ${today.getMinutes()}??? ${today.getSeconds()}???`
            }
        ])
        currentxy = [...userxy, { 'username': username, 'cheating': cheating, 'x': x, 'y': y, 'time': `${today.getHours()}??? ${today.getMinutes()}??? ${today.getSeconds()}???` }]
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

        document.documentElement.style.setProperty('--hover', `${x}px`)
        document.documentElement.style.setProperty('--hover2', `${y}px`)
    }, [x && y]);
    const btnClick = () => {
        InitialConnect();
        //setTimeout(processImage, 3000);
        setCheckNickname(false);
    }


    const webSocketVideoOnMessage = (event: any) => {
        const parsedData = JSON.parse(event.data)
        const message = parsedData

        setX(message['x'])
        setY(message['y'])
        setCheating(message['cheating'])
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
        const jsonStr = JSON.stringify({
            'peer': username,
            'action': "get-frame",
            'message': "",
            'frame': imageSrc
        })
        console.log(jsonStr);
        ws.current.send(jsonStr);
        setTimeout(processImage, 800);
    }


    return (


        <div className="test">
            <div className={checkNickname ? "prepare" : "display-none"}>
                <div className="check-nickname">
                    <div className="loading-title">???????????? ???????????????</div>
                    <div className="info-content">
                        <input className="input-value" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="button-bottom">
                        <div className="btn-next" id="btn-join" onClick={btnClick}>Join Room</div>
                    </div>
                </div>
            </div>
            <div className={checkNickname ? "display-none" : "main-grid-container"}>
                <div className="main-side">
                    <div className="problem">
                        <img src={Math1} alt="" />
                        <div> </div>
                        <img src={Math2} alt="" />
                    </div>

                </div>
                <div className="right-side">
                    <div className="user-box" >
                        <div id="lim"><Webcam id="supervisor-webcam" className="webcam" audio={false} height={224} width={295} ref={webcamRef} screenshotFormat="image/jpeg" /></div>
                        <div className="answer">
                            <CheckAnswer />
                        </div>
                        <div id="chat">
                            <div className="chat-title">??????</div>
                            <div className="chat-content">
                                {message.map((data: string) => <div>{data}</div>)}
                            </div>
                            <div id="ct"><input className="input-send" ref={inputRef} onKeyPress={onKeyPress} value={text} onChange={(e) => setText(e.target.value)} /><div className="btn-send" onClick={btnSendMsg}>??????</div></div>
                        </div>
                    </div>
                </div>

                <div className="x"><div></div></div>

            </div>


        </div>
    )
}

export default Test;