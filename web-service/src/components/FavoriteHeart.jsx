import {Fab} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

function FavoriteHeart({onToggle, isFavorite}) {
    const handleClick = () => {
        const newFavoriteState = !isFavorite;
        if (onToggle) {
            onToggle(newFavoriteState);
        }
    };

    return (
        <span
            onClick={handleClick}
            role="button"
            style={{cursor: "pointer"}}
            aria-label={isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
        >
            {isFavorite ? (
                <>
                <Fab aria-label="like">
                    <FavoriteIcon style={{color: 'red'}}/>
                </Fab>
                </>
                ) : (
                <Fab aria-label="dislike">
                    <FavoriteIcon />
                </Fab>
            )}
        </span>

    );
}

export default FavoriteHeart;