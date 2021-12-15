import React from 'react';
import "../assets/css/ForecastToday.css";

const ForecastToday = ({
    city, todayForecast, toCelsius, toKilometre, forecastDate, date, day
  }) => {
  return (
    <section className="today-forecast bg-light pt-3 mb-5">
      <div className="d-flex flex-wrap justify-content-between px-4">
        <div className="city">
          <h4 className="title">{ city } Weather</h4>
        </div>
        <div className="date">
          <span className="font-weight-bold pr-4">{ day(forecastDate(todayForecast.DateTime)) }</span>
          <span className="font-weight-bold">{ date(forecastDate(todayForecast.DateTime)) }</span>
        </div>
      </div>
      <div className="info d-flex flex-wrap justify-content-around pt-2">
        <section>
          <img
            src={`${process.env.PUBLIC_URL}/weather-icon-${todayForecast.WeatherIcon}.png`}
            alt="weather-icon"
            width="150"
          />
          <p className="description">{ todayForecast.IconPhrase }</p>
        </section>
        <section className="pt-3 container-table">
          <table className="table">
            <tbody>
              <tr className="py-0">
                <td className="text-left">Temperature</td>
                <td className="text-right">
                  { toCelsius(todayForecast.Temperature.Value) }&deg;C
                </td>
              </tr>
              <tr>
                <td className="text-left">FeelLike</td>
                <td className="text-right">
                  { toCelsius(todayForecast.RealFeelTemperature.Value) }&deg;C
                </td>
              </tr>
              <tr>
                <td className="text-left">Humidity</td>
                <td className="text-right">{ todayForecast.RelativeHumidity }%</td>
              </tr>
              <tr>
                <td className="text-left">Visibility</td>
                <td className="text-right">
                  { toKilometre(todayForecast.Visibility.Value) }KM
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </section>
  )
};

export default ForecastToday;