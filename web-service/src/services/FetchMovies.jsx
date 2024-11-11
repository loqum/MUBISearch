import axios from "axios";

const FetchMovies = async (title) => {
    try {
        if (title) {
            const response = await axios.get(`http://localhost:8080/api/v1/movies/title/${title}`);
            console.log("FetchDiscoverMovies response:", response);
            return response.data.data;
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};

export default FetchMovies;