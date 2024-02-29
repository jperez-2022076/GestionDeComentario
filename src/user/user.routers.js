'use strict'
import { Router } from "express"
import { actualizar, agregarUser, eliminarUser, login, test } from "./user.controller.js"
import {  validateJwt } from "../middlewares/validate-jwt.js"

const api = Router()

api.get('/test',test)
api.post('/agregarUsuario',agregarUser)
api.post('/login',login)
api.put('/actualizar/:uid',[validateJwt],actualizar)
api.put('/eliminarUser/:uid',[validateJwt],eliminarUser)


export default api 