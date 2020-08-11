import http from "http";
import express from "express";
import cors from "cors";
import {Server} from "colyseus";
import {monitor} from "@colyseus/monitor";

import {CollabSketchRoom} from "./room/CollabSketchRoom";

const port = Number(process.env.PORT || 2567);
const app = express()

app.use(cors());
app.use(express.json())
app.use("/", express.static("dist") )

const server = http.createServer(app);
const gameServer = new Server({
    server,
});

// register your room handlers
gameServer.define('collab-sketch', CollabSketchRoom);

// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor());

gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`)
