
const API_PATH = `ws://${window.location.host}/ws/chat/lobby/`


class WebSocketService {
    static instance: WebSocketService | null = null;
    static getInstance() {
        if (WebSocketService.instance === null) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance
    }
    public socketRef?: WebSocket;

    initChat(message: string) {
        this.socketRef = new WebSocket(API_PATH);
        this.socketRef.onopen = () => {
            console.log("WebSocket open!")
            this.socketRef?.send(
                JSON.stringify({
                    message: message
                }))
        }
    }
    sendMessage(message: string) {

    }



}

const WebSocketInstance = WebSocketService.getInstance()

export default WebSocketInstance;


