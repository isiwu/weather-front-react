import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
//import { Counter } from './features/counter/Counter';
//import Home from './views/Home';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import awLogo from "./assets/image/aw-logo.jpg"
import loading from "./assets/image/loading-icon.gif";
import './assets/css/App.css';
import SearchInput from './components/SearchInput';
import store from "./store/index";
import axios from 'axios';

function App() {
  const [state, setstate] = useState(store.getState()),
    location = useLocation(),
    navigate = useNavigate();

  const dispatchAction = (data) => {
    store.dispatch({
      type: "LOADING_PENDING",
      payload: { loading: true },
    })

    axios.get("/api/location/key", {
      params: { location: data },
      withCredentials: true,
    })
    .then((response) => {
      store.dispatch({
        type: "GET_FORECASTS",
        city: data,
        todayForecast: response.data.currentForecast,
        dailyForecasts: response.data.dailyForecasts,
      });

      store.dispatch({
        type: "LOADING_COMPLETE",
        payload: { loading: false }
      })
    })
    .then(() => {
      if (state.dailyForecasts.length > 0) {
        navigate("/weather-forecast");
      } else {
        navigate("/");
      }
    })
    .catch(() => {
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
  };

  const onEnterKeyHandle = (evt, input) => {
    if (evt.key === "Enter") {
      dispatchAction(input);
    }
  };

  useEffect(() => {
    function handleStateUpdate() {
      setstate(store.getState());
    }

    const unsubscribe = store.subscribe(handleStateUpdate);
    return () => {
      unsubscribe();
    }
  }, [state]);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <Link to={"/"} className="navbar-brand">Weather</Link>
        { location.pathname !== "/" && <SearchInput cssClass="small input" onEnterKey={onEnterKeyHandle} container={true} />}
      </nav>
      { state.serverError && <div className="alert alert-danger mb-0">
        Server busy. Try again!
      </div>}
      <main className={location.pathname === "/"?"content home py-5":"content py-5"}>
        { state.loading !== true ? <Outlet /> : 
          <img src={loading}
            alt="loading"
            className="loading-image"
          />
        }
      </main>
      <footer>
        <p className="bg-dark text-white p-4">
        <span className="copyright">Copyright &copy; Nigeria Weather Info</span>
          { location.pathname !== "/" && <span className="powered-by ml-1"><span className="text-success font-weight-bold">|</span> Powered by <img src={awLogo} alt="accurate weather logo" width="120"
            /></span>
          }
        </p>
      </footer>
    </div>
  );
}

export default App;