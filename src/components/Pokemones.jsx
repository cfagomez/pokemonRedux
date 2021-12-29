import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPokemonesAccion } from '../redux/PokemonesDucks'

const Pokemones = () => {

    const dispatch = useDispatch()
    const pokemones = useSelector(store => store.pokemones.results)

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
                                        <button className='btn btn-success btn-sm float-end'>Info</button>
                                    </li>
                                ))
                            ) : (
                                null
                            )
                        }
                    </ul>
                    <button onClick={() => dispatch(obtenerPokemonesAccion())} className='btn btn-danger btn-sm btn-block mt-3'>Obtener</button>
                </div>
                <div className="col-md-6">
                <h3 className='lead text-center'>Detalle de Pokemon</h3>
                </div>
            </div>
        </div>
    )
}

export default Pokemones
