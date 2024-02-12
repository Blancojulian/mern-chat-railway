import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import errorHandler, { notFound } from './exception/errorHandler.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import corsOptions from './config/corsOptions.js';

const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
//ver si hay forma de juntar los 2 cors option
const io = new Server(server, { cors: corsOptions, connectionStateRecovery: {} });

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

if (process.env.NODE_ENV !== 'development') {
    const __dirname = path.resolve();
    const staticPath = path.join(__dirname, 'frontend', 'dist');
    const indexHtmlPath = path.resolve(__dirname, 'frontend', 'dist', 'index.html');
    console.log(`${__dirname}\n${staticPath}\n${indexHtmlPath}\n`);
    console.log(`${__dirname}`);

    app.use(express.static( staticPath ));
    app.get('*', (req, res) => {
        res.sendFile(indexHtmlPath);
    });
} else {
    app.get('/', (req, res) => {
        res.send('Server running, in development')
    });

}


//app.all('*', notFound)
app.all(notFound)
app.use(errorHandler);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('message', 'Bienvenido usuario')
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        //puedo hacer que no agregue el mensaje en el front y lo haga cuando reenvia el msj, asi confirmo que se envio el msj
        io.emit('message', msg);
        //socket.broadcast.emit('message', {message: msg});
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}\nhttp://localhost:${PORT}/`);
});
