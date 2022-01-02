import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import { cerrarSesionAccion } from '../redux/UsuarioDucks'
import { withRouter } from 'react-router-dom'

const Navbar = (props) => {

    const dispatch = useDispatch()
    const {activo} = useSelector(store => store.usuarios)

    const cerrarSesion = () => {
        dispatch(cerrarSesionAccion())
        props.history.push('login')
    }

    return (
        <div className="navbar navbar-light bg-light">
            <div className="container">
                <Link className='navbar-brand' to="/">Pokemon App</Link>
                <div className="d-flex">
                    {
                        activo ? (
                            <>
                                <NavLink className="btn btn-light mx-2" to="/" exact>Inicio</NavLink>
                                <NavLink className="btn btn-light mx-2" to="/perfil" exact>Perfil</NavLink>
                                <button className='btn btn-light mx-2' onClick={() => cerrarSesion()}>Cerrar Sesion</button>
                            </>
                        ) : (
                            <NavLink className="btn btn-light mx-2" to="/login" exact>Login</NavLink>
                        )
                    }
            
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)
