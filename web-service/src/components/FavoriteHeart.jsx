import {Heart, HeartFill} from "react-bootstrap-icons";

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
                <HeartFill size={24} color="red" style={{ stroke: "black", strokeWidth: "0.25" }}/>
            ) : (
                <Heart size={24} color="gray"/>
            )}
        </span>

    );
}

export default FavoriteHeart;