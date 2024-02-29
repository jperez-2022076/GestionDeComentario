'use strict'
import { generarJwt } from "../utils/jwt.js"
import { encriptar, verificarContraseña } from "../utils/validator.js"
import userModel from "./user.model.js"

export const test = (req,res)=>{
    return res.send('Hola si funciona')
}
export const agregarUser = async(req,res)=>{
    try {
        let datos = req.body
        datos.contraseña = await encriptar(datos.contraseña)
        let user  = new userModel(datos)
        await user.save()
        return res.send({message: `Registro el usuario ${datos.usuario}, su nombre es ${datos.nombre} `})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al agregar Usuario'})
        
    }
}

export const login = async(req,res)=>{
    try {
        let {email,usuario,contraseña}= req.body
        let user = await userModel.findOne({
            $or:[
                {usuario:usuario},
                {email:email}
            ]
        })
        if(user.estado == false){
            return res.send({message:'Se elimino esta cuenta no se puede iniciar sesion'})
        }
        if(user && await verificarContraseña(contraseña,user.contraseña)){
            let usuarioLogeado = {
                uid: user._id,
                usuario: user.usuario,
                nombre: user.nombre
              
            }
            let token = await generarJwt(usuarioLogeado)
            return res.send({message:`Bienvenido ${user.nombre}`,
            usuarioLogeado,
            token
        })
        }
        return res.status(404).send({message: 'Contraseña o usuario incorrecto'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Fallo al iniciar sesion'})
        
    }
}
export const actualizar = async(req,res)=>{
    try {
        let {id} = req.user
        let {uid} = req.params
        let datos = req.body
        let user = await userModel.findOne({_id: id})
        
        if(id === uid){
            if(await verificarContraseña(datos.contraseñaAntigua,user.contraseña)){
                let actulizarUsuario = await userModel.findOneAndUpdate(
                    {_id:uid},
                    datos,
                    {new: true}
                )
                if(!actulizarUsuario) return res.status(401).send({message: 'El usuario no se pudo actualizar'})
                return res.send({message: 'Actualizado',actulizarUsuario})
            }else{
                return res.status(404).send({message:'La contraseña antigua no conside'})
            }
            }else{
                return res.status(404).send({message:'No se puede actualizar una cuenta que no es tuya'})
            }
        
           
    } catch (err) {
        console.error(err)
        if(err.keyValue.usuario) return res.status(400).send({message:`El usuario ya existe ${err.keyValue.usuario}`})
        return res.status(500).send({message: 'Error al actualizar'})
        
    }
}

export const eliminarUser = async(req,res)=>{
    try {
        let {uid} = req.params
        let {id} = req.user
        if(uid == id){
            let user = await userModel.findOneAndUpdate({_id: uid},{estado:false})
            if(!user)res.status(402).send({message: 'No se encontro el usurio'})
            return res.send({message: `Se elimino el usuario ${user.usuario}`})    
        }else{
            return res.status(403).send({message: 'No se puede eliminar una cuenta que no es tuya'})
        }

      
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al eliminar'})
        
    }
}
