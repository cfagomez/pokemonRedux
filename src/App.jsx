import { Provider } from "react-redux";
import Pokemones from "./components/Pokemones";
import generateStore from "./redux/store";

function App() {

  const store = generateStore()

  return (
    <Provider store={store}>
      <div className="container">
      <Pokemones />
      </div>
    </Provider>
    
  );
}

export default App;
