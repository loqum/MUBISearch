import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import {MoviesContext} from "../context/movies.context.jsx";
import {useNavigate} from "react-router-dom";

export const AdvancedSearch = () => {

    const [text, setText] = useState("");
    const [isMovie, setIsMovie] = useState(false);
    const [isSeries, setIsSeries] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errorCheckbox, setErrorCheckbox] = useState(false);
    const {fetchMovies, fetchSeries, convertMovies} = useContext(MoviesContext);
    const navigateToList = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isValidText = text.trim().length > 0;
        const isValidCheckbox = isMovie || isSeries;

        if (!isValidText || !isValidCheckbox) {
            setValidated(true);
            setErrorCheckbox(!isValidCheckbox);
            return;
        }

        setValidated(false);
        setErrorCheckbox(false);

        try {
            let isContentTypeMovie = isMovie;
            let isContentTypeSeries = isSeries;
            let transformedContents = [];

            if (isMovie) {
                let response = await fetchMovies(text);
                response = response.filter((movie) => movie.poster_path !== null);
                transformedContents = convertMovies(response);
                setText("");

            }

            if (isSeries) {
                let response = await fetchSeries(text);
                response = response.filter((series) => series.poster_path !== null);
                transformedContents = convertMovies(response);
                setText("");
            }

            navigateToList(`/contents`, {
                state: {
                    transformedContents,
                    isMovie: isContentTypeMovie,
                    isSeries: isContentTypeSeries
                }
            });


        } catch (e) {
            console.error("Error: ", e);
        }

    }

    const handleMovieChange = (checked) => {
        setIsMovie(checked);
        if (checked) {
            setIsSeries(false);
        }
    };

    const handleSeriesChange = (checked) => {
        setIsSeries(checked);
        if (checked) {
            setIsMovie(false);
        }
    };


    return (
        <>
            <Container className="form-container justify-content-center mt-5">
                <Form noValidate validated={validated} className="form-mubis" onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label className="fw-bold">Texto</Form.Label>
                            <Form.Control required type="text" value={text}
                                          onChange={(event) => setText(event.target.value)}
                                          isInvalid={!text.trim() && validated}/>
                            <Form.Control.Feedback type="invalid">
                                El campo de texto no puede estar vacío.
                            </Form.Control.Feedback>

                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Película"
                                    required
                                    onChange={(event) => handleMovieChange(event.target.checked)}
                                    isInvalid={errorCheckbox}/>
                        <Form.Check type="checkbox" label="Serie"
                                    required
                                    onChange={(event) => handleSeriesChange(event.target.checked)}
                                    isInvalid={errorCheckbox}/>
                        {errorCheckbox && (
                            <div className="invalid-feedback d-block">
                                Debe seleccionar al menos una opción.
                            </div>
                        )}

                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Buscar
                    </Button>
                </Form>
            </Container>
        </>
    )
}