import {Button, Col, Container, Form, Row} from "react-bootstrap";

function SearchPage() {
    return (
        <Container>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Texto</Form.Label>
                        <Form.Control type="email"/>
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
                        <Form.Label>Género</Form.Label>
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
