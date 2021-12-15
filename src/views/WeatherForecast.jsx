import React, { Component, Fragment } from "react";
//import {store} from "../app/store"
import ForecastToday from "../components/ForecastToday";
import ForecastsDaily from "../components/ForecastsDaily";
import store from "../store/index";

class WeatherForecast extends Component {
  toCelsius = (fahrenheit) => parseInt((fahrenheit - 32)*5 / 9)
  toKilometre = (mile) => parseInt(mile * 1.609344)
  forecastDate = (dateTime) => {
    const indexOfT = dateTime.indexOf("T");
    return dateTime.slice(0, indexOfT);
  }
  date = (date) => new Date(date).toLocaleDateString()
  dayInNumber = (date) => new Date(date).getDay()
  day = (date) => {
    const weeks = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    return weeks[this.dayInNumber(date)];
  }

  render() {
    const state = store.getState();
    
    return (
      <Fragment>
        <ForecastToday
          city={state.city}
          todayForecast={state.todayForecast}
          toCelsius={this.toCelsius}
          toKilometre={this.toKilometre}
          forecastDate={this.forecastDate}
          date={this.date}
          day={this.day}
        />
        <ForecastsDaily
          dailyForecasts={state.dailyForecasts}
          todayForecast={state.todayForecast}
          toCelsius={this.toCelsius}
          forecastDate={this.forecastDate}
          day={this.day}
        />
      </Fragment>
    )
  }
}

export default WeatherForecast;