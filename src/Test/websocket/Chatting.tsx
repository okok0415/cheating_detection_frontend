import React, { useContext, useState, useEffect } from 'react'
import { WebSocketContext } from './WebSocketProvider';




function Chatting() {
    let mapPeers: any = {};

    let localStream = new MediaStream();

    const ws = useContext(WebSocketContext);
    const [message, setMessage] = useState<string[]>([""]);
    const videoRef = React.useRef<any>(null);

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
            videoRef.current.srcObject = localStream;
            videoRef.current.muted = true;
        });
    }, []);


    ws.current.onmessage = (evt: MessageEvent) => {
        const data = JSON.parse(evt.data)
        let peerUsername = data['peer'];
        let action = data['action'];
        let receiver_channel_name = data['receiver_channel_name']

        if (action === "new-peer") {
            createOfferer(peerUsername, receiver_channel_name);
            return;
        } else {
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
    };



    const createOfferer = (peerUsername: string, receiver_channel_name: string) => {
        const peer = new RTCPeerConnection(undefined);

        addLocalTracks(peer)

        const dc = peer.createDataChannel('channel')
        dc.onopen = () => {
            console.log('Connection opened!');
        }
        dc.onmessage = (evt) => {
            const message = evt.data;
            console.log(message, "EVENTDATA!!");
        }

        const remoteVideo = createVideo(peerUsername);
        setOnTrack(peer, remoteVideo);

        mapPeers[peerUsername] = [peer, dc];

        peer.oniceconnectionstatechange = () => {
            const iceConnectionState = peer.iceConnectionState;

            if (iceConnectionState === 'failed' || iceConnectionState === "disconnected" || iceConnectionState === 'closed') {
                delete mapPeers[peerUsername];
                if (iceConnectionState !== 'closed') {
                    peer.close()
                }

                removeVideo(remoteVideo);
            }
        }

        peer.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
            if (event.candidate) {
                console.log('New ice candidate : ', JSON.stringify(peer.localDescription));
                return;

            }

            ws.current.send(
                JSON.stringify(
                    {
                        'peer': peerUsername,
                        'action': "new-offer",
                        'receiver_channel_name': "receiver_channel_name",
                        'message': ''
                    }
                )
            )
        }

        peer.createOffer()
            .then(o => peer.setLocalDescription(o))
            .then(() => {
                console.log("Local description set successful");
            })

    }

    const addLocalTracks = (peer: RTCPeerConnection) => {
        localStream.getTracks().forEach((track: any) => {
            peer.addTrack(track, localStream);
        })

        return;
    }

    const createVideo = (peerUsername: string) => {
        const videoContainer = document.querySelector('#video-container');

        const remoteVideo = document.createElement('video');

        remoteVideo.id = peerUsername + '-video';
        remoteVideo.autoplay = true;
        remoteVideo.playsInline = true;

        const videoWrapper = document.createElement('div');
        videoContainer?.appendChild(videoWrapper);
        videoWrapper.appendChild(remoteVideo);

        return remoteVideo;
    }

    const setOnTrack = (peer: RTCPeerConnection, remoteVideo: HTMLVideoElement) => {
        const remoteStream = new MediaStream();
        remoteVideo.srcObject = remoteStream;

        peer.ontrack = async (event) => {
            remoteStream.addTrack(event.track);
        }
    }

    const removeVideo = (remoteVideo: HTMLVideoElement) => {
        const videoWrapper = remoteVideo.parentNode;

        videoWrapper?.parentNode?.removeChild(videoWrapper);
    }


    return (
        <>
            <div id="video-container">
                <video id="local-video" ref={videoRef} autoPlay playsInline width="400" height="400" />
            </div>
            <div>
                {message.map((data: string) => <div>{data}</div>)}
            </div>
        </>
    )
}




export default Chatting