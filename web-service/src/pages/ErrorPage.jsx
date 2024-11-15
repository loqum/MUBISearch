import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

function ErrorPage() {
    return (
        <section>
            <h1>Error: La página no existe</h1>
            <Button as={Link} to="/">Volver al inicio</Button>
        </section>
    );
}

export default ErrorPage;
