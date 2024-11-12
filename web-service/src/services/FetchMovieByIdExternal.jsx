import axios from "axios";

const FetchMoviesByIdExternal = async (idExternal) => {
    try {
        if (idExternal) {
            const response = await axios.get(`http://localhost:8080/api/v1/movies/idExternal/${idExternal}`);
            console.log("FetchMovieByIdExternal response:", response);
            return response.data.data;
        }
    } catch (error) {
        console.error("Error fetching movie:", error);
        throw error;
    }
};

export default FetchMoviesByIdExternal;