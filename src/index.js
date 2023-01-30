import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import "./styles/index.css";
import { GlobalProvider } from "./contexts/globalState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <RequireAuth>
                <App />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  </AuthProvider>
);
