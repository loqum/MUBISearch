import {useContext} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {UserContext} from "../context/user.context.jsx";
import {Notifications} from "./Notifications.jsx";
import {Reviews} from "./Reviews.jsx";
import {Favorites} from "./Favorites.jsx";

function ProfileDetails() {

    const {user, formatDate} = useContext(UserContext);

    return (
        <>
            <Container className="mt-5">
                <Row className="mb-4">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Perfil de usuario</Card.Title>
                                <Card.Text><strong>Nombre de usuario:</strong> {user.name}</Card.Text>
                                <Card.Text><strong>Nombre completo:</strong> {user.fullName}</Card.Text>
                                <Card.Text><strong>Fecha de creación:</strong> {formatDate(user.createdAt)}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Favorites/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Reviews/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Notifications/>
                    </Col>
                </Row>

            </Container>
        </>
    );

}

export default ProfileDetails;