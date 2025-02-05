import express, { Application } from "express";
import socketIO, { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import path from "path";

export class Server {
  private httpServer!: HTTPServer;
  private app!: Application;
  private io!: SocketIOServer;

  private activeSockets: string[] = [];
  private readonly DEFAULT_PORT = 8000;

  constructor() {
    this.initialize();
    // this.handleRoutes();
    // this.handleSocketConnection();
  }

  private initialize(): void {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new SocketIOServer(this.httpServer);

    this.configureApp();
    this.handleSocketConnection();
  }

  private handleRoutes(): void {
    this.app.get("/", (req, res) => {
      res.send(`<h1>Hello World</h1>`);
    });
  }

  private configureApp(): void {
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  private handleSocketConnection(): void {
    // Handle new socket connections
    this.io.on("connection", (socket) => {
      // Check if this socket ID already exists in active sockets
      const existingSocket = this.activeSockets.find(
        (existingSocket) => existingSocket === socket.id
      );

      console.log("Socket Connected: ", socket.id);

      // Only handle new socket connections
      if (!existingSocket) {
        // Add new socket ID to active sockets array
        this.activeSockets.push(socket.id);

        // Send the new socket a list of all other active sockets
        socket.emit("update-user-list", {
          users: this.activeSockets.filter(
            (existingSocket) => existingSocket !== socket.id
          ),
        });

        // Notify all other sockets about this new connection
        socket.broadcast.emit("update-user-list", {
          users: [socket.id],
        });

        // Handle WebRTC signaling for video calls

        // When a user initiates a call
        socket.on("call-user", (data) => {
          // Forward the call offer to the target socket
          socket.to(data.to).emit("call-made", {
            offer: data.offer,
            socket: socket.id,
          });
        });

        // When a user answers a call
        socket.on("make-answer", (data) => {
          // Forward the call answer to the caller
          socket.to(data.to).emit("answer-made", {
            socket: socket.id,
            answer: data.answer,
          });
        });

        // Handle socket disconnection
        socket.on("disconnect", () => {
          // Remove disconnected socket from active sockets
          this.activeSockets = this.activeSockets.filter(
            (existingSocket) => existingSocket !== socket.id
          );
          // Notify other users about the disconnection
          socket.broadcast.emit("remove-user", {
            socketId: socket.id,
          });

          console.log("Socket Disconnected - ", this.activeSockets);
        });
      }
    });
  }

  public listen(callback: (port: number) => void): void {
    this.httpServer.listen(this.DEFAULT_PORT, () =>
      callback(this.DEFAULT_PORT)
    );
  }
}
