var conexion = require("./conexion").conexionLibros;
var Producto = require("../models/Producto");

async function mostrarProductos() {
    var products = [];
    try {
        var productos = await conexion.get();
        productos.forEach((producto) => {
            var product = new Producto(producto.id, producto.data());
            products.push(product.obtenerDatosP());
        });
    } catch (err) {
        console.log("Error al recuperar registros de la base de datos" + err);
    }
    return products;
}

async function buscarProductoPorID(id) {
    var product = "";
    try {
        var producto = await conexion.doc(id).get();
        var productoObjeto = new Producto(producto.id, producto.data());
        if (productoObjeto.bandera == 0) {
            product = productoObjeto.obtenerDatosP();
            console.log(product);
        }
    } catch (err) {
        console.log("Error al recuperar al producto" + err);
    }
    return product;
}

async function nuevoProducto(datos) {
    var product = new Producto(null, datos);
    var error = 1;
    if (product.bandera == 0) {
        try {
            console.log(product.obtenerDatosP());
            // No necesitas usar doc() aquí, Firestore generará automáticamente el ID
            await conexion.add(product.obtenerDatosP());
            console.log("Producto insertado a la BD");
            error = 0;
        } catch (err) {
            console.log("Error al capturar el nuevo producto" + err);
        }
    }
    return error;
}


async function modificarProducto(datos) {
    var error = 1;
    try {
        var respuestaBuscarProducto = await buscarProductoPorID(datos.id);
        if (respuestaBuscarProducto != undefined) {
            var product = new Producto(datos.id, datos);
            if (product.bandera === 0) {
                await conexion.doc(product.id).set(product.obtenerDatosP());
                console.log("Producto actualizado:", product.obtenerDatosP());
                error = 0;
            } else {
                console.log("Error al modificar el producto: Datos inválidos");
            }
        } else {
            console.log("Error al modificar el producto: Producto no encontrado");
        }
    } catch (err) {
        console.log("Error al modificar el producto:", err);
    }
    return error;
}




async function borrarProducto(id) {
    var error = 1;
    var product = await buscarProductoPorID(id);
    if (product != "") {
        try {
            await conexion.doc(id).delete();
            console.log("Producto borrado");
            error = 0;
        } catch (err) {
            console.log("Error al borrar el producto" + err);
        }
    }
    return error;
}

// Nueva función para puntuar el libro
async function puntuarLibro(id, nuevaPuntuacion) {
    var error = 1;
    try {
        var product = await buscarProductoPorID(id);
        if (product != "") {
            product.puntuacion = nuevaPuntuacion;
            await conexion.doc(id).set(product);
            console.log("Puntuación del libro actualizada");
            error = 0;
        }
    } catch (err) {
        console.log("Error al puntuar el libro" + err);
    }
    return error;
}

module.exports = {
    mostrarProductos,
    buscarProductoPorID,
    nuevoProducto,
    modificarProducto,
    borrarProducto,
    puntuarLibro, // Agregamos la nueva función puntuarLibro

};
