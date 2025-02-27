'use strict';

var Cliente = require('../models/cliente');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_cliente = async function (req,res){
    //
    var data = req.body;
    var clientes_arr = [];

    clientes_arr = await Cliente.find({email:data.email});

    if (clientes_arr.length == 0){
        // registro de usuario en la base de datos
    // var reg = await Cliente.create(data);
    if(data.password){
        bcrypt.hash(data.password,null,null, async function(err,hash){
            if(hash){
                data.password = hash;
                var reg = await Cliente.create(data);
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

const login_cliente = async function(req,res){
    var data = req.body;
    var cliente_arr = [];

    cliente_arr = await Cliente.find({email:data.email});

    if(cliente_arr.length == 0){
        res.status(200).send({message: 'No se encuentra registrado correo', data: undefined});
    }else{
            //login
        let user = cliente_arr[0];
        
        bcrypt.compare(data.password, user.password, async function(error,check){
            if(check){
                res.status(200).send({
                    data:user,
                    token: jwt.createtoken(user)});
                console.log(user);;
            }else{
                res.status(200).send({message: 'La contraseña no coincide', data: undefined});
            }
        });
    }
    
}

const listar_clientes_filtro_admin =  async function(req,res){

    let tipo = req.params['tipo'];
    let filtro = req.params['filtro'];

    console.log(tipo);
    console.log(filtro);
    if(tipo == null || tipo == 'null'){
        let reg = await Cliente.find();
        res.status(200).send({data:reg});
    }else{
        //filtro
        if(tipo == 'nombres'){
            let reg = await Cliente.find({nombres: new RegExp(filtro, 'i')})
            res.status(200).send({data:reg});
        }else if(tipo == 'apellidos'){
            let reg = await Cliente.find({apellidos: new RegExp(filtro,'i')});
            res.status(200).send({data:reg});
        }else if(tipo == 'correo'){
            let reg = await Cliente.find({email: new RegExp(filtro, 'i')})
            res.status(200).send({data:reg});
        }
    }
    
}


module.exports = {
    registro_cliente,
    login_cliente,
    listar_clientes_filtro_admin
}