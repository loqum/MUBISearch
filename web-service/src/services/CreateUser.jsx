import axios from "axios";

const CreateUser = async (user) => {
    try {
        if (user) {
            const response = await axios.post(`http://localhost:8080/api/v1/user/title/${title}`);
            console.log("FetchDiscoverMovies response:", response);
            return response.data.data;
        }
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export default CreateUser;