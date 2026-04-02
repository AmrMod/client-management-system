// src/api/userApi.js
export const loginUser = async (email, password) => {
    try {
        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
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



