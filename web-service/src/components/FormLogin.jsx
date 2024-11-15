import {Button, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {UserContext} from "../context/user.context.jsx";

function FormLogin(props) {

    const [validated, setValidated] = useState(false);
    const {user, setUser, loginUser} = useContext(UserContext);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);
        console.log("User: ", user);
    }

    const setUserName = (e) => {
        setUser((prevUser) => ({...prevUser, username: e.target.value}));
        console.log(user);
    }

    const setPassword = (e) => {
        setUser((prevUser) => ({...prevUser, password: e.target.value}));
        console.log(user);
    }

    return (<>
        <h1 className={"text-lg-center mt-lg-5"}>Inicio de sesión</h1>
        <Container className={"form-container mt-5"}>

            <Form noValidate validated={validated} onSubmit={handleSubmit} className="form-mubis mb-5">
                <Form.Group className="mb-3" controlId="validationUsername">
                    <Form.Label className="fw-bold">Nombre de usuario</Form.Label>
                    <Form.Control required type="text" onChange={setUserName}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationPassword">
                    <Form.Label className="fw-bold">Contraseña</Form.Label>
                    <Form.Control required type="password" onChange={setPassword}/>
                </Form.Group>
                <Button type="submit">Iniciar sesión</Button>
            </Form>

            <h4 className={"text-lg-center"}>¿No estás registrado/a todavía?</h4>
            <div className="d-flex justify-content-center">
                <Button variant="outline-primary" as={Link} to="/register">Regístrate</Button>
            </div>

        </Container>


    </>);
}

export default FormLogin;
