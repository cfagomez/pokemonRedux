import firebase from "firebase"
import { auth, db, storage } from "../firebase"

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

        const usuarioExistente = await db.collection('usuarios').doc(res.user.email).get()

        console.log(usuarioExistente)

        if (usuarioExistente.exists) {
            
            dispatch({
                type: ACCESO_USUARIO_EXITO,
                payload: usuarioExistente.data()
            })

            localStorage.setItem('usuario', JSON.stringify(usuarioExistente.data()))

        } else {

            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid,
                username: res.user.displayName,
                photo: res.user.photoURL
            })

            dispatch({
                type: ACCESO_USUARIO_EXITO,
                payload: {
                    email: res.user.email,
                    uid: res.user.uid,
                    username: res.user.displayName,
                    photo: res.user.photoURL
                }
            })
            localStorage.setItem('usuario', JSON.stringify({
                email: res.user.email,
                uid: res.user.uid,
                username: res.user.displayName,
                photo: res.user.photoURL
            }))

        }

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

export const editarUsernameAccion = (username) => async (dispatch, getState) => {

    dispatch({
        type: LOADING
    })

    const usuario = getState().usuarios.user

    try {

        await db.collection('usuarios').doc(usuario.email).update({
            username: username
        })

        dispatch({
            type: ACCESO_USUARIO_EXITO,
            payload: {
                ...usuario, username: username
            }
        })

        localStorage.setItem('usuario', JSON.stringify({
            ...usuario, username: username
        }))

    } catch (error) {

        console.log(error)

    }

}

export const editarFotoPerfilAccion = (imagen) => async (dispatch, getState) => {

    dispatch({
        type: LOADING
    })

    const usuario = getState().usuarios.user

    try {

        const imagenRef = storage.ref().child(usuario.email).child('foto_perfil')
        await imagenRef.put(imagen)
        const imagenURL = await imagenRef.getDownloadURL()

        await db.collection('usuarios').doc(usuario.email).update({
            photo: imagenURL
        })

        dispatch({
            type: ACCESO_USUARIO_EXITO,
            payload: {
                ...usuario, photo: imagenURL
            }
        })

        localStorage.setItem('usuario', JSON.stringify({
            ...usuario, photo: imagenURL
        }))

    } catch (error) {
        console.log(error)
    }

}