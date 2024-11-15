import {Button, Container, Form} from "react-bootstrap";
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
                setUser((prevUser) => ({...prevUser, ...newUser, isLoggedIn: true}));
                navigate("/");
            } catch (error) {
                console.error("Error registering user:", error);
                navigate("/error", {state: {message: "Hubo un error al crear tu cuenta."}});
            }

            setValidated(true);
        }
    };


    return (<>
        <h1 className={"text-lg-center mt-lg-5"}>Regístrate</h1>
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
