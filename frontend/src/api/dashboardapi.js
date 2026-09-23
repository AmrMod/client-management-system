const API_BASE = 'http://localhost:3000';

import { authHeaders } from "./apiutils";

export const getStudentDashboardStats = async () => {
    try {
        const res = await fetch(
            `${API_BASE}/dashboard/student`,
            {
                method: "GET",
                headers: authHeaders(),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error || "Failed to fetch dashboard statistics"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};