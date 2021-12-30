import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { accesoUsuarioAccion } from '../redux/UsuarioDucks'
import { withRouter } from 'react-router-dom'

const Login = (props) => {

    const dispatch = useDispatch()
    const {loading, activo} = useSelector(store => store.usuarios)

    React.useEffect(() => {
        if (activo) {
            props.history.push('/')
        }
    }, [activo])

    return (
        <div className='container mt-5'>
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <h3 className='lead'>Acceso de Usuario</h3>
                    <button disabled={loading} onClick={() => dispatch(accesoUsuarioAccion())} className='btn btn-primary btn-md btn-block mt-3'>Acceder</button>
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(Login)
