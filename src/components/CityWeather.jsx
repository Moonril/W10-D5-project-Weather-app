/* non ho avuto tempo di mettere controlli per l'indirizzo in caso si inseriscano parole o città non esistenti :( */

import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"


const urlApiFirstPart = 'https://api.openweathermap.org/data/2.5/weather?q='
const urlApiFirstPartForecast = 'https://api.openweathermap.org/data/2.5/forecast?q='
const urlApiSecondPart = '&appid=651b29d01268fe4ce0c1b52f6474c20e'

const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15
}

const CityWeather = function () {
    const [city, setCity] = useState(null)
    const [cityForecast, setCityForecast] = useState(null)
    const [immagine, setImmagine] = useState('london')

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

    //useEffect

    useEffect(() => {
        getWeather()
        getForecast()
        getImages()
    }, [params.cityName]) 

    // condizionale per evitare errori
    if (!city) {
        return <div className="text-center p-5">Loading...</div>
    }
    if (!cityForecast) {
        return <div className="text-center p-5">Loading...</div> 
    }

    return (
        <Container fluid className="mx-0 p-0 text-light">
            {/* foto */}
            <Row className="mx-0 p-0 bg-row">
                <Col className="mx-0 p-0">
                    <img
                        src={immagine?.photos?.[0]?.src?.landscape ? immagine.photos[0].src.landscape : 'https://images.pexels.com/photos/33044/sunflower-sun-summer-yellow.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                        className="w-100 maremma-dinamica"
                        alt={"foto " + city.name}
                    />
                </Col>
            </Row>

            {/* current */}
            <Row className="mx-0 p-0 py-4 justify-content-between">
                <h1 className="text-light py-3">{city.name}</h1>
                <Col xs={4} md={2} className="border-end p-1">
                        <p className="fs-6 p-0 m-0">current:</p>
                        <h2>{kelvinToCelsius(city.main.temp).toFixed(0)} &deg;C</h2>
                </Col>
                
                <Col xs={4} md={2} className="border-end p-1 text-center">
                    <img
                src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                alt={city.weather[0].description}
                className="weather-icon w-25"
            />

                    <p>{city.weather[0].description} </p>
                </Col>
                <Col xs={4} md={2} className="border-end p-1">
                   <p className="fs-6 p-0 m-0">Feels like:</p>
                   <h2>{kelvinToCelsius(city.main.feels_like).toFixed(0)} &deg;C</h2>
                </Col>
                <Col xs={4} md={2} className="border-end p-1">
                   <p className="fs-6 p-0 m-0">Venti:</p>
                   <h2>{city.wind.speed} <i class="bi bi-wind"></i>
                   </h2>
                </Col>
                <Col xs={4} md={2} className="border-end p-1">
                   <p className="fs-6 p-0 m-0">Umidità:</p>
                   <h2>{city.main.humidity}% <i class="bi bi-droplet"></i> </h2>
                </Col>
            </Row>

            {/*  forecast */}

                <h5 className="ps-3 py-3">Previsioni dei prossimi 7 giorni:</h5>

                 {
                    cityForecast.list.slice(0, 7).map((day, i) => { 
                        return (
                        
                        <Row key={day.dt} className="mx-0 p-0 justify-content-between">
                        <Col xs={4} md={2} className="border-end">
                            <p className="fs-6 p-0 m-0">current:</p>
                            <h4>{kelvinToCelsius(day.main.temp).toFixed(0)} &deg;C</h4>
                                
                        </Col>
                            
                        <Col xs={4} md={2} className="border-end text-center">
                                <img
                                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                alt={city.weather[0].description}
                                className="weather-icon w-25"
                                />
                                <p>{day.weather[0].description} </p>
                        </Col>
                            <Col xs={4} md={2} className="border-end">
                            <p className="fs-6 p-0 m-0">Minime e Massime:</p>
                            <h4>{kelvinToCelsius(day.main.temp_min).toFixed(0)}  - {kelvinToCelsius(day.main.temp_max).toFixed(0)} &deg;C</h4>
                            </Col>
                            <Col xs={4} md={2} className="border-end">
                            <p className="fs-6 p-0 m-0">Venti:</p>
                            <h4>{day.wind.speed} nodi</h4>
                            </Col>
                            <Col xs={4} md={2}>
                            <p className="fs-6 p-0 m-0">Umidità:</p>
                            <h4>{day.main.humidity}% </h4>
                            </Col>
                    </Row>
                    )
                    })
                } 

        </Container>
    );
};

export default CityWeather;