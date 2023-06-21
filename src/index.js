const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
// Inicializacion
const app = express();

// Configuracion

app.set("port", process.env.PORT || 4000);
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: require("./lib/helpers.js"), // Registra los helpers aquí
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Variables globales
app.use((req, res, next) => {
  next();
});

// Rutas
app.use(require("./routes/index.js"));
app.use(require("./routes/autenticacion.js"));
app.use("/links", require("./routes/enlaces.js"));

// Public
app.use(express.static(path.join(__dirname, "public")));

// Inicializacion del servidor
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
