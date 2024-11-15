import {Button, Container} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";

function ErrorPage(props) {

    const location = useLocation();
    const errorMessage = location.state?.message || "Ha ocurrido un error inesperado.";

    return (
        <Container className={"mt-lg-5"}>
            <h1 className={"fw-bold"}>¡Error!</h1>
            <h4>{errorMessage}</h4>
            <Button className={"mt-lg-3"} as={Link} to="/">Volver a la página principal</Button>
        </Container>
    );
}

export default ErrorPage;
