import {Container, Nav, NavDropdown, Button, Col, Navbar, Row, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

function NavigationBar() {

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const query = event.target[0].value;
        if (query) {
            console.log(query);
        }

    }
    return (
        <Navbar className="bg-body-tertiary justify-content-between">
            <Container>
                <Navbar.Brand href="/">MUBISearch</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Inicio</Nav.Link>
                {/*        <Nav.Link href="#link">Link</Nav.Link>*/}
                {/*        <NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
                {/*            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                {/*            <NavDropdown.Item href="#action/3.2">*/}
                {/*                Another action*/}
                {/*            </NavDropdown.Item>*/}
                {/*            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                {/*            <NavDropdown.Divider />*/}
                {/*            <NavDropdown.Item href="#action/3.4">*/}
                {/*                Separated link*/}
                {/*            </NavDropdown.Item>*/}
                {/*        </NavDropdown>*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>

            <Form className="d-flex ms-auto me-3" onSubmit={handleSearchSubmit}>
                <Row>
                    <Col xs="auto">
                        <Form.Control
                            type="text"
                            placeholder="Buscar"
                            className=" mr-sm-2"
                        />
                    </Col>
                    <Col xs="auto">
                        <Button as={Link} to="/search">Búsqueda avanzada</Button>
                    </Col>
                </Row>
            </Form>

            <Button variant="outline-primary">Login</Button>
            <Button variant="outline-primary">Registrarse</Button>

        </Navbar>
    );

}

export default NavigationBar;