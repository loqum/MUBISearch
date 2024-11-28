import {Container, Image} from "react-bootstrap";
import logo from "../assets/images/logo.png";
import React, {useContext, useEffect} from "react";
import {MoviesContext} from "../context/movies.context.jsx";
import ContentCard from "../components/ContentCard.jsx";

function HomePage() {

    const {movies, setMovies, convertMovies, fetchDiscoverMovies} = useContext(MoviesContext);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetchDiscoverMovies();
                const transformedMovies = convertMovies(response);
                setMovies(transformedMovies);
                console.log("Movies:", transformedMovies);
                console.log("Response Movies:", response);
            } catch (e) {
                console.error("Error fetching movies:", e);
            }
        };

        fetchMovies();

    }, [setMovies]);

    const movieCards = movies.map((movie) => {
        return <ContentCard key={movie.id} content={movie} isMovie={true} isSeries={false} imageSize="original" />
    });

    return (
        <>
            <Container>
                <Image src={logo} alt="Logo MUBISearch" fluid rounded className="mb-4 mt-4"/>
                <h1 className={"m-4"}>Últimas películas</h1>
                <ul className="content-list">
                    {movieCards}
                </ul>
            </Container>
        </>
    )
}

export default HomePage;
