import store from "./redux/store";
import { Provider } from "react-redux";
import Game from "./engine/reactComponents/Game";
import DevToolsDash from "./devTools/UI/devToolsDash";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Game />
        <DevToolsDash />
      </Provider>
    </div>
  );
}

export default App;
