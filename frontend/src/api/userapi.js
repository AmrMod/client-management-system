// src/api/userApi.js
const API_BASE = 'http://localhost:3000';

export const loginUser = async (email, password, role) => {
    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

export const registerUser = async (name, email, password) => {
 
    try {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Registration failed');
        return data; // user info or token
        
    } catch (err) {
        throw err;
    }
};


export const getCurrentUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No authentication token");
    }

    const res = await fetch(`${API_BASE}/users/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    
    

    const data = await res.json();
    

    if (!res.ok) {
        throw new Error(
            data.error || "Failed to get current user"
        );
    }

    return data;
};

// export const getAllUsers = async () => {
//     try {
//         const res = await fetch(`${API_BASE}/users`);
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || 'Failed to fetch users');
//         return data;
//     } catch (err) {
//         throw err;
//     }
// }

//get all users with pagination
// BUG FIX: was calling /users?page=&limit= which hits the getAllUsers route (no pagination).
// The correct backend route for pagination is /users/pagination
// export const getAllUsers = async (page = 1, limit = 10) => {
//     try {
//         const res = await fetch(
//             `${API_BASE}/users?page=${page}&limit=${limit}`
//         );
//
//         const data = await res.json();
//
//         if (!res.ok)
//             throw new Error(data.error || "Failed to fetch users");
//
//         return data;
//     } catch (err) {
//         throw err;
//     }
// };

export const getAllUsers = async (page , limit) => {
    try {
        const res = await fetch(
            `${API_BASE}/users/pagination?page=${page}&limit=${limit}`
        );

        const data = await res.json();

        if (!res.ok)
            throw new Error(data.error || "Failed to fetch users");

        return data;
    } catch (err) {
        throw err;
    }
};


export const createUser = async (name, email, password, role) => {
 
    try {
        const res = await fetch(`${API_BASE}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'User creation failed');
        return data; // user info or token
        
    } catch (err) {
        throw err;
    }
};

export const deleteUser = async (id) => {
    try {
        const res = await fetch(`${API_BASE}/users/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to delete user');
        return data;
    } catch (err) {
        throw err;
    }
}

export const getUserById = async (id) => {
    try {
        const res = await fetch(`${API_BASE}/users/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch user');
        return data;
    } catch (err) {
        throw err;
    }
}

export const updateuserbyadmin = async (id, name, email, password, role) => {
    try {
        const res = await fetch(`${API_BASE}/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update user');
        return data;
    } catch (err) {
        throw err;
    }
}

export const updateclientProfile = async (id, userId, name, email, Phone, company, status) => {
    try {
        const res = await fetch(`${API_BASE}/users/profile/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, userId, name, email, Phone, company, status }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update user');
        return data;
    } catch (err) {
        throw err;
    }
}

export const updatePassword = async (id, currentPassword, password) => {
    try {
        const res = await fetch(`${API_BASE}/users/password/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({currentPassword, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update user');
        return data;
    } catch (err) {
        throw err;
    }
}

// export const getTotalUsers = async () => {
//     try {
//         const res = await fetch(`${API_BASE}/users/totalUsers`);
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || 'Failed to fetch users');
//         return data;
//     } catch (err) {
//         throw err;
//     }
// }

// export const getUsersThisMonth = async () => {
//     try {
//         const res = await fetch(`${API_BASE}/users/users-this-month`);
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || 'Failed to fetch users');
//         return data;
//     } catch (err) {
//         throw err;
//     }
// }

export const getDashboardStats = async () => {
    try {
        const res = await fetch(`${API_BASE}/users/dashboard/stats`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch users');
        return data;
    } catch (err) {
        throw err;
    }
}

export const searchUsers = async (search) => {
    try {
        const res = await fetch(`${API_BASE}/users/search?query=${search}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch user');
        return data;
    } catch (err) {
        throw err;
    }
}


