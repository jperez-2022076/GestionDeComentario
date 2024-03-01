'use strict'
import { Router } from "express"
import { actualizarPublicacion, agregarPublicacion, eliminarPublicacion, listarPublicacion } from "./publicacion.controller.js"
import {  validateJwt } from "../middlewares/validate-jwt.js"

const api = Router()
api.get('/listarPublicacion',listarPublicacion)
api.post('/agregarPublicacion',[validateJwt],agregarPublicacion)
api.put('/actualizarPublicacion/:uid',[validateJwt],actualizarPublicacion)
api.delete('/eliminarActualizar/:uid',[validateJwt],eliminarPublicacion)

export default api

