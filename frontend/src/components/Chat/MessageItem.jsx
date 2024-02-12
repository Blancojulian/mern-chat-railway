
const styles = {
    display: 'flex',
    flexDirection: 'column'
}

export default function MessageItem({message, esPropio, nombre}) {
    return (
        <li className={esPropio ? 'text-start text-success' : 'text-end text-danger'} style={styles}>
            <h6>{nombre}</h6>
            <p>{message}</p>
        </li>
    );
}