/* non ho avuto tempo di mettere controlli per l'indirizzo in caso si inseriscano parole o città non esistenti :( */

import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import ForecastCard from "./ForecastCard"
import tz_lookup from "tz-lookup"
import NotFound from './NotFound'
import TodaysForecastCard from "./TodaysForecastCard"



const urlApiFirstPart = 'https://api.openweathermap.org/data/2.5/weather?q='
const urlApiFirstPartForecast = 'https://api.openweathermap.org/data/2.5/forecast?q='
const urlApiSecondPart = '&appid=651b29d01268fe4ce0c1b52f6474c20e'


const CityWeather = function () {
    const [city, setCity] = useState(null)
    const [cityForecast, setCityForecast] = useState(null)
    const [immagine, setImmagine] = useState('london')

    const params = useParams()

    const kelvinToCelsius = (k) => k - 273.15
    const windPerHour =(w) => w * 3.6

  

    // fetch current weather
    const getWeather = () => {
        fetch(urlApiFirstPart + params.cityName + urlApiSecondPart)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('response not ok')
                }
            })
            .then((data) => {
                // data è un oggetto


                console.log("Data:", data)
                setCity(data) 
            })
            .catch((err) => {
                console.log('Errore nella fetch:', err)
            })
    }


    // fetch forecast

    const getForecast = () => {
        fetch(urlApiFirstPartForecast + params.cityName + urlApiSecondPart)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('response not ok')
                }
            })
            .then((data) => {
                console.log("Dati forecast ricevuti:", data)
                // lista ogni [i] è un giorno
                // data.list[i].main.temp
                // data.list[i].main.temp_min
                // data.list[i].main.temp_max
                
                // data.list[i].weather[0].description

                // data.list[i].wind.speed

                setCityForecast(data) 
            })
            .catch((err) => {
                console.log('Errore nella fetch:', err)
            })
    }

    // fetch pexels

    const getImages = () => {
        fetch('https://api.pexels.com/v1/search?query=' + params.cityName, {
            headers: {
                Authorization: 'PA3kOW0Sflfbq1yPCWPFkA7G25eRlKqJMLlfBbwmLoUxVl73IeV6p4X0'
            }
        })
        .then((response) => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error('errore prima parte, not ok')
            }
        })
        .then((data) => {
            console.log('data', data)
            // è un oggetto contentente un array di 15 oggetti.
            // data.photos[i].url oppure .src.small .portrait .medium
            // data.photo[0].src.landscape
            // ora bisogna assegnare ogni singola foto alle card che esistono già
    
            // document.getElementById("imageid").src="../template/save.png";
    
    
            if (!data.photos || data.photos.length === 0) {
                throw new Error('Nessuna foto disponibile');
            }
            
            setImmagine(data)
    
    
    
        })
        .catch((err) => {
            console.log('si è verificato un errore', err)
        })
    }

    /* filter forecast for today's weather */

    const getDateOffset = (offset) => {
    const date = new Date()
        date.setDate(date.getDate() + offset)
        return date
    }
    


    //useEffect

    useEffect(() => {
        getWeather()
        getForecast()
        getImages()
    }, [params.cityName]) 

    // condizionale per evitare errori
    if (!city) {
        return <div className="text-center p-5"><NotFound /></div>
    }
    if (!cityForecast) {
        return <div className="text-center p-5"><NotFound /></div> 
    }


    /* current date time and timezone */

    const tzCity = tz_lookup(cityForecast.city.coord.lat, cityForecast.city.coord.lon)


    const currDate = new Date()
    const formattedDate = currDate.toLocaleDateString('it-IT', {
        timeZone: tzCity,
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    const currTime = new Date().toLocaleTimeString('it-IT', {
        timeZone: tzCity,
        hour: '2-digit',
        minute: '2-digit'
    })

      /* sunrise/set hours */

    function formatSunTime(unixTime) {
        return new Date(unixTime * 1000).toLocaleTimeString('it-IT', {
            timeZone: tzCity,
            timeZone: tzCity,
            hour: '2-digit',
            minute: '2-digit'
    })}



    return (
        <Container fluid className="mx-0 p-0 text-light">
            {/* foto */}
            <Row className="mx-0 p-0 bg-row position-relative">
                <Col className="mx-0 p-0">
                    <img
                        src={immagine?.photos?.[0]?.src?.landscape ? immagine.photos[0].src.landscape : 'https://images.pexels.com/photos/6317304/pexels-photo-6317304.jpeg'}
                        className="w-100 maremma-dinamica"
                        alt={"foto " + city.name}
                    />
                </Col>
                {/* current overlay */}
                <div id="current-weather-overlay" className="d-flex flex-column position-absolute">
                    <h1 className="text-light pt-3">{city.name}</h1>
                    <div className="d-flex flex-row justify-content-between">
                        {/* temp */}
                        {/* <div className="border border-1 border-white rounded-3 p-2 bg-white bg-opacity-10"> */}
                        <div className="p-2">
                            <h4 className="fs-6 fw-light">{formattedDate} &middot; {currTime}</h4>
                            <h2 ><i className="bi bi-thermometer-half"></i>
                                <span id="current-temp">
                                    {kelvinToCelsius(city.main.temp).toFixed(0)}&deg;
                                </span>
                                C
                            </h2>
                            <p className="fs-6 p-0 m-0">Feels like:</p>
                            <h2><i className="bi bi-thermometer-half"></i>
                            {kelvinToCelsius(city.main.feels_like).toFixed(0)} &deg;C</h2>

                        </div>
                        {/* skies */}
                        <div>
                            <img
                                src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                                alt={city.weather[0].description}
                                className="weather-icon w-100"
                            />
                            <p>{city.weather[0].description} </p>
                        </div>
                    </div>
                    {/* wind - humidity - rain */}
                    <div id="wind-humidity-rain-overlay" className="d-flex flex-row text-center justify-content-between border border-1 border-white rounded-5 p-3 bg-white bg-opacity-10 w-50 mt-1 align-self-center align-self-md-start blur-effect">
                        <div>
                            <p className="fs-6 m-0"><i className="bi bi-wind"></i></p>
                            <h2 className="fs-6 m-0"> {windPerHour(city.wind.speed).toFixed(0)} km/h
                            </h2>
                        </div>
                        <div>
                            <p className="fs-6 m-0"><i className="bi bi-moisture"></i></p>
                            <h2 className="fs-6 m-0">{city.main.humidity}%</h2>
                        </div>
                        <div>
                            <p className="fs-6 m-0"><i className="bi bi-umbrella"></i></p>
                            <p className="fs-6 m-0">{city.rain ? city.rain : '0'}/h</p>
                        </div>
                    </div>
                </div>
            </Row>

            {/* next few hours today */}
            <Row className="p-3 m-0" style={{ gap: '0.5rem' }}>
                <h2>Next few hours</h2>
                <TodaysForecastCard cityForecast={cityForecast} targetDate={getDateOffset(0)} />
            </Row>


            {/* today pressure + sunrise */}

            <Row className="m-0 p-3 justify-content-around justify-content-md-center border-1 border-bottom "  style={{ gap: '0.5rem' }}>
                <Col xs={5} md={3} lg={2} className="border border-1 border-white rounded-4 bg-white bg-opacity-10 text-start p-2">
                    <p className="m-0  fs-6 m-0">Sunrise</p>
                    <p className="m-0 fs-3 text-center"><i className="bi bi-sunrise"></i> {formatSunTime(city.sys.sunrise)}</p>
                    <p className="m-0  fs-6 m-0">Sunset</p>
                    <p className="m-0 fs-3 text-center"><i className="bi bi-sunset-fill"></i> {formatSunTime(city.sys.sunset)}</p>
                </Col>
                <Col xs={5} md={3} lg={2} className="border border-1 border-white rounded-4 bg-white bg-opacity-10 text-center p-2">
                    <p className="mb-1 text-start text-center">Pressure</p>
                    <p className="m-0 text-start">Ground level</p>
                    <p className="m-0 fs-3"><i class="bi bi-cloud-fog"></i> {city.main.pressure} hPa</p>
                    <p className="m-0 text-start">Sea level</p>
                    <p className="m-0 fs-3"><i class="bi bi-tsunami"></i> {city.main.pressure} hPa</p>
                </Col>
            </Row>

            

            {/*  forecast */}

                {/* tomorrow */}
                <h5 className="pt-4 text-center m-0">Tomorrow</h5>
            <Row className="p-3 m-0 justify-content-start flex-nowrap overflow-auto" style={{ gap: '0.5rem' }}>
                <ForecastCard cityForecast={cityForecast} targetDate={getDateOffset(1)} />
            </Row>
            {/* 2 days */}
                <h5 className="pt-4 text-center m-0">{getDateOffset(2).toLocaleDateString('it-IT', {
                    timeZone: tzCity,
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}
                </h5>

            <Row className="p-3 m-0 justify-content-start flex-nowrap overflow-auto" style={{ gap: '0.5rem' }}>
                <ForecastCard cityForecast={cityForecast} targetDate={getDateOffset(2)} />
            </Row>
            {/* 3 days */}
                <h5 className="pt-4 text-center m-0">{getDateOffset(3).toLocaleDateString('it-IT', {
                    timeZone: tzCity,
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}</h5>

            <Row className="p-3 m-0 justify-content-start flex-nowrap overflow-auto" style={{ gap: '0.5rem' }}>
                <ForecastCard cityForecast={cityForecast} targetDate={getDateOffset(3)} />
            </Row>
            {/* 4 days */}
                <h5 className="pt-4 text-center m-0">{getDateOffset(4).toLocaleDateString('it-IT', {
                    timeZone: tzCity,
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}</h5>

            <Row className="p-3 m-0 justify-content-start flex-nowrap overflow-auto" style={{ gap: '0.5rem' }}>
                <ForecastCard cityForecast={cityForecast} targetDate={getDateOffset(4)} />
            </Row>

            

        </Container>
    )
}

export default CityWeather