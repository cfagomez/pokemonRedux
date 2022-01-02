import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editarFotoPerfilAccion, editarUsernameAccion } from '../redux/UsuarioDucks'

const Perfil = () => {

    const usuario = useSelector(store => store.usuarios.user)
    const loading = useSelector(store => store.usuarios.loading)
    const dispatch = useDispatch()

    const [username, setUsername] = React.useState(usuario.username)
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [error, setError] = React.useState(null)

    const editarUsername = () => {

        if (!username.trim()) {
            console.log('Campo vacio')
            return
        }

        dispatch(editarUsernameAccion(username))

        setModoEdicion(false)

    }

    const seleccionarArchivo = (e) => {

        if (e.target.files[0] === "undefined") {
            console.log('No se ha seleccionado imagen')
        }

        if(e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/jpg" || e.target.files[0].type === "image/png") {
            dispatch(editarFotoPerfilAccion(e.target.files[0]))
            setError(false)
        } else {
            setError(true)
        }

    }
 
    return (
        <div className='row justify-content-center mt-5'>
            <div className="col-md-6 text-center">
                <div className="card">
                    <img src={usuario.photo} className="card-img-top" alt="foto-perfil" />
                    <div className="card-body">
                        <p className="card-text">{usuario.username}</p>
                        <button onClick={() => setModoEdicion(true)} className='btn btn-dark'>Editar nombre</button>

                        <div className="custom-file">
                            <input disabled={loading} onChange={(e) => seleccionarArchivo(e)} type="file" className='custom-file-input' id='inputGroupFile01' style={{display: 'none'}}/>
                            <label className={loading ? (
                                'btn btn-dark mt-2 disabled'
                            ) : (
                                'btn btn-dark mt-2 '
                            )} htmlFor="inputGroupFile01">Seleccionar archivo</label>
                        </div>

                    </div>
                </div>
                {
                    modoEdicion ? (
                        <div className='card mt-2'>
                            <div className="card-body">
                                <input className='form-control mt-3' onChange={(e) => setUsername(e.target.value)} type="text" value={username} />

                                <button onClick={() => editarUsername()} className='btn btn-dark mt-2'>Editar</button>
                            </div>
                        </div>
                    ) : (
                        null
                    )
                }
                
            </div>  
        </div>
    )
}

export default Perfil
