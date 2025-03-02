import React from "react";
import ReactDOM from "react-dom/client";
import './css/index.css';
import App from "./App.jsx";
import Header from "./components/header.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Header />
    <App />
  </React.StrictMode>
);