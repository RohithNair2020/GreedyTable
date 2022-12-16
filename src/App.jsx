import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AnalyticsBoard from "./components/AnalyticsBoard/AnalyticsBoard";
import store from "./Redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <a href="https://greedygame.com/">
          <img
            className="greedy-logo"
            src="/greedyLogo.png"
            alt="Greedy Game Logo"
          />
        </a>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AnalyticsBoard />}>
              <Route index path="analytics" element={<AnalyticsBoard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
