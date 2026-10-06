// src/api/userApi.js
const API_BASE = 'http://localhost:3000';

export const loginUser = async (email, password, role) => {
    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password, role }),
        });
        const data = await res.json();
        // if (!res.ok) throw new Error(data.error || 'Login failed');
        if (!res.ok) {
            throw new Error(
                data.details?.[0]?.message ||
                data.error ||
                'Login failed'
            );
        }
        return data; // user info or token
    } catch (err) {
        throw err;
    }
};

export const logoutUser = async () => {
    const res = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            data.error || "Logout failed"
        );
    }

    return data;
};



export const getCurrentUser = async () => {

    const res = await fetch(`${API_BASE}/users/me`, {
        method: "GET",
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            data.error || "Failed to get current user"
        );
    }

    return data;
};
