import {Button, Col, Container, Form, Row} from "react-bootstrap";

function SearchPage() {
    return (
        <Container className="form-container justify-content-center mt-5">
            <Form className="form-mubis">
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label className="fw-bold">Texto</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Película"/>
                </Form.Group>

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Serie"/>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label className="fw-bold">Género</Form.Label>
                        <Form.Select defaultValue="Elige un valor...">
                            <option>Elige un valor...</option>
                            <option>...</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Buscar
                </Button>
            </Form>
        </Container>
    );
}

export default SearchPage;
