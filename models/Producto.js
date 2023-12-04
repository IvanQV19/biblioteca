class Producto {
    constructor(id, data) {
        this.bandera = 0;
        this._id = id;
        this._nombre = data.nombre;
        this._descripcion = data.descripcion;
        this._comentarios = data.comentarios;
        this._precio = data.precio;
        this._foto = data.foto;
        this._puntuacion = data.puntuacion || 0;  // Nueva propiedad para la puntuación
    }

    // Métodos de set

    set id(id) {
        this._id = id && id.length > 0 ? id : this.bandera = 1;
    }

    set nombre(nombre) {
        this._nombre = nombre.length > 0 ? nombre : this.bandera = 1;
    }

    set descripcion(descripcion) {
        this._descripcion = descripcion.length > 0 ? descripcion : this.bandera = 1;
    }

    set comentarios(comentarios) {
        this._comentarios = comentarios.length > 0 ? comentarios : this.bandera = 1;
    }

    set precio(precio) {
        this._precio = precio.length > 0 ? precio : this.bandera = 1;
    }

    set foto(foto) {
        this._foto = foto.length > 0 ? foto : this.bandera = 1;
    }

    set puntuacion(puntuacion) {
        if (puntuacion >= 0 && puntuacion <= 5) {
            this._puntuacion = puntuacion;
        } else {
            this.bandera = 1;  // Puntuación no válida
        }
    }

    // Métodos de get

    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get descripcion() {
        return this._descripcion;
    }

    get comentarios() {
        return this._comentarios;
    }

    get precio() {
        return this._precio;
    }

    get foto() {
        return this._foto;
    }

    get puntuacion() {
        return this._puntuacion;
    }

    obtenerDatosP() {
        const datosProducto = {
            nombre: this._nombre,
            descripcion: this._descripcion,
            comentarios: this._comentarios,
            precio: this._precio,
            foto: this._foto,
            puntuacion: this._puntuacion,
        };

        if (this._id != null) {
            datosProducto.id = this._id;
        }

        return datosProducto;
    }
}

module.exports = Producto;
