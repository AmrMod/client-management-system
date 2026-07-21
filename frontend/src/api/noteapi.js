// src/api/noteApi.js
const API_BASE = 'http://localhost:3000';

export const getNotesByUserId = async (userId) => {
    try {
        const res = await fetch(`${API_BASE}/notes/user/${userId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch notes');
        return data;
    } catch (err) {
        throw err;
    }
};

export const getNoteById = async (id) => {
    try {
        const res = await fetch(`${API_BASE}/notes/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch note');
        return data;
    } catch (err) {
        throw err;
    }
};

export const createNote = async (userId, title, content) => {
    try {
        const res = await fetch(`${API_BASE}/notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, title, content }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create note');
        return data;
    } catch (err) {
        throw err;
    }
};

export const updateNote = async (id, title, content) => {
    try {
        const res = await fetch(`${API_BASE}/notes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update note');
        return data;
    } catch (err) {
        throw err;
    }
};

export const deleteNote = async (id) => {
    try {
        const res = await fetch(`${API_BASE}/notes/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to delete note');
        return data;
    } catch (err) {
        throw err;
    }
};
