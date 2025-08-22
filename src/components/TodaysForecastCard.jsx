import { Col, Row } from 'react-bootstrap'
import tz_lookup from 'tz-lookup'


function TodaysForecastCard({ cityForecast, targetDate, timeZone }) {

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

  const windPerHour =(w) => w * 3.6


  return (
    <>
      {todayForecasts.map((day, i) => {

        const localTime = new Date(day.dt * 1000).toLocaleTimeString('es-ES', {
          timeZone: tzCity,
          hour: '2-digit',
          minute: '2-digit'
        })

        return (
          <Row key={i} className="mx-0 p-1 justify-content-between text-center  border border-1 border-white rounded-4 bg-white bg-opacity-10 blur-effect pe-2">


            <Col xs={2} md={2} className="p-1 align-content-center">
              <h2 className='fs-6'>{localTime}</h2>      
            </Col>
            <Col xs={2} md={2} className="p-1 align-content-center">
              <h2 className='fs-6'><i className="bi bi-thermometer-half"></i>
              {kelvinToCelsius(day.main.temp).toFixed(0)}&deg;C</h2>      
            </Col>
            <Col xs={2} md={2} className="p-1 align-content-center">
                    <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="weather-icon w-100 weather-icon-card"
            />
            </Col>
            <Col xs={2} md={2} className="p-1 align-content-center">
              <p className="p-0 m-0 fs-6">Venti:</p>
              <h2 className='fs-6'>{windPerHour(day.wind.speed).toFixed(1)} <i className="bi bi-wind"></i>
              </h2>
            </Col>
            <Col xs={2} md={2} className="p-1 align-content-center">
              <p className="fs-6 p-0 m-0">Umidità:</p>
              <h2 className='fs-6'>{day.main.humidity}% <i className="bi bi-droplet"></i> </h2>
            </Col>
          </Row>
        )
      })}
    </>
  )
}

export default TodaysForecastCard