import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import pokemonReducer from './PokemonesDucks'
import usuarioReducer, { leerUsuarioAccion } from './UsuarioDucks'
 
const rootReducer = combineReducers({
    pokemones: pokemonReducer,
    usuarios: usuarioReducer
})
 
export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    leerUsuarioAccion()(store.dispatch)
    return store
}