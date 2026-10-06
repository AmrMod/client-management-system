

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { getCurrentUser, logoutUser } from "../api/userapi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore authentication when React starts
    useEffect(() => {

        getCurrentUser()
            .then((userData) => {
                setUser(userData);
            })
            .catch((error) => {
                console.error(
                    "Failed to restore authentication:",
                    error
                );

                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);


    // Called after successful login
    const login = async (loginData) => {

        const currentUser = await getCurrentUser();

        setUser(currentUser);

        return currentUser;
    };


    const logout = async  () => {
        await logoutUser();
        setUser(null);
    };


    const updateUser = (updatedUser) => {

        setUser(updatedUser);
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};