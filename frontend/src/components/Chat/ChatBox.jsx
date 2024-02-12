import { useEffect, useRef, useState } from "react"
import { socket } from "../../socket/socket";
import { ChatMessages } from "./ChatMessages";
import { useSelector } from "react-redux";
import useChat from "../../hooks/useChat";


export default function ChatBox() {
    const mensajeInput = useRef(null);
    const { userInfo } = useSelector((state) => state.auth);

    const {
        isConnected,
        messages,
        sendMessage
    } = useChat();

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (mensajeInput.current?.value) {
            const message = {
                message: mensajeInput.current.value,
                _id: userInfo._id,
                nombre: userInfo.nombre
            };
            //setMessages(previous => [...previous, message]);
            sendMessage(message);
            mensajeInput.current.value = '';
        }
    }
    return (
        <div className="chat-box">
            <h2>Chat Grupal</h2>
            <p>Usuario conectado: {isConnected ? 'Conectado' : 'Desconectado'}</p>
            <ChatMessages messages={messages} idUser={userInfo._id} />
            <form onSubmit={handleSendMessage} action="">
                <div className="row">
                    <div className="col-12 col-sm-4">
                        <input ref={mensajeInput} className="form-control" type="text" name="" id="" />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </div>
                </div>
            </form>
        </div>
    )
} 
