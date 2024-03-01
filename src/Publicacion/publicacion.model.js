import { Schema, model } from "mongoose"

const publicacionSchema = Schema({
    titulo:{
        type:String,
        requed:true
    },
    categoria:{
        type:Schema.ObjectId,
        ref:'categoria',
        required: true
    },
    textoPrincipal:{
        type:String,
        required:true
    },
    user:{
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

export default model('publicacion',publicacionSchema)