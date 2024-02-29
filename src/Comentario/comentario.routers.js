'use strict'
import { Router } from "express"
import {  validateJwt } from "../middlewares/validate-jwt.js"
import { actualizarComentario, agregarComentario, eliminarComentario, test } from "./comentario.controller.js"

const api = Router()

api.get('/testComentario',test)
api.post('/agregarComentario',[validateJwt],agregarComentario)
api.put('/actualizarComentario/:uid',[validateJwt],actualizarComentario)
api.delete('/eliminarComentario/:uid',[validateJwt],eliminarComentario)
export default api
