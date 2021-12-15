import React from "react";
import "../assets/css/ForecastsDaily.css";

const ForecastsDaily = ({
    dailyForecasts, todayForecast, toCelsius, forecastDate, day
  }) => (
  <section className="daily-forecast bg-light">
    <h3 className="title text-left pl-4 pl-md-5 py-3">Daily Forecasts</h3>
    <div className="d-flex flex-wrap justify-content-center">
      {
        dailyForecasts.map((forecast, index) => (
          <section className="day-forecast" key={index}>
            <h4 className={ index === 0 ? "day text-success" : "day" }>
              { day(forecastDate(forecast.Date))}
            </h4>
            { index !== 0 ? 
              <p className="icon">
                <img 
                  src={`${process.env.PUBLIC_URL}/weather-icon-${forecast.Day.Icon}.png`}
                  alt="weather-icon"
                  width="45"
                />
              </p>
                :
              <p className="icon">
                <img 
                  src={`${process.env.PUBLIC_URL}/weather-icon-${todayForecast.WeatherIcon}.png`}
                  alt="weather-icon"
                  width="45"
                />
              </p>
            }
            <p className="temperature"><span className="font-weight-bold">
              {
                index !== 0 ? 
                 toCelsius(forecast.Temperature.Maximum.Value)
                  :
                 toCelsius(todayForecast.Temperature.Value)
              }
              </span>&deg;C / <span>{ toCelsius(forecast.Temperature.Minimum.Value) }</span>&deg;C
            </p>
          </section>
        ))
      }
    </div>
  </section>
)

export default ForecastsDaily;