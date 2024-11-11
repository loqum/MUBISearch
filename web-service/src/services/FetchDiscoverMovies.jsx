import axios from "axios";

const FetchDiscoverMovies = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/movies/discover");
        console.log("FetchDiscoverMovies response:", response);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};

export default FetchDiscoverMovies;