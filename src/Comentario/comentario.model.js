import { Schema, model } from "mongoose"

const comentarioSchema = Schema({
    comentario:{
        type:String,
        required: true
    },
    publicacion:{
        type: Schema.ObjectId,
        ref: 'publicacion',
        required: true
    },
    user:{
        type:Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

export default model('comentario',comentarioSchema)