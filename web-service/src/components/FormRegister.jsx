import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {useState} from "react";
import '../assets/css/FormRegister.css';

function FormRegister() {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);


    };



    return (
        <Container className="form-container justify-content-center mt-5">

            <Form noValidate validated={validated} onSubmit={handleSubmit} className="form-mubis">
                <Form.Group className="mb-3" cl controlId="validationUsername">
                    <Form.Label className="fw-bold">Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationFullname">
                    <Form.Label className="fw-bold">Nombre completo</Form.Label>
                    <Form.Control
                        required
                        type="text"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationPassword">
                    <Form.Label className="fw-bold">Contraseña</Form.Label>
                    <Form.Control required type="password"/>
                </Form.Group>
                <Button type="submit">Registrarse</Button>
            </Form>
        </Container>
    );
}

export default FormRegister;
