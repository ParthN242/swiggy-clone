import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import SocketIo from "./Context/SocketIo.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SocketIo>
      <App />
    </SocketIo>
  </Provider>
);
