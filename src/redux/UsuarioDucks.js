import firebase from "firebase"
import { auth } from "../firebase"

// constantes

const dataInicial = {
    loading: false,
    activo: false
}

// types

const ACCESO_USUARIO_EXITO = 'ACCESO_USUARIO_EXITO'
const ACCESO_USUARIO_ERROR = 'ACCESO_USUARIO_ERROR'
const LOADING = 'LOADING'
const CERRAR_SESION = 'CERRAR_SESION'

// reducer

export default function usuarioReducer (state=dataInicial, action) {
    switch(action.type) {
        case ACCESO_USUARIO_EXITO:
            return {...state, user: action.payload, loading: false, activo: true}
        case ACCESO_USUARIO_ERROR:
            return {...dataInicial}
        case LOADING:
            return {...state, loading: true}
        case CERRAR_SESION:
            return {...dataInicial}
        default:
            return {...state}
    }
}

// acciones

export const accesoUsuarioAccion = () => async (dispatch, getState) => {

    dispatch({
        type: LOADING
    })

    try {
        const provider = new firebase.auth.GoogleAuthProvider()
        const res = await auth.signInWithPopup(provider)
        dispatch({
            type: ACCESO_USUARIO_EXITO,
            payload: {
                user: res.user.email,
                uid: res.user.uid
            }
        })
        localStorage.setItem('usuario', JSON.stringify({
            user: res.user.email,
            uid: res.user.uid
        }))
        console.log(res)
    } catch (error) {
        dispatch({
            type: ACCESO_USUARIO_ERROR
        })
        console.log(error)
    }
}

export const leerUsuarioAccion = () => (dispatch) => {

    if (JSON.parse(localStorage.getItem('usuario'))) {
        dispatch({
            type: ACCESO_USUARIO_EXITO,
            payload: JSON.parse(localStorage.getItem('usuario'))
        })
    }

}

export const cerrarSesionAccion = () => async (dispatch) => {

    try {
        await auth.signOut()
        dispatch({
            type: CERRAR_SESION
        })
        localStorage.removeItem('usuario')
    } catch (error) {
        console.log(error)
    }

}