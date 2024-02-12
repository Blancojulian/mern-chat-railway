import { useEffect, useRef, useState } from "react"
import { socket } from "../socket/socket";
import audioFile from './../assets/audio/audio.mp3';
const useChat = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);
    const audio = useRef(new Audio(audioFile));
    const sendMessage = (message) => {
        socket.emit('message', message);
    }

    const playSound = async () => {
        try {
            if (messages.length > 0) {
                console.log('playSound');
                console.log(audio.current);   
                await audio.current?.play();
            }
        } catch (err) {
            console.log(err);
        }
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
    }, []);

    /*useEffect(()=>{
        try {
            if (messages.length > 0) {
                audio.current?.play();
                console.log('play');
                console.log(audio.current);   
            }
        } catch (err) {
            console.log(err);
        }
    }, [messages]);*/

    return {
        isConnected,
        messages,
        sendMessage,
        playSound
    }
}

export default useChat;