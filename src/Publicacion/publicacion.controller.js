'use strict'

import comentarioModel from "../Comentario/comentario.model.js"
import userModel from "../user/user.model.js"

import publicacionModel from "./publicacion.model.js"


export const agregarPublicacion = async(req,res)=>{
    try {
        let datos = req.body
        let {id} = req.user
        datos.user = id
        let usuario = await userModel.findOne({_id: id})
        let publicacion = new publicacionModel(datos)
        await publicacion.save()
        return res.send({message:`Se agrego la publicación ${datos.titulo} al usuario  ${usuario.usuario}` })
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error al agregar la publicacion',err})
    }
}

export const actualizarPublicacion = async(req,res)=>{
    try {
        let {uid} = req.params
        let datos = req.body
        let {id} = req.user
        datos.user = id
        let publicacion = await publicacionModel.findOne({_id: uid})
        if(!publicacion) return res.status(404).send({message:'No se encontro una publicacion'})
        if ('user' in datos ) {
            return res.status(400).send({ message: 'Hay datos que no se pueden actualizar' });
        }
        if(publicacion.user == id){
             let actualizarPublicacion = await publicacionModel.findOneAndUpdate(
            {_id: uid},
            datos,
            {new: true}
        )
        if(!actualizarPublicacion)return res.status(401).send({message: ' No se pudo realizar la actualización'})
            return res.send({message: 'Actualizado',actualizarPublicacion})
        }else {
            return res.status(401).send({message:'No se puede actualizar una publicacion que no es tuya'})
        }
          } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al actualizar la publicacion'})
    }
}

export const eliminarPublicacion = async(req,res)=>{
    try {
        let {uid} = req.params
        let {id} = req.user
        let publicacion = await publicacionModel.findOne({_id: uid})
        if(publicacion.user == id){
            await comentarioModel.deleteMany({ publicacion: uid })
            let eliminaPublicacion = await publicacionModel.findOneAndDelete({_id: uid})
            return res.send({message: `Se elimino la publicacion ${eliminaPublicacion.titulo}`})
        }
        return res.status(403).send({message: 'No se puede eliminar una publicacion que no es tuya'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al eliminarPublicacion'})
        
    }
}

