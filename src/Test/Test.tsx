import React, { useEffect, useState, useRef } from "react"

const API_PATH = 'ws://localhost:8000/ws/chat/lobby/'

function Test() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [messageBox, setMessageBox] = useState([""]);

    const chatSocket = new WebSocket(API_PATH);
    const sendMessageHandle = () => {
        setMessage("");
        chatSocket.onopen = function () {
            console.log("connection open!")
            chatSocket.send(
                JSON.stringify({
                    username: username,
                    message: message
                })
            )
        }

    }

    const EnterHandle = (e: any) => {
        if (message) {
            if (e.key === "Enter") {
                sendMessageHandle();
            }
            else {
                return null;
            }
        }
    }
    const usernameHandle = (e: any) => {
        setUsername(e.target.value)
    }
    const messageHandle = (e: any) => {
        setMessage(e.target.value)
    }
    useEffect(() => {
        chatSocket.onmessage = function (e) {
            console.log(e)
            const data = JSON.parse(e.data);
            console.log(data)
        };
    }, []);

    const CONSTRAINTS = { video: true };
    const videoRef = useRef<HTMLVideoElement>(null);

    const startVideo = async () => {
        const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
        if (videoRef && videoRef.current && !videoRef.current.srcObject) {
            videoRef.current.srcObject = stream;
        }
    };

    return (
        <>
            <div>{username}</div>
            <input name="username" value={username} onChange={usernameHandle} />
            <button onClick={startVideo}>start video</button>
            <div><video ref={videoRef} autoPlay playsInline /></div>
            <div>{messageBox}</div>
            <input name="message" value={message} onChange={messageHandle} onKeyPress={EnterHandle} placeholder="메세지를 입력해주세요" />
        </>
    )

}



export default Test;