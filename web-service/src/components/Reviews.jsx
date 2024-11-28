import {Button, ListGroup, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {MoviesContext} from "../context/movies.context.jsx";
import {UserContext} from "../context/user.context.jsx";

export const Reviews = () => {

    const [reviews, setReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const {user, setUser, formatDate} = useContext(UserContext);
    const {fetchMovieById, getReviewsByUser, deleteReview} = useContext(MoviesContext);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const userReviews = await getReviewsByUser(user.id);
                console.log("User reviews:", userReviews);

                const reviewsWithContent = await Promise.all(
                    userReviews.map(async (review) => {
                        const movie = await fetchMovieById(review.idContent);
                        console.log("Movie:", movie);
                        return {...review, movieTitle: movie.title};
                    })
                );
                console.log("Reviews with content:", reviewsWithContent);
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
        <><h4 className={"mb-4 mt-4"}>Reseñas realizadas</h4>
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
                            <p>{review.text}</p>
                            <small className="text-muted">
                                Publicado el {formatDate(review.createdAt)}
                            </small>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <p>*No has realizado ninguna reseña*</p>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres eliminar esta reseña de{" "}
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