import { compare, hash } from "bcrypt"

export const encriptar = async(contraseña)=>{
    try {
        return await hash(contraseña,10)
    } catch (err) {
        return err
        
    }
}

export const verificarContraseña = async(contraseña,hash)=>{
    try {
        return await compare(contraseña,hash)
    } catch (err) {
        return err
    }
}

/* export const verificarActualizacion = (datos, userId) => {
    if (userId) {
        if (
            Object.entries(datos).length === 0 ||
            (typeof datos.user !== 'undefined' && datos.user !== '')
        ) {
            // Si se intenta actualizar el campo user, retorna false
            return { allowUpdate: false, message: 'No se puede actualizar el campo user' };
        }
        return { allowUpdate: true };
    }
    return { allowUpdate: false, message: 'No se proporcionó el userId' };
};
 */