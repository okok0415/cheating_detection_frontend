import React, { useEffect, useState } from "react";

function Video() {
    const [video, setVideo] = useState<boolean>(true);
    const [audio, setAudio] = useState<boolean>(true);
    const videoRef = React.useRef<any>(null);
    let localStream: any = null;

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
            setVideo(true);
            localStream = stream;
            videoRef.current.srcObject = localStream;
            videoRef.current.muted = true;
        });
    }, []);

    const videoHandle = () => {
        //.getVideoTracks()
        //.foreach((track: any) => (track.enabled = !track.enabled));
        setVideo(!video)
    }

    const audioHandle = () => {
        if (audio) {

        }
        else {

        }
        setVideo(!audio)
    }

    return (
        <>
            <video ref={videoRef} autoPlay playsInline width="400" height="400" />
        </>
    )
}


export default Video;