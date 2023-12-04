var ruta=require("express").Router();
var {mostrarUsuarios, nuevoUsuario, modificaUsuario, buscarPorID,
     borrarUsuario, buscarPorUsuario, verificarPassword}=require("../database/usuariosBD");
var fs=require("fs");
var subirArchivo=require("../middlewares/subirArchivos");
var {autorizado, admin}=require("../middlewares/funcionesPassword");
const { Console } = require("console");


ruta.get("/usuarios", autorizado,async(req, res)=>{
    var usuarios=await mostrarUsuarios();
    res.render("usuarios/mostrar", {usuarios});
});

ruta.get("/", async(req, res)=>{
    res.render("usuarios/login");
});

ruta.get("/mostrarUsuarios", autorizado, async(req, res)=>{
    res.render("usuarios/mostrar", {usuarios});
});

ruta.get("/nuevousuario", async(req, res)=>{
    res.render("usuarios/nuevo");
});

ruta.post("/nuevousuario", subirArchivo(), async(req, res)=>{
    req.body.archivo=req.file.originalname;
    var error= await nuevoUsuario(req.body);
    console.log(error);
    res.redirect("/");
});

ruta.get("/editar/:id", admin, async (req, res) => {
    try {
        var user = await buscarPorID(req.params.id);
        res.render("usuarios/modificar", { user });
        console.log(user);
    } catch (error) {
        console.error("Error al obtener usuario para editar", error);
        res.status(500).send("Error interno de servidor");
    }
});

ruta.post("/editar", subirArchivo(), async (req, res) => {
    try {
        const usuarioAct = await buscarPorID(req.body.id);

        if (usuarioAct && req.session.usuario == usuarioAct.usuario) {
            if (req.file) {
                req.body.archivo = req.file.originalname;
                if (usuarioAct.archivo) {
                    const rutaArchivoAnterior = `web/images/${usuarioAct.archivo}`;
                    fs.unlinkSync(rutaArchivoAnterior);
                }
            } else {
                req.body.archivo = req.body.archivoViejo;
            }

            await modificaUsuario(req.body);
            res.redirect("/");
        } else {
            res.status(403).send("No tienes autorización para editar este usuario");
        }
    } catch (error) {
        console.error("Error al editar registro", error);
        res.status(500).send("Error interno de servidor");
    }
});

ruta.get("/borrar/:id", admin, async(req, res)=>{
    var usuario=await buscarPorID(req.params.id)
    if(usuario){
        var archivo=usuario.archivo;
        fs.unlinkSync(`web/images/${archivo}`);
    await borrarUsuario(req.params.id);
    }
    res.redirect("/")
});

ruta.get("/login", (req, res)=>{
    res.render("usuarios/login");
});  

ruta. post ("/login", async(req, res)=>{
    var {usuario, password}=req.body;
    var usuarioEncontrado=await buscarPorUsuario(usuario);
    if (usuarioEncontrado) {
        var passwordCorrecto=await verificarPassword(password, usuarioEncontrado.password, usuarioEncontrado.salt);
        if (passwordCorrecto) {
            if (usuarioEncontrado.admin) {
                req.session.admin=usuarioEncontrado.admin;
                //res.redirect("/");
                res.redirect("/nuevoProducto");
            }else{
                req.session.usuario=usuarioEncontrado.usuario;
                res.redirect("/usuarios");
            }
        }else{
            console.log("Usuario o contraseña incorrectos");
            res.render("usuarios/login");
        }
    }else{
        console.log("Usuario o contraseña incorrectos");
        res.render("usuarios/login");
    }
});

ruta.get("/logout", (req, res)=>{
    req.session=null;
    res.redirect("/");
});

module.exports=ruta;