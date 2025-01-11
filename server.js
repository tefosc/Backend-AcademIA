const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Configuración del servidor
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose
  .connect(
    "mongodb+srv://asolism171:tAwzfkU9Cwv7Uwt6@cluster-academia.6ugpk.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
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
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
