var admin=require("firebase-admin");
var keys=require("../keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});

var micuenta=admin.firestore();
var conexionUsuarios=micuenta.collection("usuarioAdmin"); 
var conexionLibros=micuenta.collection("miejemplolibros");


module.exports={
    conexionUsuarios,
    conexionLibros,
};