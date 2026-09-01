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

    // if (!res.ok) {
    //     console.log("Validation response:", data);

    //   throw new Error(data.error || "Failed to create request");
    // }
    if (!res.ok) {
            throw new Error(
                data.details?.[0]?.message ||
                data.error ||
                'Failed to create request'
            );
        }

    return data;
  } catch (err) {
    throw err;
  }
};

// export const getMyRequests = async () => {
//   try {
//     const res = await fetch(`${API_BASE}/requests`, {
//       method: "GET",
//       headers: authHeaders(),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.error || "Failed to fetch requests");
//     }

//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

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

// export const getManagerRequests = async () => {
//     try {
//         const res = await fetch(`${API_BASE}/requests/manager`, {
//             method: "GET",
//             headers: authHeaders(),
//         });

//         const data = await res.json();

//         if (!res.ok) {
//             throw new Error(
//                 data.error || "Failed to fetch requests"
//             );
//         }

//         return data;

//     } catch (err) {
//         throw err;
//     }
// };

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

// export const getSupportRequests = async () => {
//     try {
//         const res = await fetch(`${API_BASE}/requests/my-assigned`, {
//             method: "GET",
//             headers: authHeaders(),
//         });

//         const data = await res.json();

//         if (!res.ok) {
//             throw new Error(
//                 data.error || "Failed to fetch assigned requests"
//             );
//         }

//         return data;

//     } catch (err) {
//         throw err;
//     }
// };

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