import {useContext, useState} from "react";
import {MoviesContext} from "../context/movies.context.jsx";

function DetailsWrapper(DetailsComponent) {
    function NewComponent(props) {
        const {urlImage} = useContext(MoviesContext);
        const formatDate = (date) => {
            return new Intl.DateTimeFormat('es-ES').format(new Date(date));
        }

        return (
            <DetailsComponent urlImage={urlImage} formatDate={formatDate} />
        )
    }

    return NewComponent;
}

export default DetailsWrapper;