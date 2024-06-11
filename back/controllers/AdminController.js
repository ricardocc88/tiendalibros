'use strict';

var Admin = require('../models/admin');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_admin = async function (req,res){
    //
    var data = req.body;
    var admin_arr = [];

    admin_arr = await Admin.find({email:data.email});

    if (admin_arr.length == 0){

        // registro de usuario en la base de datos
    // var reg = await Cliente.create(data);
    if(data.password){
        bcrypt.hash(data.password,null,null, async function(err,hash){
            if(hash){
                data.password = hash;
                var reg = await Admin.create(data);
                res.status(200).send({data:reg});
            }else{
                res.status(200).send({message:'Error server',data:undefined});
            }
        })        
    }else{
        res.status(200).send({message:'No hay una contraseña',data:undefined});
    }
      
    }    
    else{
        res.status(200).send({message:'El correo ya existe en la base de datos',data:undefined});
    }   

}

// validando correo y pass

const login_admin = async function(req,res){
    var data = req.body;
    var admin_arr = [];

    admin_arr = await Admin.find({email:data.email});

    if(admin_arr.length == 0){
        res.status(200).send({message: 'No se encuentra registrado correo', data: undefined});
    }else{
            //login
        let user = admin_arr[0];
        
        bcrypt.compare(data.password, user.password, async function(error,check){
            if(check){
               //    if(user.password == data.email){ 
                res.status(200).send({
                    data:user,
                    token: jwt.createtoken(user)});
                console.log(user);
            }else{
                res.status(200).send({message: 'La contraseña no coincide', data: undefined});
            }
        });
    }
    
}

module.exports = {
    registro_admin,
    login_admin
}