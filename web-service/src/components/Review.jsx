import {Alert, Button, Card, Form, InputGroup, Spinner} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {MoviesContext} from "../context/movies.context.jsx";
import {UserContext} from "../context/user.context.jsx";
import {useAuth0} from "@auth0/auth0-react";

export const Review = ({content}) => {

    const [reviews, setReviews] = useState([]);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [newReview, setNewReview] = useState(null);
    const {createReview, getReviewsByContent, convertDateToDayMonthYearTime} = useContext(MoviesContext);
    const {user, fetchUserById} = useContext(UserContext);
    const { isAuthenticated } = useAuth0();

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

    useEffect(() => {
        if (content) {
            checkReviews();
        }
    }, [content, user]);

    return (
        <>
            <h3 className="mt-4">Reseñas</h3>

            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <Card key={index} className="mb-3">
                        <Card.Body>
                            <Card.Title>{review.userName}</Card.Title>
                            <Card.Text>{review.text}</Card.Text>
                            <Card.Footer className="text-muted">
                                Publicado el {convertDateToDayMonthYearTime(review.createdAt)}
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>Todavía no hay ninguna reseña para esta película. {isAuthenticated && (<>¡Sé el primero en
                    comentarla!</>)}</p>
            )}
            {isAuthenticated && !hasReviewed &&
                (<Form onSubmit={handleSubmitReview}>
                        <InputGroup>
                            <InputGroup.Text>Escribe tu reseña</InputGroup.Text>
                            <Form.Control
                                as="textarea"
                                value={newReview || ""}
                                onChange={(e) => setNewReview(e.target.value)}
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
        </>
    )
}