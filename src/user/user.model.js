import { Schema, model } from "mongoose"

const UserSchema = Schema({
    nombre:{
        type:String,
        required: true
    },
    apellido:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    usuario:{
        type:String,
        unique: true,
        lowarCase: true,
        required:true
    },
    contraseña:{
        type:String,
        minLenght:[8,'Contraseña muy pequeña'],
        required: true
    },
    telefono:{
        type:String,
        minLenght:8,
        required:true
    },
    estado:{
        type:Boolean,
        default: true,
        required:true
    }
})

export default model('User',UserSchema)