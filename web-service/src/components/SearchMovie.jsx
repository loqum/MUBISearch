import {useState} from "react";
import Form from "react-bootstrap/Form";

function SearchMovie() {

    const [searchTitle, setSearchTitle] = useState('');

    return (
        <Form>
            <Form.Group>
                <Form.Label>Buscar película</Form.Label>
                <Form.Control type="text" placeholder="Título de la película" value={searchTitle} onChange={(event) => setSearchTitle(event.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Buscar
            </Button>
        </Form>
    );
}

export default SearchMovie;
