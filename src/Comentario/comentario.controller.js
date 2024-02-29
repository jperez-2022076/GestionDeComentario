'use strict'
import publicacionModel from '../Publicacion/publicacion.model.js'
import comentarioModel from './comentario.model.js'

export const test = async(req,res)=>{
    try {
        res.send({message:'Si funciona'})
    } catch (err) {
        console.log(err)
    }
}

export const agregarComentario = async(req,res)=>{
    try {
        let datos = req.body
        let {id} = req.user
        datos.user = id
        let publicacion = await publicacionModel.findOne({_id: datos.publicacion})
        if(!publicacion) return res.status(404).send({message: 'No se encontro la publicación'})
        let comentario = comentarioModel(datos)
        await comentario.save()
        return res.send({message: 'Se agrego el comentario',comentario,publicacion})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al agregar comentario'})
        
    }
}

export const actualizarComentario = async(req,res)=>{
    try {
        let datos = req.body
        let {uid} = req.params
        let {id}  = req.user
        let comentario = await comentarioModel.findOne({_id :uid})
        if(!comentario)return res.status(401).send({message:'No se encotro el comentario'})
        if(id == comentario.user){
            if ('user' in datos || 'publicacion' in datos) {
                return res.status(400).send({ message: 'Hay datos que no se pueden actualizar' });
            }
            let actulizarComentario = await comentarioModel.findOneAndUpdate(
                {_id: uid},
                datos,
                {new: true}
                )
            if(!actulizarComentario)return res.status(401).send({message: 'No se pudo actualizar'})
            return res.send({message:'Actualizado',actulizarComentario})  
        }else{
            return res.status(403).send({message: 'No se puede actualizar un comentario que  no es tuyo'})
        }
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al actualizar'})
    }
}

export const eliminarComentario = async(req,res)=>{
    try {
        let {uid}= req.params
        let {id} = req.user
        let comentario = await comentarioModel.findOne({_id: uid})
        if(comentario.user == id){
            let eliminarComentario = await comentarioModel.findOneAndDelete({_id:uid})
            if(!eliminarComentario) return res.status(404).send({message: 'No se encotro el comentario'})
            return res.send({message: `Se elimino el comentario ${eliminarComentario.comentario}`})    
        }else{
            return res.status(403).send({message:'No se puede eliminar un comentario que no es tuyo'})
        }

       } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al eliminar Comentario'})
        
    }
}