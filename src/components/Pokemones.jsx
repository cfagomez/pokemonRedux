import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { anteriorPokemonAccion, obtenerPokemonesAccion, siguientePokemonAccion, detallePokemonAccion } from '../redux/PokemonesDucks'
import DetallePokemon from './DetallePokemon'

const Pokemones = () => {

    const dispatch = useDispatch()
    const pokemones = useSelector(store => store.pokemones.results)
    const previous = useSelector(store => store.pokemones.previous)
    const next = useSelector(store => store.pokemones.next)

    return (
        <div className='container mt-3'>
            <div className="row">
                <div className="col-md-6 text-center">
                    <h3 className='lead text-center'>Lista de Pokemones</h3>
                    <ul className='list-group mt-3'>
                        {
                            pokemones ? (
                                pokemones.map(item => (
                                    <li key={item.url} className='list-group-item'>
                                        {item.name}
                                        <button onClick={() => dispatch(detallePokemonAccion(item.url))} className='btn btn-success btn-sm float-end'>Info</button>
                                    </li>
                                ))
                            ) : (
                                null
                            )
                        }
                    </ul>
                    <div className="btn-group mt-3" role="group" aria-label="Basic example">
                        {
                            next ? (
                                <button onClick={() => dispatch(siguientePokemonAccion())} className='btn btn-danger btn-md mx-2'>Siguiente</button>
                            ) : (
                                null
                            )
                        }
                        {
                            pokemones.length === 0 ? (
                                <button onClick={() => dispatch(obtenerPokemonesAccion())} className='btn btn-danger btn-md mx-2'>Obtener</button>
                            ) : (
                                null
                            )
                        }
                        {
                            previous ? (
                                <button onClick={() => dispatch(anteriorPokemonAccion())} className='btn btn-danger btn-md mx-2'>Anterior</button>
                            ) : (
                                null
                            )
                        }
                        
                    </div>
                    
                    
                </div>
                <div className="col-md-6">
                    <h3 className='lead text-center'>Detalle de Pokemon</h3>
                        <DetallePokemon />
                </div>
            </div>
        </div>
    )
}

export default Pokemones
