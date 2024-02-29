'use strict'

import mongoose from "mongoose"

export const connect = async()=>{
    try {
        return await mongoose.connect('mongodb://127.0.0.1:27017/GestorDeOpiniones2020076')
    } catch (err) {
        console.error('No se pudo conectar la base de datos',err)
    }
}