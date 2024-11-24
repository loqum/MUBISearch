import {Button, ButtonGroup} from "react-bootstrap";

function VotesButton({selectedVote, handleVote}) {
    return (
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
    );
}

export default VotesButton;