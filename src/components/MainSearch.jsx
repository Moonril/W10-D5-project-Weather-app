import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Sun } from "react-bootstrap-icons"

const MainSearch = function () {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        localStorage.setItem('lastSearch', search)
        navigate('/cityWeather/' + search)
    }

    /* non funziona come voglio io, andrebbe salvata nel placeholder ma me la mette come input, non ho tempooo */
    useEffect(()=>{
        const savedSearch = localStorage.getItem('lastSearch')
        if(savedSearch){
            setSearch(savedSearch)
        }
    }, [])
    
    return (
        <Container className="d-flex flex-column-reverse flex-md-column">
            <Row className="justify-content-center py-3">
                <h1 className="text-center text-light py-5">Where should we go today?</h1>
                <Col xs={12} sm={6} md={4} lg={2} xl={2}>
                <Card className="border-0 bg-transparent rounded-4">
                    <Link to={'/cityWeather/quercianella'} >
                        <Card.Img variant="top" className="w-100 maremma" src="https://www.visit-livorno.it/wp-content/uploads/2024/01/quercianella-01-scaled.jpeg" />
                    </Link>
                    <Card.Title className="text-center text-light">Quercianella <Sun /></Card.Title>
                </Card>
                </Col>
                <Col xs={12} sm={6} md={4} lg={2} xl={2}>
                <Card className="border-0 bg-transparent rounded-4">
                    <Link to={'/cityWeather/barcelona'} >
                        <Card.Img variant="top" className="w-100 maremma" src="https://www.spagna.info/wp-content/uploads/sites/39/barcellona-sagrada-familia-arcobaleno.jpg" />
                    </Link>
                    <Card.Title className="text-center text-light">Barcellona <Sun /></Card.Title>
                </Card>
                </Col>
                <Col xs={12} sm={6} md={4} lg={2} xl={2}>
                <Card className="border-0 bg-transparent rounded-4">
                    <Link to={'/cityWeather/tokyo'} >
                        <Card.Img variant="top" className="w-100 maremma" src="https://t4.ftcdn.net/jpg/02/51/12/11/360_F_251121174_5xQyUCqSrkswyLHbM9Ne8DQ8Qb0o1HGw.jpg" />
                    </Link>
                    <Card.Title className="text-center text-light">Tokyo <Sun /></Card.Title>
                </Card>
                </Col>
                <Col xs={12} sm={6} md={4} lg={2} xl={2}>
                <Card className="border-0 bg-transparent rounded-4">
                    <Link to={'/cityWeather/seoul'} >
                        <Card.Img variant="top" className="w-100 maremma" src="https://149990825.v2.pressablecdn.com/wp-content/uploads/2023/09/Seoul1.jpg" />
                    </Link>
                    <Card.Title className="text-center text-light">Seoul <Sun /></Card.Title>
                </Card>
                </Col>
                
            </Row>
            <Row className="my-4 justify-content-center">
                <h2 className="text-center text-light">Find your destination:</h2>
                <Col xs={6} >
                <Form className="text-center" onSubmit={handleSubmit}>
                        <Form.Control className="my-2" type='text' placeholder={`ultima ricerca: ${search || 'nessuna'} `} value={search} onChange={(e) =>
                            setSearch(e.target.value)
                        } />
                        <Button className="text-light border border-light p-2 rounded-2 bg-transparent mb-1 ms-1" type="submit">Cerca</Button>
                        <Button className="text-light border border-light p-2 rounded-2 bg-transparent mb-1 ms-1" onClick={(e) => {
                            
                            setSearch('')
                        }}>Reset</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default MainSearch