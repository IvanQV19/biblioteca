var express = require("express");
var rutasUsuarios = require("./routes/usuariosRutas");
var rutasLibros = require("./routes/productosRutas");
var rutasLibrosApi = require("./routes/productosRutasApis");
var cors = require("cors");
var path = require("path");
var session = require("cookie-session");
require("dotenv").config();

var app = express();
var port = process.env.PORT || 3000;

app.use(cors());
app.use(session({
    name: 'session',
    keys: ['qwertyuiop'],
    maxAge: 24 * 60 * 60 * 1000
}));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "/web")));

app.use("/", rutasUsuarios);
app.use("/", rutasLibros);
app.use("/", rutasLibrosApi);

app.listen(port, () => {
    console.log("Servidor en http://localhost:" + port);
});
