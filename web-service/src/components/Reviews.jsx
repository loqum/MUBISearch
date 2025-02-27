import {Button, ListGroup, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {MoviesContext} from "../context/movies.context.jsx";
import {UserContext} from "../context/user.context.jsx";

export const Reviews = () => {

    const [reviews, setReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const {user, formatDate} = useContext(UserContext);
    const {fetchContentById, getReviewsByUser, deleteReview} = useContext(MoviesContext);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const userReviews = await getReviewsByUser(user.id);
                const reviewsWithContent = await Promise.all(
                    userReviews.map(async (review) => {
                        const movie = await fetchContentById(review.idContent);
                        return {...review, movieTitle: movie.title};
                    })
                );
                setReviews(reviewsWithContent);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        }
        fetchReviews();
    }, [user]);

    const handleDeleteClick = (review) => {
        setSelectedReview(review);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteReview(selectedReview.id);
            setReviews((prevReviews) =>
                prevReviews.filter((review) => review.id !== selectedReview.id)
            );
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    return (
        <>

            {reviews && reviews.length > 0 ? (
                <ListGroup>
                    {reviews.map((review, index) => (
                        <ListGroup.Item key={index}
                                        className={`mb-4 ${index !== 0 ? "border-top" : ""} position-relative`}>
                            <i
                                className="bi bi-trash-fill text-danger position-absolute"
                                style={{
                                    top: "10px",
                                    right: "10px",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleDeleteClick(review)}

                            ></i>
                            <h5 className="mb-2">
                                <Link to={`/details/${review?.idContent}`}>
                                    {review.movieTitle}
                                </Link>
                            </h5>
                            {review.text.split("\n").map((line, index) => (
                                <React.Fragment key={index}>
                                    {line.trim()}
                                    <br/>
                                </React.Fragment>
                            ))}
                            <small className="text-muted">
                                Publicado el {formatDate(review.createdAt)}
                            </small>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <div>
                    <p style={{fontWeight: "bold"}}>No has realizado ninguna crítica hasta el momento. ¡Anímate y da tu
                        opinión!</p>
                </div>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres eliminar esta crítica de{" "}
                    <strong>
                        <Link to={`/details/${selectedReview?.idContent}`}>
                            {selectedReview?.movieTitle}
                        </Link>
                    </strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal></>
    )
}