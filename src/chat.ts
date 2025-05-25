import express, { Request, Response } from 'express';
import config from './config/config';
import { connectToDB } from './db/database';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter';
import { errorHandler } from './middlewares/errorHandler';
import nodemailer from 'nodemailer';
import path from 'path';
import PDFDocument from 'pdfkit';
import { Server } from 'socket.io';
import http from 'http';

dotenv.config();

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')));

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("chat message", (msg: string) => {
        console.log(`Message from ${socket.id}: ${msg}`);
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
    });
});

// app.use("/api/users", userRouter)


// app.use(errorHandler);

server.listen(7000, '0.0.0.0', () => {
    console.log(`Server running on port ${7000}`);
});