import axios from 'axios'

// constantes

const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: []
}

// types

const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'

// reducer

export default function pokemonReducer (state = dataInicial, action) {

    switch(action.type) {
        case OBTENER_POKEMONES_EXITO:
            return {...state, ...action.payload}
        default:
            return state
    }

}

// acciones

export const obtenerPokemonesAccion = () => async (dispatch, getState) => {

    try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        })
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }

}