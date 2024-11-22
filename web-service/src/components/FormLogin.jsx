import {Alert, Button, Container, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {UserContext} from "../context/user.context.jsx";

function FormLogin(props) {

    const [validated, setValidated] = useState(false);
    const {user, setUser, login, error, setError} = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                const data = {
                    name: user.name,
                    password: user.password
                }
                const loginUser = await login(data);
                setUser(loginUser);
                sessionStorage.setItem("user", JSON.stringify(loginUser));
                navigate("/");
            } catch (e) {
                console.error("Status error:", e.status);
                if (e.status === 401) {
                    setError("El usuario o la contraseña no coinciden. Por favor, inténtalo de nuevo.");
                } else {
                    setError("Hubo un error al iniciar sesión: " + e.message);
                    navigate("/error", {state: {message: error}});
                }
            }
        }

        setValidated(true);
    }

    const setName = (e) => {
        setUser((prevUser) => ({...prevUser, name: e.target.value}));
        console.log(user);
    }

    const setPassword = (e) => {
        setUser((prevUser) => ({...prevUser, password: e.target.value}));
        console.log(user);
    }

    return (<>
        <h1 className={"text-lg-center mt-lg-5"}>Inicio de sesión</h1>
        {error && (
            <Alert variant="danger" className="text-center" onClose={() => setError(null)} dismissible>
                <Alert.Heading>¡Error!</Alert.Heading>
                <p>{error}</p>
            </Alert>
        )}
        <Container className={"form-container mt-5"}>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="form-mubis mb-5">
                <Form.Group className="mb-3" controlId="validationName">
                    <Form.Label className="fw-bold">Nombre de usuario</Form.Label>
                    <Form.Control required type="text" onChange={setName}
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
