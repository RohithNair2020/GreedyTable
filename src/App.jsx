import { Provider } from "react-redux";
import "./App.css";
import AnalyticsBoard from "./components/AnalyticsBoard/AnalyticsBoard";
import store from "./Redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <img
          className="greedy-logo"
          src="/greedyLogo.png"
          alt="Greedy Game Logo"
        />
        <AnalyticsBoard></AnalyticsBoard>
      </div>
    </Provider>
  );
}

export default App;
