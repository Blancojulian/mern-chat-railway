import { useEffect, useState } from "react"
import { socket } from "../socket/socket";

const useChat = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);

    const sendMessage = (message) => {
        socket.emit('message', message);
    }

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }
    
        function onDisconnect() {
            setIsConnected(false);
        }
    
        function onMessageEvent(value) {
            setMessages(previous => [...previous, value]);
            console.log(value);
        }
    
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('message', onMessageEvent);
    
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('message', onMessageEvent);
        };
    }, [])

    return {
        isConnected,
        messages,
        sendMessage
    }
}

export default useChat;