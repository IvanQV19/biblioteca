var ruta = require("express").Router();
var fs = require("fs");
var {
    mostrarProductos,
    nuevoProducto,
    modificarProducto,
    buscarProductoPorID,
    borrarProducto,
    puntuarLibro, // Agregamos la función puntuarLibro
} = require("../database/productosBD");
var subirArchivo = require("../middlewares/subirArchivos");
const { admin } = require("../middlewares/funcionesPassword");

ruta.get("/productos", async (req, res) => {
    try {
        var productos = await mostrarProductos();
        res.render("productos/mostrar", { productos });
    } catch (error) {
        console.log("Error al mostrar productos", error);
        res.status(500).send("Error interno del servidor");
    }
});

ruta.get("/nuevoproducto", async (req, res) => {
    res.render("productos/nuevo");
});

ruta.post("/nuevoproducto", subirArchivo(), async (req, res) => {
    req.body.foto = req.file.originalname;
    var error = await nuevoProducto(req.body);
    res.redirect("/productos");
});

ruta.get("/editarProducto/:id", async (req, res) => {
    var producto = await buscarProductoPorID(req.params.id);
    res.render("productos/modificar", { producto });
});

ruta.post("/editarProducto", subirArchivo(), async (req, res) => {
    try {
        const productoAct = await buscarProductoPorID(req.body.id);
        if (req.file) {
            req.body.foto = req.file.originalname;
            if (productoAct.foto) {
                const rutaFotoAnterior = `web/images/${productoAct.foto}`;
            }
        }

        const error = await modificarProducto(req.body);
        if (error === 0) {
            console.log("Producto modificado exitosamente");
            res.redirect("/productos");
        } else {
            console.error("Error al modificar producto");
            res.status(500).send("Error al modificar producto");
        }
    } catch (error) {
        console.error("Error al editar producto", error);
        res.status(500).send("Error interno del servidor");
    }
});



// Nueva ruta para puntuar el libro
ruta.post("/puntuarLibro/:id", async (req, res) => {
    try {
        const libroId = req.params.id;
        const nuevaPuntuacion = req.body.puntuacion;
        // Lógica para manejar la puntuación del libro
        var error = await puntuarLibro(libroId, nuevaPuntuacion);
        if (error) {
            console.error("Error al puntuar el libro");
            res.status(500).send("Error al puntuar el libro");
        } else {
            res.redirect(`/productos`);
        }
    } catch (error) {
        console.error("Error al puntuar el libro", error);
        res.status(500).send("Error interno del servidor");
    }
});



ruta.get("/borrarProducto/:id", admin, async (req, res) => {
    try {
        const producto = await borrarProducto(req.params.id);
        if (producto) {
            const foto = producto.foto;
            if (foto) {
                const rutaFoto = `web/images/${foto}`;
                fs.unlinkSync(rutaFoto);
            }
            res.redirect("/productos");
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (error) {
        console.error("Error al borrar el producto", error);
        res.status(500).send("Error interno del servidor");
    }
});


module.exports = ruta;
