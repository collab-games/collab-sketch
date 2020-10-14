import http from "http";
import express from "express";
import cors from "cors";
import {Server} from "colyseus";
import {monitor} from "@colyseus/monitor";
const basicAuth = require('express-basic-auth')

import {CollabSketchRoom} from "./room/CollabSketchRoom";
import * as process from "process";
const port = Number(process.env.PORT || 2567);


const app = express();

// @ts-ignore
const basicAuthMiddleware = basicAuth({
    users: process.env.USERS,
    challenge: true
});

app.use(cors());
app.use(express.json())

const server = http.createServer(app);
const gameServer = new Server({
    server,
});

// register your room handlers
gameServer.define('collab-sketch', CollabSketchRoom);

// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", basicAuthMiddleware, monitor());

gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`)
