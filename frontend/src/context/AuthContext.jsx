// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");

//         if (storedUser) {
//             try {
//                 const parsedUser = JSON.parse(storedUser);
//                 setUser(parsedUser);
//             } catch (error) {
//                 console.error("Failed to restore user:", error);
//                 localStorage.removeItem("user");
//             }
//         }

//         setLoading(false);
//     }, []);

//     const login = (userData) => {
//         // setUser(userData);
//         // localStorage.setItem("user", JSON.stringify(userData));

//         //save token added
//         localStorage.setItem("token", userData.token);
//         localStorage.setItem("user", JSON.stringify(userData.user));

//         setUser(userData.user);
//     };

//     const logout = () => {

//         //token save removed
//         localStorage.removeItem("token");
//         setUser(null);
//         localStorage.removeItem("user");
//     };

//     const updateUser = (updatedUser) => {
//         setUser(updatedUser);
//         localStorage.setItem("user", JSON.stringify(updatedUser));
//     };

//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 loading,
//                 login,
//                 logout,
//                 updateUser
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// };


//new Context with getting current user from backend without localStorage.getItem("user")
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { getCurrentUser } from "../api/userapi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore authentication when React starts
    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        getCurrentUser()
            .then((userData) => {
                setUser(userData);
            })
            .catch((error) => {
                console.error(
                    "Failed to restore authentication:",
                    error
                );

                localStorage.removeItem("token");
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);


    // Called after successful login
    const login = async (loginData) => {
        localStorage.setItem("token", loginData.token);

        const currentUser = await getCurrentUser();

        setUser(currentUser);

        return currentUser;
    };


    const logout = () => {

        localStorage.removeItem("token");

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