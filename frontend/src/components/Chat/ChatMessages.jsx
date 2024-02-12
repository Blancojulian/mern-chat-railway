import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

const styles = {
    height: '10rem',
    overflow: 'hidden',
    overflowY: 'scroll',
    textAlign: 'right',
    listStyle: 'none'
}

export function ChatMessages({ messages, idUser }) {

    const lastElem = useRef(null);
    useEffect(() => {
      /*if (scroll) {
        lastElem.current?.scrollIntoView();
        console.log('scrollIntoView en useEffect');
        endScroll();
      }*/
      lastElem.current?.scrollIntoView();
    }, [messages]);

    return (
      <ul className="card" style={styles}>
      {
        messages.map((message, index) =>
          <MessageItem key={ index } message={message.message} nombre={message.nombre} esPropio={idUser === message._id} />
        )
      }
      <div ref={lastElem}></div>
      </ul>
    );
  }