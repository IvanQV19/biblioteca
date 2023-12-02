class Usuario{
    constructor(id, data){
        //console.log(data);
        this.bandera=0;
        this.id=id;
        this.nombre=data.nombre;
        this.usuario=data.usuario;
        this.password=data.password;
        this.archivo=data.archivo;
        this.salt= data.salt;
        this.admin= data.admin;

    }
    set id(id){
        if (id!=null)
            id.length>0?this._id=id:this.bandera=1;
    }
    
    set nombre(nombre){
        nombre.length>0?this._nombre=nombre:this.bandera=1;
    }
    
    set password(password){
       // console.log(password);
        password.length>0?this._password=password:this.bandera=1;
    }

    set usuario(usuario){
        usuario.length>0?this._usuario=usuario:this.bandera=1;
    }

    set archivo(archivo){
        archivo.length>0?this._archivo=archivo:this.bandera=1;
    }

    set salt(salt){
        salt.length>0?this._salt=salt:this.bandera=1;
    }

    set admin(admin){
    this._admin=admin;
    }

    get id(){
        return this._id;
    }

    get nombre(){
        return this._nombre;
    }

    get password(){
        return this._password;
    }

    get usuario(){
        return this._usuario;
    }

    get archivo(){
        return this._archivo;
    }

    get salt(){
        return this._salt;
    }

    get admin(){
        return this._admin;
    }
   
    get obtenerDatos(){
        if (this._id!=null)
        return{
            id:this.id,
            nombre:this.nombre,
            usuario:this.usuario,
            password:this.password,
            archivo:this.archivo,
            salt:this.salt,
            admin:this.admin

        };
        else{
            return{
                nombre:this.nombre,
                usuario:this.usuario,
                password:this.password,
                archivo:this.archivo,
                salt:this.salt,
                admin:this.admin,
        };
    }
}
}
module.exports=Usuario;