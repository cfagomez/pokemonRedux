import React from 'react'
import { useSelector } from 'react-redux'

const DetallePokemon = () => {

    const detallePokemon = useSelector(store => store.pokemones.detallePokemon)

    return (
        <div>
            <div className="card">
                <img src={detallePokemon.imagen} className="card-img-top" alt={detallePokemon.nombre}/>
                <div className="card-body text-center">
                    <p className="card-text">
                        {detallePokemon.nombre} | {detallePokemon.habilidad}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DetallePokemon
