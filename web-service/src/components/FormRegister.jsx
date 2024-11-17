import {Alert, Button, Container, Form} from "react-bootstrap";
import {useContext, useState} from "react";
import {UserContext} from "../context/user.context.jsx";
import {useNavigate} from "react-router-dom";

function FormRegister() {

    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const {user, setUser, createUser} = useContext(UserContext);
    const navigate = useNavigate();

    const setName = (e) => {
        setUser((prevUser) => ({...prevUser, name: e.target.value}));
        console.log(user);
    }

    const setPassword = (e) => {
        setUser((prevUser) => ({...prevUser, password: e.target.value}));
        console.log(user);
    }

    const setFullName = (e) => {
        setUser((prevUser) => ({...prevUser, fullName: e.target.value}));
        console.log(user);
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                const newUser = await createUser(user);
                console.log("Registered user:", newUser);
                const updatedUser = {...user, ...newUser, isLoggedIn: true};
                setUser(updatedUser);
                sessionStorage.setItem("user", JSON.stringify(updatedUser));
                navigate("/");
            } catch (e) {
                console.error("Status error:", e.status);
                if (e.status === 409) {
                    setError("El nombre de usuario ya existe. Por favor, elige otro.");
                } else {
                    setError("Hubo un error al crear tu cuenta: " + e.message);
                    navigate("/error", {state: {message: error}});
                }
            }

            setValidated(true);
        }
    };


    return (<>
        <h1 className={"text-lg-center mt-lg-5"}>Regístrate</h1>

        {error && (
            <Alert variant="danger" className="text-center" onClose={() => setError(null)} dismissible>
            <Alert.Heading>¡Error!</Alert.Heading>
                <p>{error}</p>
            </Alert>
        )}
        <Container className="form-container justify-content-center mt-5">
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="form-mubis">
                <Form.Group className="mb-3" controlId="validationName">
                    <Form.Label className="fw-bold">Nombre de usuario</Form.Label>
                    <Form.Control required type="text" onChange={setName}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationFullname">
                    <Form.Label className="fw-bold">Nombre completo</Form.Label>
                    <Form.Control required type="text" onChange={setFullName}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationPassword">
                    <Form.Label className="fw-bold">Contraseña</Form.Label>
                    <Form.Control required type="password" onChange={setPassword}/>
                </Form.Group>
                <Button type="submit">Continuar</Button>
            </Form>
        </Container>
    </>);
}

export default FormRegister;
