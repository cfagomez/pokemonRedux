import axios from 'axios'

// constantes

const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: [],
    detallePokemon: []
}

// types

const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'
const ANTERIOR_POKEMONES_EXITO = 'ANTERIOR_POKEMONES_EXITO'
const DETALLE_POKEMON_EXITO = 'DETALLE_POKEMON_EXITO'

// reducer

export default function pokemonReducer (state = dataInicial, action) {

    switch(action.type) {
        case OBTENER_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case SIGUIENTE_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case ANTERIOR_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case DETALLE_POKEMON_EXITO:
            return {...state, detallePokemon: action.payload}
        default:
            return state
    }

}

// acciones

export const obtenerPokemonesAccion = () => async (dispatch, getState) => {

    if (localStorage.getItem('offset=0')) {
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
        console.log('Datos obtenidos desde LocalStorage')
        return
    }

    try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem('offset=0', JSON.stringify(res.data))
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }

}

export const siguientePokemonAccion = () => async (dispatch, getState) => {

    const next = getState().pokemones.next

    if (localStorage.getItem(next)) {
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(next))
        })
        console.log('Datos obtenidos desde LocalStorage')
        return
    }

    try {
        const res = await axios.get(next)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem(next , JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
    
}

export const anteriorPokemonAccion = () => async (dispatch, getState) => {

    const previous = getState().pokemones.previous

    if (localStorage.getItem(previous)) {
        dispatch({
            type: ANTERIOR_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(previous))
        })
        console.log('Datos obtenidos desde LocalStorage')
        return
    }

    try {
        const res = await axios.get(previous)
        dispatch({
            type: ANTERIOR_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem(previous , JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }

}

export const detallePokemonAccion = (url) => async (dispatch, getState) => {

    if (localStorage.getItem(url)) {

        dispatch({
            type: DETALLE_POKEMON_EXITO,
            payload: JSON.parse(localStorage.getItem(url))
        })
        console.log('Obteniendo desde LocalStorage')
        return
    }

    try {
        const res = await axios.get(url)
        dispatch({
            type: DETALLE_POKEMON_EXITO,
            payload: {
                nombre: res.data.name,
                habilidad: res.data.abilities[0].ability.name,
                imagen: res.data.sprites.front_default
            }
        })
        console.log('Obteniendo desde API')
        localStorage.setItem(url, JSON.stringify({
            nombre: res.data.name,
            habilidad: res.data.abilities[0].ability.name,
            imagen: res.data.sprites.front_default
        }))
    } catch (error) {
        console.log(error)
    }

}