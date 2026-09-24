const API_BASE = 'http://localhost:3000';

import { authHeaders } from "./apiutils";

export const getStudentDashboardStats = async () => {
    try {
        const res = await fetch(
            `${API_BASE}/dashboard/student`,
            {
                method: "GET",
                credentials: "include"

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

export const getSupportDashboardData = async () => {
    try {
        const res = await fetch(
            `${API_BASE}/dashboard/staff`,
            {
                method: "GET",
                headers: authHeaders(),
                credentials: "include",
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error || "Failed to fetch support dashboard data"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};

export const getManagerDashboardData = async () => {
    try {
        const res = await fetch(
            `${API_BASE}/dashboard/manager`,
            {
                method: "GET",
                headers: authHeaders(),
                credentials: "include",
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error || "Failed to fetch manager dashboard data"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};

export const getAdminDashboardData = async () => {
    try {
        const res = await fetch(
            `${API_BASE}/dashboard/admin`,
            {
                method: "GET",
                headers: authHeaders(),
                credentials: "include",
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error || "Failed to fetch admin dashboard data"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};