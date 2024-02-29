'use strict'
import { Router } from "express"
import { actualizarPublicacion, agregarPublicacion, eliminarPublicacion } from "./publicacion.controller.js"
import {  validateJwt } from "../middlewares/validate-jwt.js"

const api = Router()
api.post('/agregarPublicacion',[validateJwt],agregarPublicacion)
api.put('/actualizarPublicacion/:uid',[validateJwt],actualizarPublicacion)
api.delete('/eliminarActualizar/:uid',[validateJwt],eliminarPublicacion)

export default api

