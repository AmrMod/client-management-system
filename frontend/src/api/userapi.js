// src/api/userApi.js
export const loginUser = async (email, password, role) => {
    try {
        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');
        return data; // user info or token
    } catch (err) {
        throw err;
    }
};

export const registerUser = async (name, email, password) => {
 
    try {
        const res = await fetch('http://localhost:3000/register', {
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

export const getAllUsers = async () => {
    try {
        const res = await fetch('http://localhost:3000/users');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch users');
        return data;
    } catch (err) {
        throw err;
    }
}

export const createUser = async (name, email, password, role) => {
 
    try {
        const res = await fetch('http://localhost:3000/createUserByAdmin', {
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
        //fetch("http://localhost:3000/users/" + id);
        const res = await fetch(`http://localhost:3000/users/${id}`, {
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

export const getupdateUser = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/getupdateUser/${id}`, {
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
        const res = await fetch(`http://localhost:3000/updateuserbyadmin/${id}`, {
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
        const res = await fetch(`http://localhost:3000/updateclientprofile/${id}`, {
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
        const res = await fetch(`http://localhost:3000/updatePassword/${id}`, {
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


