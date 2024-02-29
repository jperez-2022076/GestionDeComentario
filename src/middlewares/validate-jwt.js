'use strict'
import  Jwt  from 'jsonwebtoken'
import userModel from '../user/user.model.js'

export const validateJwt = async(req,res,next)=>{
    try {
        let secretKey = process.env.SECRET_KEY
        let{token} = req.headers
        if(!token) return res.status(401).send({message: 'No autorizado'})
        let {uid}= Jwt.verify(token,secretKey)
        let user =await userModel.findOne({_id:uid})
        if(!user) return res.status(404).send({message: 'Usuario no encontrado - No autorizado' })
        req.user = user
        next()
    } catch (err) {
        console.log(err)
        return res.status(401).send({message: 'Token invalido o esta expirado'})
    }
}

