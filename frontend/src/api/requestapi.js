// src/api/requestApi.js

const API_BASE = 'http://localhost:3000';
import { authHeaders } from "./apiutils";

export const createRequest = async (
  
  supportUnitId,
  title,
  description,
  priority

  

) => {
  try {
    const res = await fetch(`${API_BASE}/requests`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        supportUnitId,
        title,
        description,
        priority,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to create request");
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const getMyRequests = async () => {
  try {
    const res = await fetch(`${API_BASE}/requests`, {
      method: "GET",
      headers: authHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch requests");
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const getManagerRequests = async () => {
    try {
        const res = await fetch(`${API_BASE}/requests/manager`, {
            method: "GET",
            headers: authHeaders(),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error || "Failed to fetch requests"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};

export const getSupportUnits = async () => {
  try {
    const res = await fetch(`${API_BASE}/requests/support-units`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch support units");
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const getSupportStaff = async () => {
    try {
        const res = await fetch(`${API_BASE}/requests/staff`, {
            method: "GET",
            headers: authHeaders(),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error || "Failed to fetch support staff"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};

export const assignRequest = async (requestId, staffId) => {
    try {
        const res = await fetch(
            `${API_BASE}/requests/${requestId}/assign`,
            {
                method: "PATCH",
                headers: authHeaders(),
                body: JSON.stringify({
                    staffId,
                }),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error || "Failed to assign request"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};

export const getSupportRequests = async () => {
    try {
        const res = await fetch(`${API_BASE}/requests/my-assigned`, {
            method: "GET",
            headers: authHeaders(),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error || "Failed to fetch assigned requests"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};


export const updateRequestStatus = async (requestId, status) => {
    try {
        const res = await fetch(
            `${API_BASE}/requests/${requestId}/status`,
            {
                method: "PATCH",
                headers: authHeaders(),
                body: JSON.stringify({
                    status,
                }),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.error || "Failed to update request status"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};