import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    getAdminRequests,
    getSupportUnits
} from "@/api/requestapi";

const AllRequests = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [supportUnitId, setSupportUnitId] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [order, setOrder] = useState("desc");

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: [
            "adminRequests",
            page,
            search,
            status,
            priority,
            supportUnitId,
            sortBy,
            order
        ],
        queryFn: () =>
            getAdminRequests({
                page,
                limit: 10,
                search,
                status,
                priority,
                supportUnitId,
                sortBy,
                order
            })
    });

    const {
        data: supportUnits = [],
        isLoading: supportUnitsLoading
    } = useQuery({
        queryKey: ["supportUnits"],
        queryFn: getSupportUnits
    });

    const requests = data?.requests || [];
    const totalPages = data?.totalPages || 1;

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        setPage(1);
    };

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
        setPage(1);
    };

    const handleSupportUnitChange = (e) => {
        setSupportUnitId(e.target.value);
        setPage(1);
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setOrder((currentOrder) =>
                currentOrder === "asc" ? "desc" : "asc"
            );
        } else {
            setSortBy(field);
            setOrder("asc");
        }

        setPage(1);
    };

    const getStatusClass = (requestStatus) => {
        switch (requestStatus) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-700";

            case "IN_PROGRESS":
                return "bg-blue-100 text-blue-700";

            case "RESOLVED":
                return "bg-green-100 text-green-700";

            case "REJECTED":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getPriorityClass = (requestPriority) => {
        switch (requestPriority) {
            case "HIGH":
                return "bg-red-100 text-red-700";

            case "MEDIUM":
                return "bg-yellow-100 text-yellow-700";

            case "LOW":
                return "bg-green-100 text-green-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    const getSortIcon = (field) => {
        if (sortBy !== field) {
            return "↕";
        }

        return order === "asc" ? "↑" : "↓";
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        All Requests
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        View and manage all support requests.
                    </p>
                </div>

                <div className="rounded-lg border bg-card p-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        Loading requests...
                    </p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        All Requests
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        View and manage all support requests.
                    </p>
                </div>

                <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                    <p className="font-medium text-red-700">
                        Failed to load requests
                    </p>

                    <p className="mt-1 text-sm text-red-600">
                        {error.message}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">
                    All Requests
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    View and monitor all student support requests.
                </p>
            </div>

            {/* Filters */}
            <div className="rounded-lg border bg-card p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                    {/* Search */}
                    <div className="lg:col-span-2">
                        <label className="mb-2 block text-sm font-medium">
                            Search
                        </label>

                        <input
                            type="text"
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search by title, student name or ID..."
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={handleStatusChange}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value="">
                                All statuses
                            </option>

                            <option value="PENDING">
                                Pending
                            </option>

                            <option value="IN_PROGRESS">
                                In Progress
                            </option>

                            <option value="RESOLVED">
                                Resolved
                            </option>

                            <option value="REJECTED">
                                Rejected
                            </option>
                        </select>
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Priority
                        </label>

                        <select
                            value={priority}
                            onChange={handlePriorityChange}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value="">
                                All priorities
                            </option>

                            <option value="HIGH">
                                High
                            </option>

                            <option value="MEDIUM">
                                Medium
                            </option>

                            <option value="LOW">
                                Low
                            </option>
                        </select>
                    </div>

                    {/* Support Unit */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Support Unit
                        </label>

                        <select
                            value={supportUnitId}
                            onChange={handleSupportUnitChange}
                            disabled={supportUnitsLoading}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value="">
                                All support units
                            </option>

                            {supportUnits.map((unit) => (
                                <option
                                    key={unit.id}
                                    value={unit.id}
                                >
                                    {unit.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Request count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {data?.totalRequests || 0} request
                    {data?.totalRequests === 1 ? "" : "s"} found
                </p>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg border bg-card">

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">

                        <thead className="border-b bg-muted/50">
                            <tr>

                                <th className="px-4 py-3 text-left font-medium">
                                    ID
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    Request
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    Student
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    Support Unit
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    <button
                                        onClick={() =>
                                            handleSort("priority")
                                        }
                                        className="flex items-center gap-1"
                                    >
                                        Priority
                                        <span>
                                            {getSortIcon("priority")}
                                        </span>
                                    </button>
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    <button
                                        onClick={() =>
                                            handleSort("status")
                                        }
                                        className="flex items-center gap-1"
                                    >
                                        Status
                                        <span>
                                            {getSortIcon("status")}
                                        </span>
                                    </button>
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    Assigned To
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    <button
                                        onClick={() =>
                                            handleSort("createdAt")
                                        }
                                        className="flex items-center gap-1"
                                    >
                                        Created
                                        <span>
                                            {getSortIcon("createdAt")}
                                        </span>
                                    </button>
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    Files
                                </th>

                            </tr>
                        </thead>

                        <tbody className="divide-y">

                            {requests.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="9"
                                        className="px-4 py-10 text-center text-muted-foreground"
                                    >
                                        No requests found.
                                    </td>
                                </tr>
                            ) : (
                                requests.map((request) => (
                                    <tr
                                        key={request.id}
                                        className="hover:bg-muted/30"
                                    >

                                        <td className="px-4 py-4 font-medium">
                                            #{request.id}
                                        </td>

                                        <td className="max-w-xs px-4 py-4">
                                            <p className="truncate font-medium">
                                                {request.title}
                                            </p>
                                        </td>

                                        <td className="px-4 py-4">
                                            <div>
                                                <p className="font-medium">
                                                    {request.student.name}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {request.student.studentId}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4">
                                            {request.supportUnit.name}
                                        </td>

                                        <td className="px-4 py-4">
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${getPriorityClass(
                                                    request.priority
                                                )}`}
                                            >
                                                {request.priority}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4">
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                                    request.status
                                                )}`}
                                            >
                                                {request.status.replace(
                                                    "_",
                                                    " "
                                                )}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4">
                                            {request.assignedStaff ? (
                                                request.assignedStaff.name
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    Unassigned
                                                </span>
                                            )}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                                            {formatDate(
                                                request.createdAt
                                            )}
                                        </td>

                                        <td className="px-4 py-4">
                                            {request.attachments?.length > 0 ? (
                                                <span className="text-sm font-medium">
                                                    {request.attachments.length}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    —
                                                </span>
                                            )}
                                        </td>

                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">

                    <p className="text-sm text-muted-foreground">
                        Page {data.currentPage} of {totalPages}
                    </p>

                    <div className="flex items-center gap-2">

                        <button
                            onClick={() =>
                                setPage((currentPage) =>
                                    Math.max(currentPage - 1, 1)
                                )
                            }
                            disabled={page === 1}
                            className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        ).map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() =>
                                    setPage(pageNumber)
                                }
                                className={`rounded-md px-3 py-2 text-sm ${
                                    page === pageNumber
                                        ? "bg-primary text-primary-foreground"
                                        : "border hover:bg-muted"
                                }`}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        <button
                            onClick={() =>
                                setPage((currentPage) =>
                                    Math.min(
                                        currentPage + 1,
                                        totalPages
                                    )
                                )
                            }
                            disabled={page === totalPages}
                            className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
};

export default AllRequests;