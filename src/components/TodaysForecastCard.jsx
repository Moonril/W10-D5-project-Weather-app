import { Col } from 'react-bootstrap'

function TodaysForecastCard({ cityForecast }) {
  const today = new Date()
  const todayDateString = today.toLocaleDateString('en-CA', {
    timeZone: 'Europe/Madrid'
  }) // formato YYYY-MM-DD

  const kelvinToCelsius = (k) => k - 273.15

  const todayForecasts = cityForecast.list.filter((item) => {
    const localDate = new Date(item.dt * 1000).toLocaleDateString('en-CA', {
      timeZone: 'Europe/Madrid'
    })
    return localDate === todayDateString
  })

  return (
    <>
      {todayForecasts.map((day, i) => {
        const localTime = new Date(day.dt * 1000).toLocaleTimeString('es-ES', {
          timeZone: 'Europe/Madrid',
          hour: '2-digit',
          minute: '2-digit'
        })

        return (
          <Col
            key={i}
            xs={4}
            className="border border-1 border-white rounded-5 p-2 bg-white bg-opacity-10 text-center"
          >
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="weather-icon w-25"
            />
            <p>{localTime}</p>
            <p>{kelvinToCelsius(day.main.temp).toFixed(0)} &deg;C</p>
          </Col>
        )
      })}
    </>
  )
}

export default TodaysForecastCard