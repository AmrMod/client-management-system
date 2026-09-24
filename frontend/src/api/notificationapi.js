const API_BASE = 'http://localhost:3000';

import { authHeaders } from "./apiutils";

export const getMyNotifications = async () => {
    try {
        const res = await fetch(
            `${API_BASE}/notifications`,
            {
                method: "GET",
                headers: authHeaders(),
                credentials: "include",
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error || "Failed to fetch notifications"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};

export const markNotificationAsRead = async (notificationId) => {
    try {
        const res = await fetch(
            `${API_BASE}/notifications/${notificationId}/read`,
            {
                method: "PATCH",
                headers: authHeaders(),
                credentials: "include",
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error || "Failed to mark notification as read"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};