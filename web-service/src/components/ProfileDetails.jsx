import React, {useContext, useState} from "react";
import {Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {UserContext} from "../context/user.context.jsx";
import {Notifications} from "./Notifications.jsx";
import {Reviews} from "./Reviews.jsx";
import {Favorites} from "./Favorites.jsx";
import axios from "axios";

function ProfileDetails() {

    const {user, setUser, formatDate, updateUser} = useContext(UserContext);
    const [editing, setEditing] = useState(user?.fullname == null);
    const [fullname, setFullname] = useState(user?.fullname || "");

    if (!user) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
        );
    }

    const handleSaveFullname = async () => {
        try {
            const updatedUser = { ...user, fullname };

            setEditing(false);

            updateUser(updatedUser);
            setUser(updatedUser);
        } catch (error) {
            console.error("Error updating user: ", error);
        }
    }

    return (
        <>
            <Container className="mt-5">
                <Row className="mb-lg-5">
                    <Col>
                        <h4 className={"text mb-lg-3"}>Área personal</h4>
                        <Card>
                            <Card.Body>
                                <Card.Text><strong>Nick:</strong> {user.nickname}</Card.Text>
                                {editing ? (
                                    <Form>
                                        <Form.Group as={Row} controlId="fullname" className="align-items-center">
                                            <Form.Label column sm="3">
                                                <strong>Nombre completo:</strong>
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control
                                                    type="text"
                                                    value={fullname}
                                                    onChange={(e) => setFullname(e.target.value)}
                                                    placeholder="Introduce tu nombre completo"
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                ) : (
                                    <Card.Text>
                                        <strong>Nombre completo:</strong> {fullname}
                                    </Card.Text>
                                )}
                                <Card.Text><strong>Correo electrónico:</strong> {user.email}</Card.Text>
                                <Card.Text><strong>Fecha de creación:</strong> {formatDate(user.createdAt)}</Card.Text>

                                {editing && fullname.trim() && (
                                    <div className="d-flex justify-content-end mt-3">
                                        <Button
                                            variant="primary"
                                            onClick={handleSaveFullname}
                                        >
                                            Guardar
                                        </Button>
                                    </div>
                                )}

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-lg-5">
                    <Col>
                        <Favorites/>
                    </Col>
                </Row>

                <Row className="mb-lg-5">
                    <Col>
                        <h4 className={"text mb-lg-3"}>Críticas realizadas</h4>
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    <Reviews/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-lg-5">
                    <Col>
                        <h4 className={"text mb-4 mt-4"}>Notificaciones</h4>
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    <Notifications/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </>
    );

}

export default ProfileDetails;