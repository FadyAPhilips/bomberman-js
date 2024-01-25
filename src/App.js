import store from "./redux/store";
import { Provider } from "react-redux";

import Game from "./engine/Game";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Game />
      </Provider>
    </div>
  );
}

export default App;
