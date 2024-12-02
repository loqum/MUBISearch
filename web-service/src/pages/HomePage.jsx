import {Container, Image, Pagination} from "react-bootstrap";
import logo from "../assets/images/logo.png";
import React, {useContext, useEffect, useState} from "react";
import {MoviesContext} from "../context/movies.context.jsx";
import ContentCard from "../components/ContentCard.jsx";

function HomePage() {

    const {movies, setMovies, convertMovies, fetchDiscoverMovies} = useContext(MoviesContext);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    const fetchMovies = async (page) => {
        try {
            const response = await fetchDiscoverMovies(page);
            const transformedMovies = convertMovies(response);
            setMovies(transformedMovies);
            console.log(`Movies from page ${page}: `, transformedMovies);
        } catch (e) {
            console.error("Error fetching movies:", e);
        }
    };

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    const paginationItems = [];
    for (let page = 1; page <= totalPages; page++) {
        paginationItems.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
            >
                {page}
            </Pagination.Item>
        );
    }

    const handleFirstPage = () => handlePageChange(1);
    const handlePrevPage = () => {
        if (currentPage > 1) handlePageChange(currentPage - 1);
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) handlePageChange(currentPage + 1);
    };
    const handleLastPage = () => handlePageChange(totalPages);


    const movieCards = movies.map((movie) => {
        return <ContentCard key={movie.id} content={movie} isMovie={true} isSeries={false} imageSize="original"/>
    });

    return (
        <>
            <Container>
                <Image src={logo} alt="Logo MUBISearch" fluid rounded className="mb-4 mt-4"/>
                <ul className="content-list">{movieCards}</ul>
                <Pagination className="justify-content-center mt-4 mb-5">
                    <Pagination.First onClick={handleFirstPage} disabled={currentPage === 1}/>
                    <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1}/>
                    {paginationItems}
                    <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages}/>
                    <Pagination.Last onClick={handleLastPage} disabled={currentPage === totalPages}/>
                </Pagination>
            </Container>
        </>
    )
}

export default HomePage;
