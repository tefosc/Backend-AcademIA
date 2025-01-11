const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Carga las variables de entorno desde .env

// Configuración del servidor
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    // Usar solo la variable de entorno
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Modelos de datos
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
  })
);

const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    question: String,
    options: [String],
    answer: String,
  })
);

// Rutas para usuarios
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// Rutas para preguntas
app.get("/questions", async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

app.post("/questions", async (req, res) => {
  const question = new Question(req.body);
  await question.save();
  res.json(question);
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000; // Usar el puerto dinámico de Glitch
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
