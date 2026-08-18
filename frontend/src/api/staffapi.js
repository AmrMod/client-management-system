// const API_BASE = "http://localhost:3000";

// export const getAllStaff = async (page, limit) => {
//     try {
//         const res = await fetch(
//             `${API_BASE}/staff?page=${page}&limit=${limit}`
//         );

//         const data = await res.json();

//         if (!res.ok) {
//             throw new Error(data.error || "Failed to fetch staff");
//         }

//         return data;
//     } catch (err) {
//         throw err;
//     }
// };

const API_BASE = "http://localhost:3000";

export const getAllStaff = async (
    page,
    limit,
    search,
    sortBy,
    order
) => {
    try {
        const res = await fetch(
            `${API_BASE}/staff?page=${page}&limit=${limit}&search=${encodeURIComponent(
                search
            )}&sortBy=${sortBy}&order=${order}`
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "Failed to fetch staff");
        }

        return data;
    } catch (err) {
        throw err;
    }
};