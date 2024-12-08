import {Alert, Button, Card, Form, InputGroup, Modal} from "react-bootstrap";
import React, {useContext, useEffect, useRef, useState} from "react";
import {MoviesContext} from "../context/movies.context.jsx";
import {UserContext} from "../context/user.context.jsx";
import {useAuth0} from "@auth0/auth0-react";

export const Review = ({content}) => {

    const [reviews, setReviews] = useState([]);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [newReview, setNewReview] = useState(null);
    const {createReview, getReviewsByContent, convertDateToDayMonthYearTime, deleteReview} = useContext(MoviesContext);
    const {user, fetchUserById} = useContext(UserContext);
    const { isAuthenticated } = useAuth0();
    const textAreaRef = useRef(null);
    const [selectedReview, setSelectedReview] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (newReview && newReview.trim() !== "") {
            try {
                await createReview({
                    idContent: content.id,
                    idUser: user.id,
                    text: newReview.trim(),
                });

                setNewReview("");
                checkReviews();
            } catch (e) {
                console.error("Error creating review:", e);
            }
        }
    }

    const checkReviews = async () => {
        if (content) {
            console.log("Checking reviews for content:", content);
            try {
                const reviewData = await getReviewsByContent(content.id);

                if (reviewData) {
                    const reviewsWithUserData = await Promise.all(
                        reviewData.map(async (review) => {
                            const user = await fetchUserById(review.idUser);
                            return {...review, userName: user.name || `Usuario ${review.idUser}`};
                        })
                    );
                    console.log("User review:", user);
                    if (user) {
                        const userReview = reviewsWithUserData.find((review) => review.idUser === user.id);
                        setHasReviewed(!!userReview);
                    }

                    setReviews(reviewsWithUserData);
                } else {
                    setReviews([]);
                    setHasReviewed(false);
                }
            } catch (e) {
                console.error("Error checking review:", e);
                setReviews([]);
            }

        }
    }

    const handleTextAreaResize = (e) => {
        const element = textAreaRef.current;
        element.style.height = "auto";
        element.style.height = `${element.scrollHeight}px`;
        setNewReview(e.target.value);
    };

    useEffect(() => {
        if (content) {
            checkReviews();
            console.log("Has reviewed:", hasReviewed);
        }
    }, [content, user]);

    const handleDeleteClick = (review) => {
        console.log("Review to delete:", review);
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
            <h3 className="mt-4">Críticas</h3>

            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <Card key={index} className="mb-3">
                        {user?.role === 'ADMIN' && (
                            <i
                                className="bi bi-trash-fill text-danger position-absolute"
                                style={{
                                    top: "10px",
                                    right: "10px",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleDeleteClick(review)}

                            />
                        )}

                        <Card.Body>
                            <Card.Title>{review.userName}</Card.Title>
                            <Card.Text>
                                {review.text.split("\n").map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br/>
                                    </React.Fragment>
                                ))}
                            </Card.Text>
                            <Card.Footer className="text-muted">
                                Publicado el {convertDateToDayMonthYearTime(review.createdAt)}
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>Todavía no hay ninguna crítica para esta película. {isAuthenticated && (<>¡Sé el primero en
                    comentarla!</>)}</p>
            )}
            {isAuthenticated && !hasReviewed && user?.role === 'USER' &&
                (<Form onSubmit={handleSubmitReview}>
                        <InputGroup>
                            <InputGroup.Text>Escribe tu reseña</InputGroup.Text>
                            <Form.Control
                                as="textarea"
                                ref={textAreaRef}
                                value={newReview || ""}
                                onChange={handleTextAreaResize}
                                placeholder="Comparte tu opinión sobre esta película o serie"
                                aria-label="Campo para escribir una nueva reseña"
                            />
                        </InputGroup>
                        <Button type="submit" variant="primary" className="mt-2">
                            Enviar reseña
                        </Button>
                    </Form>
                )}
            {hasReviewed && (
                <Alert variant="info">
                    ¡Gracias por dar tu opinión!
                </Alert>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres eliminar esta crítica?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}