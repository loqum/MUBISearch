import {Alert, Button, ButtonGroup} from "react-bootstrap";
import React from "react";

function VotesButton({selectedVote, handleVote, showVoteMessage, setShowVoteMessage}) {
    return (
        <>
            <h3 className="mt-4">Vota la película:</h3>
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

        </>
    );
}

export default VotesButton;