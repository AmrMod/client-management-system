const API_BASE = "http://localhost:3000";

export const getAllStudents = async (
    page,
    limit,
    search = "",
    sortBy = "id",
    order = "asc"
) => {
    try {
        const res = await fetch(
            `${API_BASE}/students?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&sortBy=${sortBy}&order=${order}`
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error || "Failed to fetch students"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};