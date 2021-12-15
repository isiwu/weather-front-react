import React from "react";
import store from "../store/index";
import { Provider } from "react-redux";
import App from "../App";
import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import WeatherForecast from "../views/WeatherForecast";

const AppRoutes = () => (
  <Routes>
    <Route
      path="/" 
      element={
        <React.StrictMode>
          <Provider store={store}>
            <App />
          </Provider>
        </React.StrictMode>
      }
    >
      <Route path="weather-forecast" element={ <WeatherForecast /> } />
      <Route index element={ <Home /> } />
    </Route>
  </Routes>
)

export default AppRoutes