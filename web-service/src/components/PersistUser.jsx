import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import axios from "axios";

export const PersistUser = () => {
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        const persistUser = async () => {
            if (isAuthenticated) {
                const token = await getAccessTokenSilently();
                const response = await axios.get(
                    `http://localhost:8080/api/v1/users/exists/${user.sub}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.data) {
                    await axios({
                        method: "post",
                        url: "http://localhost:8080/api/v1/users/create",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        data: {
                            sub: user.sub,
                            name: user.nickname,
                            email: user.email,
                        },

                    });
                }

            }
        }
        persistUser();

    }, [isAuthenticated]);

    return null;
}