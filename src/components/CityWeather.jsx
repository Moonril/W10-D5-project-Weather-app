import { useEffect, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { Sun } from "react-bootstrap-icons"

const urlApiFirstPart = 'https://api.openweathermap.org/data/2.5/weather?q='
const urlApiFirstPartForecast = 'https://api.openweathermap.org/data/2.5/forecast?q='
const urlApiSecondPart = '&appid=651b29d01268fe4ce0c1b52f6474c20e'

const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15
}

const CityWeather = function () {
    const [city, setCity] = useState(null) // Inizializza come null, non come un oggetto vuoto
    const [cityForecast, setCityForecast] = useState(null) // Inizializza come null, non come un oggetto vuoto

    const params = useParams()

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

                // mi interessa:
                // data.main.feels_like
                // data.main.hummidity
                // data.main.temp
                // data.main.temp_max
                // data.main.temp_min
                // data.name rende 'Quercianella'

                // data.weather[0].main mi dice se è 'clear' oppure 'description'

                // data.wind.speed

                console.log("Data:", data)
                setCity(data) // Imposta i dati ricevuti nello stato
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

    //useEffect

    useEffect(() => {
        getWeather()
        getForecast()
    }, [params.cityName]) // Devi usare cityName come dipendenza

    // Rendering condizionale per evitare errori
    if (!city) {
        return <div className="text-center p-5">Loading...</div> // Mostra un caricamento finché city è null
    }
    if (!cityForecast) {
        return <div className="text-center p-5">Loading...</div> // Mostra un caricamento finché city è null
    }

    return (
        <Container fluid className="mx-0 p-0 text-light">
            {/* foto */}
            <Row className="mx-0 p-0">
                <Col className="mx-0 p-0">
                    <img
                        src="https://www.visit-livorno.it/wp-content/uploads/2024/01/quercianella-01-scaled.jpeg"
                        className="w-100"
                        alt={"foto " + city.name}
                    />
                </Col>
            </Row>

            {/* current */}
            <Row className="mx-0 p-0 py-4 justify-content-between">
                <h1 className="text-light py-3">{city.name}</h1>
                <Col xs={2}  className="border-end">
                        <p className="fs-6 p-0 m-0">current:</p>
                        <h2>{kelvinToCelsius(city.main.temp).toFixed(2)} &deg;C</h2>
                </Col>
                
                <Col xs={2} className="border-end">
                    <Sun />
                    <p>{city.weather[0].description} </p>
                </Col>
                <Col xs={2} className="border-end">
                   <p className="fs-6 p-0 m-0">Feels like:</p>
                   <h2>{kelvinToCelsius(city.main.feels_like).toFixed(2)} &deg;C</h2>
                </Col>
                <Col xs={2} className="border-end">
                   <p className="fs-6 p-0 m-0">Venti:</p>
                   <h2>{city.wind.speed} nodi</h2>
                </Col>
                <Col xs={2}>
                   <p className="fs-6 p-0 m-0">Umidità:</p>
                   <h2>{city.main.humidity}% </h2>
                </Col>
            </Row>

            {/*  forecast */}

                <h5 className="ps-3 py-3">Previsioni dei prossimi 7 giorni:</h5>

                 {
                    cityForecast.list.slice(0, 7).map((day) => { 
                        return (
                        
                        <Row className="mx-0 p-0 justify-content-between">
                        <Col xs={2} className="border-end">
                            <p className="fs-6 p-0 m-0">current:</p>
                            <h4>{kelvinToCelsius(day.main.temp).toFixed(2)} &deg;C</h4>
                                
                        </Col>
                            
                        <Col xs={2} className="border-end">
                                <Sun />
                                <p>{day.weather[0].description} </p>
                        </Col>
                            <Col xs={2} className="border-end">
                            <p className="fs-6 p-0 m-0">Minime e Massime:</p>
                            <h4>{kelvinToCelsius(day.main.temp_min).toFixed(2)}  - {kelvinToCelsius(day.main.temp_max).toFixed(2)} &deg;C</h4>
                            </Col>
                            <Col xs={2} className="border-end">
                            <p className="fs-6 p-0 m-0">Venti:</p>
                            <h4>{day.wind.speed} nodi</h4>
                            </Col>
                            <Col xs={2}>
                            <p className="fs-6 p-0 m-0">Umidità:</p>
                            <h4>{day.main.humidity}% </h4>
                            </Col>
                    </Row>
                    )
                    })
                } 
                {/* <p>{cityForecast.list[0].main.temp} </p> */}

        </Container>
    );
};

export default CityWeather;