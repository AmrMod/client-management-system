
// src/api/conversationApi.js

const API_BASE = 'http://localhost:3000';

import { authHeaders } from "./apiutils";


// Create a conversation
export const createConversation = async (supportUnitId) => {
    try {
        const res = await fetch(`${API_BASE}/conversations`, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify({
                supportUnitId,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.details?.[0]?.message ||
                data.error ||
                "Failed to create conversation"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};


// Get my conversations
export const getMyConversations = async () => {
    try {
        const res = await fetch(`${API_BASE}/conversations`, {
            method: "GET",
            headers: authHeaders(),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error ||
                "Failed to fetch conversations"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};

// Get conversations for staff's support unit
export const getStaffConversations = async () => {
    try {
        const res = await fetch(
            `${API_BASE}/conversations/staff`,
            {
                method: "GET",
                headers: authHeaders(),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error ||
                "Failed to fetch staff conversations"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};


// Send a message
export const createMessage = async (conversationId, content) => {
    try {
        const res = await fetch(
            `${API_BASE}/conversations/${conversationId}/messages`,
            {
                method: "POST",
                headers: authHeaders(),
                body: JSON.stringify({
                    content,
                }),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.details?.[0]?.message ||
                data.error ||
                "Failed to send message"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};


// Get messages for a conversation
export const getMessages = async (conversationId) => {
    try {
        const res = await fetch(
            `${API_BASE}/conversations/${conversationId}/messages`,
            {
                method: "GET",
                headers: authHeaders(),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error ||
                "Failed to fetch messages"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};

export const getAllConversations = async () => {
    try {
        const res = await fetch(
            `${API_BASE}/conversations/admin`,
            {
                method: "GET",
                headers: authHeaders(),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error ||
                "Failed to fetch conversations"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};

