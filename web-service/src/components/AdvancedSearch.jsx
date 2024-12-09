import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import {MoviesContext} from "../context/movies.context.jsx";
import {useNavigate} from "react-router-dom";

export const AdvancedSearch = () => {

    const [text, setText] = useState(null);
    const [isMovie, setIsMovie] = useState(false);
    const [isSeries, setIsSeries] = useState(false);
    const {fetchMovies, fetchSeries, convertMovies} = useContext(MoviesContext);
    const navigateToList = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let isContentTypeMovie = isMovie;
            let isContentTypeSeries = isSeries;
            let transformedContents = [];

            if (isMovie) {
                let response = await fetchMovies(text);
                response = response.filter((movie) => movie.poster_path !== null);
                transformedContents = convertMovies(response);
                setText(null);

            }

            if (isSeries) {
                let response = await fetchSeries(text);
                response = response.filter((series) => series.poster_path !== null);
                transformedContents = convertMovies(response);
                setText(null);
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
                <Form className="form-mubis" onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label className="fw-bold">Texto</Form.Label>
                            <Form.Control type="text" onChange={(event) => setText(event.target.value)}/>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Película"
                                    onChange={(event) => handleMovieChange(event.target.checked)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Serie"
                                    onChange={(event) => handleSeriesChange(event.target.checked)}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Buscar
                    </Button>
                </Form>
            </Container>
        </>
    )
}