// src/api/requestApi.js

const API_BASE = 'http://localhost:3000';
import { authHeaders } from "./apiutils";



//with attachemnt 
export const createRequest = async (
  supportUnitId,
  title,
  description,
  priority,
  attachment
) => {
  try {
    const formData = new FormData();

    formData.append("supportUnitId", supportUnitId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("priority", priority);

    if (attachment) {
      formData.append("attachment", attachment);
    }

    const res = await fetch(`${API_BASE}/requests`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.details?.[0]?.message ||
        data.error ||
        "Failed to create request"
      );
    }

    return data;
  } catch (err) {
    throw err;
  }
};



export const getRecentRequests = async () => {
  try {
    const res = await fetch(`${API_BASE}/requests/recent`, {
      method: "GET",
      headers: authHeaders(),
      credentials: "include",
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

export const getMyRequests = async (
    page,
    limit,
    search = "",
    sortBy = "createdAt",
    order = "asc"
) => {
    try {
        const res = await fetch(
            `${API_BASE}/requests?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&sortBy=${sortBy}&order=${order}`,
            {
                method: "GET",
                headers: authHeaders(),
                credentials: "include",
            }
        );

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



export const getManagerRequests = async ({
    page = 1,
    limit = 10,
    search = "",
    status,
    priority,
    sortBy = "createdAt",
    order = "desc"
} = {}) => {

    const params = new URLSearchParams();

    params.append("page", page);
    params.append("limit", limit);

    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (priority) params.append("priority", priority);

    params.append("sortBy", sortBy);
    params.append("order", order);

    const res = await fetch(
        `${API_BASE}/requests/manager?${params.toString()}`,
        {
            method: "GET",
            headers: authHeaders(),
            credentials: "include",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            data.error || "Failed to fetch requests"
        );
    }

    return data;
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
            credentials: "include",
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
                credentials: "include",
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



export const getSupportRequests = async ({
    page = 1,
    limit = 10,
    search = "",
    status,
    priority,
    sortBy = "createdAt",
    order = "desc"
} = {}) => {

    const params = new URLSearchParams({
        page,
        limit,
        search,
        sortBy,
        order
    });

    if (status) {
        params.append("status", status);
    }

    if (priority) {
        params.append("priority", priority);
    }

    try {
        const res = await fetch(
            `${API_BASE}/requests/my-assigned?${params.toString()}`,
            {
                method: "GET",
                headers: authHeaders(),
                credentials: "include",
            }
        );

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
                credentials: "include",
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

export const downloadRequestAttachment = async (requestId) => {
    const res = await fetch(
        `${API_BASE}/requests/${requestId}/attachment`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to download attachment");
    }

    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "attachment";
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
};

export const getManagerStudentSummary = async ({
    page = 1,
    limit = 10,
    search = ""
} = {}) => {

    const params = new URLSearchParams();

    params.append("page", page);
    params.append("limit", limit);

    if (search) {
        params.append("search", search);
    }

    const res = await fetch(
        `${API_BASE}/requests/manager/student-summary?${params.toString()}`,
        {
            method: "GET",
            headers: authHeaders(),
            credentials: "include",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            data.error || "Failed to fetch student summary"
        );
    }

    return data;
};

export const getManagerStaffSummary = async ({
    page = 1,
    limit = 10,
    search = "",
    sortBy = "name",
    order = "asc"
} = {}) => {

    const params = new URLSearchParams();

    params.append("page", page);
    params.append("limit", limit);

    if (search) {
        params.append("search", search);
    }

    params.append("sortBy", sortBy);
    params.append("order", order);

    const res = await fetch(
        `${API_BASE}/requests/manager/staff-summary?${params.toString()}`,
        {
            method: "GET",
            headers: authHeaders(),
            credentials: "include",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            data.error || "Failed to fetch staff summary"
        );
    }

    return data;
};

export const getAdminRequests = async ({
    page = 1,
    limit = 10,
    search = "",
    status,
    priority,
    supportUnitId,
    sortBy = "createdAt",
    order = "desc"
} = {}) => {

    const params = new URLSearchParams();

    params.append("page", page);
    params.append("limit", limit);

    if (search) {
        params.append("search", search);
    }

    if (status) {
        params.append("status", status);
    }

    if (priority) {
        params.append("priority", priority);
    }

    if (supportUnitId) {
        params.append("supportUnitId", supportUnitId);
    }

    params.append("sortBy", sortBy);
    params.append("order", order);

    const res = await fetch(
        `${API_BASE}/requests/admin?${params.toString()}`,
        {
            method: "GET",
            headers: authHeaders(),
            credentials: "include",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            data.error || "Failed to fetch admin requests"
        );
    }

    return data;
};