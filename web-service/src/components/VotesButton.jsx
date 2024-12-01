import {Alert, Button, ButtonGroup} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {MoviesContext} from "../context/movies.context.jsx";
import {UserContext} from "../context/user.context.jsx";

function VotesButton({content, setContent}) {

    const [selectedVote, setSelectedVote] = useState(0);
    const [showVoteMessage, setShowVoteMessage] = useState(false);
    const {user} = useContext(UserContext);
    const {getVoteByUserAndContent, createVote, fetchContentById} = useContext(MoviesContext);

    const checkVote = async () => {
        if (user && content) {
            try {
                const voteData = await getVoteByUserAndContent(user, content);
                if (voteData) {
                    setSelectedVote(voteData.score);
                } else {
                    setSelectedVote(0);
                }
            } catch (e) {
                console.error("Error checking vote:", e);
                setSelectedVote(0);
            }

        }
    }


    useEffect(() => {
        if (user && content) {
            checkVote();
        }

    }, [user, content]);

    const handleVote = async (vote) => {
        try {
            await createVote({
                idContent: content.id,
                idUser: user.id,
                score: vote
            });
            // Actualiza la película con la nueva valoración emitida por el usuario
            const updatedMovie = await fetchContentById(content.id);
            setContent(updatedMovie);
        } catch (e) {
            console.error("Error creating vote:", e);
        }
        setSelectedVote(vote);
        setShowVoteMessage(true);
        setTimeout(() => setShowVoteMessage(false), 3000);
    };


    return (
        <>
            <h3 className="mt-4">Tu voto:</h3>
            <ButtonGroup>
                {[...Array(10)].map((_, index) => (
                    <Button
                        key={index + 1}
                        variant={selectedVote === index + 1 ? "primary" : "outline-primary"}
                        onClick={() => handleVote(index + 1)}
                    >
                        {index + 1}
                    </Button>
                ))}
            </ButtonGroup>

            {showVoteMessage && (
                <Alert className="mt-4" variant="success" onClose={() => setShowVoteMessage(false)} dismissible>
                    ¡Gracias por tu voto!
                </Alert>
            )}
        </>
    );
}

export default VotesButton;