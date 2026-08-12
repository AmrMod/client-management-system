// src/api/requestApi.js

const API_BASE = 'http://localhost:3000';

export const createRequest = async (
  userId,
  supportUnitId,
  title,
  description,
  priority
) => {
  try {
    const res = await fetch(`${API_BASE}/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
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