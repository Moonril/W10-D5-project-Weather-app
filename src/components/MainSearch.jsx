import { useState } from "react"
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const MainSearch = function () {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/cityWeather/' + search)
    }
    
    return (
        <Container>
            <Row className="justify-content-center py-3">
                <h1 className="text-center text-light py-5">Dove andiamo oggi?</h1>
                <Col xs={12} sm={6} md={4} lg={4} xl={2}>
                <Card className="border-0 bg-transparent rounded-4">
                    <Link to={'/cityWeather/quercianella'} >
                        <Card.Img variant="top" src="https://www.visit-livorno.it/wp-content/uploads/2024/01/quercianella-01-scaled.jpeg" />
                    </Link>
                    <Card.Title className="text-center text-light">Quercianella</Card.Title>
                </Card>
                </Col>
                <Col xs={12} sm={6} md={4} lg={4} xl={2}>
                <Card className="border-0 bg-transparent rounded-4">
                    <Link to={'/cityWeather/barcelona'} >
                        <Card.Img variant="top" src="https://www.visit-livorno.it/wp-content/uploads/2024/01/quercianella-01-scaled.jpeg" />
                    </Link>
                    <Card.Title className="text-center text-light">Barcellona</Card.Title>
                </Card>
                </Col>
                <Col xs={12} sm={6} md={4} lg={4} xl={2}>
                <Card className="border-0 bg-transparent rounded-4">
                    <Link to={'/cityWeather/tokyo'} >
                        <Card.Img variant="top" src="https://www.visit-livorno.it/wp-content/uploads/2024/01/quercianella-01-scaled.jpeg" />
                    </Link>
                    <Card.Title className="text-center text-light">Tokyo</Card.Title>
                </Card>
                </Col>
                <Col xs={12} sm={6} md={4} lg={4} xl={2}>
                <Card className="border-0 bg-transparent rounded-4">
                    <Link to={'/cityWeather/seoul'} >
                        <Card.Img variant="top" src="https://www.visit-livorno.it/wp-content/uploads/2024/01/quercianella-01-scaled.jpeg" />
                    </Link>
                    <Card.Title className="text-center text-light">Seoul</Card.Title>
                </Card>
                </Col>
                
            </Row>
            <Row className="my-4 justify-content-center">
                <h2 className="text-center text-light">Cerca un destinazione:</h2>
                <Col xs={6} >
                <Form className="text-center" onSubmit={handleSubmit}>
                        <Form.Control className="my-2" type='text' placeholder="girona.." value={search} onChange={(e) =>
                            setSearch(e.target.value)
                        } />
                        <Button className="text-light border border-light p-2 rounded-0 bg-transparent mb-1 ms-1" type="submit">Cerca</Button>
                        <Button className="text-light border border-light p-2 rounded-0 bg-transparent mb-1 ms-1" onClick={(e) => {
                            
                            setSearch('')
                        }}>Reset</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default MainSearch