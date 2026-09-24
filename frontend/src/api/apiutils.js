// export const authHeaders = () => {
//     const token = localStorage.getItem("token");

//     return {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//     };
// };

export const authHeaders = () => {
    return {
        "Content-Type": "application/json",       

    };
};