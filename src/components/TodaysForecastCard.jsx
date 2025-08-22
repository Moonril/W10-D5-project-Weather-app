import { Col, Row } from 'react-bootstrap'
import { FaArrowUp } from 'react-icons/fa'
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

        const windDirectionText = (deg)=>{
          const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
          const index = Math.round(deg /45) % 8
          return directions[index]
        }

        return (
          <Row key={i} className="mx-0 p-1 justify-content-between text-center  border border-1 border-white rounded-4 bg-white bg-opacity-10 blur-effect pe-2">


            <Col xs={2} md={2} className="p-1 align-content-center">
              <h2 className='fs-6 text-current-weather-size-in-lg'>{localTime}</h2>      
            </Col>
            <Col xs={2} md={2} className="p-1 align-content-center">
              <h2 className='fs-6 text-current-weather-size-in-lg'><i className="bi bi-thermometer-half"></i>
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
              <p className="p-0 m-0 fs-6 text-current-weather-size-in-lg">Venti:</p>
              
              <h2 className='fs-6 text-current-weather-size-in-lg'>{windPerHour(day.wind.speed).toFixed(0)} km/h <FaArrowUp style={{ transform: `rotate(${day.wind.deg}deg)` }} />
              </h2>
            </Col>
            <Col xs={2} md={2} className="p-1 align-content-center">
              <p className="fs-6 p-0 m-0 text-current-weather-size-in-lg">Umidità:</p>
              <h2 className='fs-6 text-current-weather-size-in-lg'>{day.main.humidity}% <i className="bi bi-droplet"></i> </h2>
            </Col>
          </Row>
        )
      })}
    </>
  )
}

export default TodaysForecastCard