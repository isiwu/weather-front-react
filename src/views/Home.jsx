import React, { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import store from "../store/index";
import "../assets/css/Home.css"
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [state, setState] = useState(store.getState()),
  navigate = useNavigate(),
  location = useLocation();

  const onEnterKeyHandle = (evt, input) => {
    if (evt.key === "Enter") {
      store.dispatch({
        type: "LOADING_PENDING",
        payload: { loading: true },
      })

      axios.get("/api/location/key", {
        params: { location: input },
        withCredentials: true,
        baseURL: "https://react-weather-isiwu.herokuapp.com/",
      })
      .then((response) => {
        store.dispatch({
          type: "GET_FORECASTS",
          city: input,
          todayForecast: response.data.currentForecast,
          dailyForecasts: response.data.dailyForecasts,
        });

        store.dispatch({
          type: "LOADING_COMPLETE",
          payload: { loading: false }
        })
      })
      .catch(() => {
        console.log("server error");
        store.dispatch({
          type: "SERVER_ERROR",
          payload: { serverError: true }
        });
  
        store.dispatch({
          type: "LOADING_COMPLETE",
          payload: { loading: false }
        });
  
        navigate("/");
      })
    }
  }

  useEffect(() => {
    function handleStateUpdate() {
      setState(store.getState());
    }

    const unsubscribe = store.subscribe(handleStateUpdate);
    return () => {
      unsubscribe();
    }
  }, [location])

  return(
    <div className="home">
      {state.dailyForecasts.length > 0 && <Navigate to="weather-forecast" replace={false} /> }
      <h3 className="text-white">Weather Info</h3>
      <SearchInput cssClass="big input" onEnterKey={onEnterKeyHandle} container={false} />
    </div>
  );
}

export default Home;