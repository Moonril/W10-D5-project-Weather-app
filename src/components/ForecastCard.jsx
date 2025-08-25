import { Col } from 'react-bootstrap'
import tz_lookup from 'tz-lookup'


function ForecastCard({ cityForecast, targetDate, timeZone }) {

  /* timezone lookup */
  const tzCity = tz_lookup(cityForecast.city.coord.lat, cityForecast.city.coord.lon)

  const targetDateString = targetDate.toLocaleDateString('en-CA', {
    timeZone: tzCity
  }) 

  const kelvinToCelsius = (k) => k - 273.15

  const todayForecasts = cityForecast.list.filter((item) => {
    const localDate = new Date(item.dt * 1000).toLocaleDateString('en-CA', {
      timeZone: tzCity
    })
    return localDate === targetDateString
  })


  return (
    <>
      {todayForecasts.map((day, i) => {

        const localTime = new Date(day.dt * 1000).toLocaleTimeString('es-ES', {
          timeZone: tzCity,
          hour: '2-digit',
          minute: '2-digit'
        })

        return (
          <Col
            key={i}
            xs={3}
            md={2}
            className="border border-1 border-white rounded-5 p-2 bg-white bg-opacity-10 text-center m-1"
          >
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="weather-icon w-75 weather-icon-card"
            />
            <p>{localTime}</p>
            <p>{kelvinToCelsius(day.main.temp).toFixed(0)} &deg;C</p>
          </Col>
        )
      })}
    </>
  )
}

export default ForecastCard