import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from './redux/store';
import { Provider as AlertProvider, transitions, positions} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const root = ReactDOM.createRoot(document.getElementById("root"));

const options = {
   timeout: 3000,
   position: positions.TOP_LEFT,
   transition: transitions.FADE,
   offset: "30px"
}
root.render(
   <Provider store={store}>
     <AlertProvider template={AlertTemplate}{...options} >
     <App />
     </AlertProvider>
   </Provider>
);
