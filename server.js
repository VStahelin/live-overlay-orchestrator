const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const fs = require("fs");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow the frontend to connect from Vite's development server
    methods: ["GET", "POST"],
  },
});

// Serving static files from the dist folder
app.use(express.static(path.resolve(__dirname, "dist")));

function listImagesFromFolder(folderName, res) {
  const folderPath = path.resolve(__dirname, "dist", folderName);
  console.log(`Lendo a pasta de ${folderName}:`, folderPath);

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Erro ao ler a pasta de ${folderName}:`, err);
      return res.status(500).send(`Erro ao buscar a lista de ${folderName}`);
    }

    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
    );

    res.json(imageFiles);
  });
}

app.get("/sponsors", (req, res) => {
  listImagesFromFolder("sponsors", res);
});

app.get("/speakers", (req, res) => {
  listImagesFromFolder("speakers", res);
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("updateOverlay", (data) => {
    console.log("Atualizando overlay:", data);
    socket.broadcast.emit("updateOverlay", data); // Send to all clients except sender
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Routes to serve the index.html (after build)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// Handling server shutdown (Ctrl+C)
let serverInstance;

serverInstance = server.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});

process.on("SIGINT", () => {
  if (serverInstance) {
    serverInstance.close(() => {
      console.log("Servidor encerrado");
      process.exit(0);
    });
  } else {
    console.log("Servidor não iniciado");
    process.exit(0);
  }
});
