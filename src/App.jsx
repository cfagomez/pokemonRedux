import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Pokemones from "./components/Pokemones";
import { auth } from "./firebase";
import React from 'react'

function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(null)

  React.useEffect(() => {

    const fetchUsuario = () => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setFirebaseUser(user)
        } else {
          setFirebaseUser(false)
        }
      })
    }

    fetchUsuario()

  }, [])

  const RutaPrivada = ({component, path, ...rest}) => {
    if (localStorage.getItem('usuario')) {
      const usuarioLocalStorage = JSON.parse(localStorage.getItem('usuario'))
      if (usuarioLocalStorage.uid === firebaseUser.uid) {
        return <Route component={component} path={path} {...rest}/>
      } else {
        return <Redirect to='/login' {...rest} />
      }
    } else {
      return <Redirect to='/login' {...rest} />
    }
  }

  return firebaseUser !== null ? (
    <Router>
      <Navbar />
      <Switch>
        <RutaPrivada component={Pokemones} path="/" exact/>
        <Route component={Login} path="/login" exact />
      </Switch>
    </Router>
    
  ) : (
    <p>Cargando...</p>
  )
}

export default App;
