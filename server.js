const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const fs = require("fs");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Permite acesso da porta 5173 (Vite)
    methods: ["GET", "POST"], // Métodos HTTP permitidos
    // allowedHeaders: ["my-custom-header"], // Cabeçalhos permitidos (opcional)
    // credentials: true // Se você estiver usando cookies ou autenticação (opcional)
  },
});
// Sirva os arquivos estáticos da pasta 'dist' (após o build)
app.use(express.static(path.resolve(__dirname, "dist")));

app.get("/sponsors", (req, res) => {
  const sponsorsDir = path.resolve(__dirname, "dist", "sponsors"); // Pasta 'sponsors' dentro de 'dist'
  console.log("Lendo a pasta de sponsors:", sponsorsDir);
  fs.readdir(sponsorsDir, (err, files) => {
    // Lê os arquivos na pasta
    if (err) {
      console.error("Erro ao ler a pasta de sponsors:", err);
      return res.status(500).send("Erro ao buscar a lista de sponsors");
    }

    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
    ); // Filtra apenas imagens

    res.json(imageFiles); // Envia a lista de imagens como JSON
  });
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("updateOverlay", (data) => {
    console.log("Atualizando overlay:", data);
    socket.broadcast.emit("updateOverlay", data); // Envia para todos os outros clientes
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Rota para servir o index.html (após o build)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// Lidando com o encerramento do servidor (Ctrl+C)
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
