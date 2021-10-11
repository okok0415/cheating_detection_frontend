import React, { useState } from 'react';
import "../CSS/Test.css";


function HTML() {
    const [mic, setMic] = useState(true);
    const [video, setVideo] = useState(true);
    const [screen, setScreen] = useState(false);
    const micHandle = () => {
        if (mic === true) {
            setMic(false);
        }
        else {
            setMic(true);
        }
    }

    const videoHandle = () => {
        if (video === true) {
            setVideo(false);
        }
        else {
            setVideo(true);
        }
    }

    const screenHandle = () => {
        if (screen === true) {
            setScreen(false);
        }
        else {
            setScreen(true);
        }
    }

    return (
        <div className="test">
            <h3 id="label-username">USERNAME</h3>
            <div>
                <input id="username" /><button id="btn-join">Join Room</button>
            </div>
            <div className="main-grid-container">
                <div className="main-side">
                    <div id="video-container">

                    </div>

                </div>
                <div className="right-side">
                    <div id="lim"><video id="local-video" className="my-video" autoPlay playsInline /></div>
                    <div className="btn-control">
                        <div> </div>
                        <div id="btn-toggle-audio" onClick={micHandle} className="btn btn-dark">{mic ? <i className="fas fa-microphone"></i> : <i className="fas fa-microphone-slash"></i>}</div>
                        <div id="btn-toggle-video" onClick={videoHandle} className="btn btn-dark">{video ? <i className="fas fa-video"></i> : <i className="fas fa-video-slash"></i>}</div>
                        <div id="btn-share-screen" onClick={screenHandle}>{screen ? <i className="fas fa-times"></i> : <i className="fas fa-desktop"></i>}</div>
                        <div> </div>
                    </div>
                    <div id="chat">
                        <div className="chat-title">채팅</div>
                        <div id="messages">
                            <div id="message-list"></div>
                        </div>
                        <div id="ct"><input id="msg" /><div id="btn-send-msg">전송</div></div>

                    </div>
                </div>

            </div>


        </div>
    )
}

export default HTML;