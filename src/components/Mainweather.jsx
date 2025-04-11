import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

const MainWeather = function () {
    return (
        <Container>
            <Row className="justify-content-center">
                <h1 className="text-center text-light">Dove andiamo oggi?</h1>
                <Col xs={12} sm={6} md={4} lg={4} xl={2}>
                <Card className="border-0 bg-transparent rounded-4">
                    <Link to={'/cityWeather/quercianella'} >
                        <Card.Img variant="top" src="https://www.visit-livorno.it/wp-content/uploads/2024/01/quercianella-01-scaled.jpeg" />
                    </Link>
                    <Card.Title className="text-center text-light">Quercianella</Card.Title>
                </Card>
                </Col>
                
            </Row>
            <Row>
                <Col></Col>
            </Row>
        </Container>
    )
}

export default MainWeather