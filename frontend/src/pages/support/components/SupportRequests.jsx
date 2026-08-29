// import { useEffect, useState } from "react";

// import {
//     Card,
//     CardContent,
// } from "@/components/ui/card";

// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";

// import {
//     getSupportRequests,
//     updateRequestStatus
// } from "@/api/requestapi";

// import { Button } from "@/components/ui/button";

// const SupportRequests = () => {

//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const loadRequests = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);

//                 const data = await getSupportRequests();

//                 setRequests(data);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadRequests();
//     }, []);

//     const handleStatusChange = async (requestId, status) => {
//         try {

//             const updatedRequest = await updateRequestStatus(
//                 requestId,
//                 status
//             );

//             setRequests((currentRequests) =>
//                 currentRequests.map((request) =>
//                     request.id === requestId
//                         ? updatedRequest
//                         : request
//                 )
//             );

//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     if (error) {
//         return (
//             <div className="p-6">
//                 <p className="text-red-500">Error: {error}</p>
//             </div>
//         );
//     }


//     return (
//         <div className="space-y-8 animate-in fade-in duration-300">

//             <div className="flex items-center justify-between">
//                 <div>
//                     <h1 className="text-3xl font-bold tracking-tight text-foreground">
//                         Assigned Requests
//                     </h1>

//                     <p className="text-muted-foreground mt-1">
//                         Manage and resolve requests assigned to you.
//                     </p>
//                 </div>
//             </div>

//             <Card>
//                 <CardContent className="p-0">
//                     <Table>

//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead>Request ID</TableHead>
//                                 <TableHead>Student</TableHead>
//                                 <TableHead>Subject</TableHead>
//                                 <TableHead>Priority</TableHead>
//                                 <TableHead>Status</TableHead>
//                                 <TableHead>Date Created</TableHead>
//                                 <TableHead>Actions</TableHead>
//                             </TableRow>
//                         </TableHeader>

//                         <TableBody>

//                             {requests.map((request) => (
//                                 <TableRow key={request.id}>

//                                     <TableCell className="font-semibold">
//                                         {request.id}
//                                     </TableCell>

//                                     <TableCell>
//                                         {request.student?.name || "N/A"}
//                                     </TableCell>

//                                     <TableCell>
//                                         {request.title}
//                                     </TableCell>

//                                     <TableCell>
//                                         <span
//                                             className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${request.priority === "HIGH" ||
//                                                     request.priority === "URGENT"
//                                                 ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
//                                                 : request.priority === "MEDIUM"
//                                                     ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
//                                                     : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
//                                                 }`}
//                                         >
//                                             {request.priority}
//                                         </span>
//                                     </TableCell>

//                                     <TableCell>
//                                         <span
//                                             className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${request.status === "PENDING"
//                                                     ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
//                                                     : request.status === "IN_PROGRESS"
//                                                         ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
//                                                         : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
//                                                 }`}
//                                         >
//                                             {request.status}
//                                         </span>
//                                     </TableCell>

//                                     <TableCell className="text-muted-foreground">
//                                         {new Date(request.createdAt).toLocaleDateString()}
//                                     </TableCell>

//                                     <TableCell>
//                                         <select
//                                             value={request.status}
//                                             onChange={(e) =>
//                                                 handleStatusChange(
//                                                     request.id,
//                                                     e.target.value
//                                                 )
//                                             }
//                                             disabled={
//                                                 request.status === "RESOLVED" ||
//                                                 request.status === "REJECTED"
//                                             }
//                                             className="border rounded-md px-3 py-2 text-sm"
//                                         >
//                                             <option value="PENDING">
//                                                 Pending
//                                             </option>

//                                             <option value="IN_PROGRESS">
//                                                 In Progress
//                                             </option>

//                                             <option value="RESOLVED">
//                                                 Resolved
//                                             </option>

//                                             <option value="REJECTED">
//                                                 Rejected
//                                             </option>
//                                         </select>
//                                     </TableCell>

//                                 </TableRow>
//                             ))}

//                         </TableBody>

//                     </Table>
//                 </CardContent>
//             </Card>

//         </div>
//     );

// }

// export default SupportRequests;


import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
    getSupportRequests,
    updateRequestStatus,
} from "@/api/requestapi";

import {
    Search,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    ClipboardList,
    Clock,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";


const SupportRequests = () => {

    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const [error, setError] = useState(null);

    // Pagination
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [pagination, setPagination] = useState(null);

    // Filters
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");

    // Sorting
    const [sortBy, setSortBy] = useState("createdAt");
    const [order, setOrder] = useState("desc");


    /*
    |--------------------------------------------------------------------------
    | Fetch Requests
    |--------------------------------------------------------------------------
    */

    const loadRequests = async () => {

        try {

            setLoading(true);
            setError(null);

            const data = await getSupportRequests({
                page,
                limit,
                search,
                status,
                priority,
                sortBy,
                order,
            });

            setRequests(data.requests);
            setPagination(data.pagination);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadRequests();

    }, [
        page,
        limit,
        search,
        status,
        priority,
        sortBy,
        order,
    ]);


    /*
    |--------------------------------------------------------------------------
    | Status Update
    |--------------------------------------------------------------------------
    */

    const handleStatusChange = async (requestId, newStatus) => {

        try {

            setUpdatingId(requestId);
            setError(null);

            const updatedRequest =
                await updateRequestStatus(
                    requestId,
                    newStatus
                );

            setRequests((currentRequests) =>
                currentRequests.map((request) =>
                    request.id === requestId
                        ? {
                            ...request,
                            ...updatedRequest,
                        }
                        : request
                )
            );

        } catch (error) {

            setError(error.message);

        } finally {

            setUpdatingId(null);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Sorting
    |--------------------------------------------------------------------------
    */

    const handleSort = (column) => {

        if (sortBy === column) {

            setOrder((currentOrder) =>
                currentOrder === "asc"
                    ? "desc"
                    : "asc"
            );

        } else {

            setSortBy(column);
            setOrder("asc");

        }

        setPage(1);

    };


    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    const handleSearch = (e) => {

        setSearch(e.target.value);
        setPage(1);

    };


    const handleStatusFilter = (e) => {

        setStatus(e.target.value);
        setPage(1);

    };


    const handlePriorityFilter = (e) => {

        setPriority(e.target.value);
        setPage(1);

    };


    const clearFilters = () => {

        setSearch("");
        setStatus("");
        setPriority("");
        setSortBy("createdAt");
        setOrder("desc");
        setPage(1);

    };


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading && requests.length === 0) {

        return (
            <div className="space-y-8 animate-in fade-in duration-300">

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Assigned Requests
                    </h1>

                    <p className="text-muted-foreground mt-1">
                        Manage and resolve requests assigned to you.
                    </p>
                </div>

                <Card>

                    <CardContent className="p-8">

                        <div className="flex items-center justify-center">

                            <div className="flex items-center gap-3 text-muted-foreground">

                                <RefreshCw
                                    className="h-5 w-5 animate-spin"
                                />

                                Loading requests...

                            </div>

                        </div>

                    </CardContent>

                </Card>

            </div>
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (error && requests.length === 0) {

        return (
            <div className="space-y-8">

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Assigned Requests
                    </h1>

                    <p className="text-muted-foreground mt-1">
                        Manage and resolve requests assigned to you.
                    </p>
                </div>

                <Card>

                    <CardContent className="p-8">

                        <div className="flex flex-col items-center justify-center gap-4 text-center">

                            <AlertCircle className="h-10 w-10 text-red-500" />

                            <div>

                                <p className="font-semibold">
                                    Failed to load requests
                                </p>

                                <p className="text-sm text-muted-foreground mt-1">
                                    {error}
                                </p>

                            </div>

                            <Button onClick={loadRequests}>
                                Try Again
                            </Button>

                        </div>

                    </CardContent>

                </Card>

            </div>
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    */

    const totalRequests = pagination?.total || 0;

    const pendingCount =
        requests.filter(
            (request) => request.status === "PENDING"
        ).length;

    const inProgressCount =
        requests.filter(
            (request) => request.status === "IN_PROGRESS"
        ).length;

    const resolvedCount =
        requests.filter(
            (request) => request.status === "RESOLVED"
        ).length;


    return (

        <div className="space-y-8 animate-in fade-in duration-300">


            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-3xl font-bold tracking-tight">
                        Assigned Requests
                    </h1>

                    <p className="text-muted-foreground mt-1">
                        Manage and resolve student requests assigned to you.
                    </p>

                </div>

                <Button
                    variant="outline"
                    onClick={loadRequests}
                    disabled={loading}
                >

                    <RefreshCw
                        className={`mr-2 h-4 w-4 ${
                            loading ? "animate-spin" : ""
                        }`}
                    />

                    Refresh

                </Button>

            </div>


            {/* Statistics */}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">


                <Card>

                    <CardContent className="p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-muted-foreground">
                                    Total Requests
                                </p>

                                <p className="text-2xl font-bold mt-2">
                                    {totalRequests}
                                </p>

                            </div>

                            <div className="rounded-full bg-primary/10 p-3">

                                <ClipboardList className="h-5 w-5 text-primary" />

                            </div>

                        </div>

                    </CardContent>

                </Card>


                <Card>

                    <CardContent className="p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-muted-foreground">
                                    Pending
                                </p>

                                <p className="text-2xl font-bold mt-2">
                                    {pendingCount}
                                </p>

                            </div>

                            <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 p-3">

                                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />

                            </div>

                        </div>

                    </CardContent>

                </Card>


                <Card>

                    <CardContent className="p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-muted-foreground">
                                    In Progress
                                </p>

                                <p className="text-2xl font-bold mt-2">
                                    {inProgressCount}
                                </p>

                            </div>

                            <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">

                                <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />

                            </div>

                        </div>

                    </CardContent>

                </Card>


                <Card>

                    <CardContent className="p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-muted-foreground">
                                    Resolved
                                </p>

                                <p className="text-2xl font-bold mt-2">
                                    {resolvedCount}
                                </p>

                            </div>

                            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">

                                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />

                            </div>

                        </div>

                    </CardContent>

                </Card>

            </div>


            {/* Requests */}

            <Card>

                <CardHeader>

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        <div>

                            <CardTitle>
                                My Assigned Requests
                            </CardTitle>

                            <p className="text-sm text-muted-foreground mt-1">
                                View and manage requests assigned to you.
                            </p>

                        </div>

                    </div>


                    {/* Filters */}

                    <div className="flex flex-col gap-3 pt-4 md:flex-row">


                        {/* Search */}

                        <div className="relative flex-1">

                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <input
                                type="text"
                                placeholder="Search requests..."
                                value={search}
                                onChange={handleSearch}
                                className="w-full rounded-md border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                            />

                        </div>


                        {/* Status */}

                        <select
                            value={status}
                            onChange={handleStatusFilter}
                            className="rounded-md border bg-background px-3 py-2 text-sm"
                        >

                            <option value="">
                                All Statuses
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


                        {/* Priority */}

                        <select
                            value={priority}
                            onChange={handlePriorityFilter}
                            className="rounded-md border bg-background px-3 py-2 text-sm"
                        >

                            <option value="">
                                All Priorities
                            </option>

                            <option value="LOW">
                                Low
                            </option>

                            <option value="MEDIUM">
                                Medium
                            </option>

                            <option value="HIGH">
                                High
                            </option>

                            <option value="URGENT">
                                Urgent
                            </option>

                        </select>


                        {/* Clear */}

                        {(search || status || priority) && (

                            <Button
                                variant="outline"
                                onClick={clearFilters}
                            >
                                Clear
                            </Button>

                        )}

                    </div>

                </CardHeader>


                <CardContent className="p-0">


                    {/* Error while refreshing */}

                    {error && (

                        <div className="mx-6 mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">

                            {error}

                        </div>

                    )}


                    <div className="overflow-x-auto">

                        <Table>

                            <TableHeader>

                                <TableRow>


                                    <TableHead>

                                        <button
                                            onClick={() => handleSort("id")}
                                            className="flex items-center gap-1 hover:text-foreground"
                                        >

                                            Request

                                            <ArrowUpDown className="h-3.5 w-3.5" />

                                        </button>

                                    </TableHead>


                                    <TableHead>
                                        Student
                                    </TableHead>


                                    <TableHead>

                                        <button
                                            onClick={() => handleSort("title")}
                                            className="flex items-center gap-1 hover:text-foreground"
                                        >

                                            Subject

                                            <ArrowUpDown className="h-3.5 w-3.5" />

                                        </button>

                                    </TableHead>


                                    <TableHead>

                                        <button
                                            onClick={() => handleSort("priority")}
                                            className="flex items-center gap-1 hover:text-foreground"
                                        >

                                            Priority

                                            <ArrowUpDown className="h-3.5 w-3.5" />

                                        </button>

                                    </TableHead>


                                    <TableHead>

                                        <button
                                            onClick={() => handleSort("status")}
                                            className="flex items-center gap-1 hover:text-foreground"
                                        >

                                            Status

                                            <ArrowUpDown className="h-3.5 w-3.5" />

                                        </button>

                                    </TableHead>


                                    <TableHead>

                                        <button
                                            onClick={() => handleSort("createdAt")}
                                            className="flex items-center gap-1 hover:text-foreground"
                                        >

                                            Date

                                            <ArrowUpDown className="h-3.5 w-3.5" />

                                        </button>

                                    </TableHead>


                                    <TableHead>
                                        Action
                                    </TableHead>

                                </TableRow>

                            </TableHeader>


                            <TableBody>


                                {requests.length === 0 ? (

                                    <TableRow>

                                        <TableCell
                                            colSpan={7}
                                            className="h-32 text-center"
                                        >

                                            <div className="flex flex-col items-center gap-2">

                                                <ClipboardList className="h-8 w-8 text-muted-foreground" />

                                                <p className="font-medium">
                                                    No requests found
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    Try changing your filters or search.
                                                </p>

                                            </div>

                                        </TableCell>

                                    </TableRow>

                                ) : (

                                    requests.map((request) => (

                                        <TableRow key={request.id}>


                                            <TableCell className="font-semibold">
                                                #{request.id}
                                            </TableCell>


                                            <TableCell>

                                                <div>

                                                    <p className="font-medium">
                                                        {request.student?.name || "N/A"}
                                                    </p>

                                                    {request.student?.studentId && (

                                                        <p className="text-xs text-muted-foreground">
                                                            {request.student.studentId}
                                                        </p>

                                                    )}

                                                </div>

                                            </TableCell>


                                            <TableCell className="max-w-[250px]">

                                                <p className="truncate font-medium">
                                                    {request.title}
                                                </p>

                                            </TableCell>


                                            <TableCell>

                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                                        request.priority === "URGENT"
                                                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                                            : request.priority === "HIGH"
                                                                ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                                                                : request.priority === "MEDIUM"
                                                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                                    }`}
                                                >

                                                    {request.priority}

                                                </span>

                                            </TableCell>


                                            <TableCell>

                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                                        request.status === "PENDING"
                                                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                                            : request.status === "IN_PROGRESS"
                                                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                                                : request.status === "RESOLVED"
                                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                                    }`}
                                                >

                                                    {request.status.replace(
                                                        "_",
                                                        " "
                                                    )}

                                                </span>

                                            </TableCell>


                                            <TableCell className="text-muted-foreground whitespace-nowrap">

                                                {new Date(
                                                    request.createdAt
                                                ).toLocaleDateString()}

                                            </TableCell>


                                            <TableCell>

                                                <select
                                                    value={request.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            request.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={
                                                        updatingId === request.id ||
                                                        request.status === "RESOLVED" ||
                                                        request.status === "REJECTED"
                                                    }
                                                    className="rounded-md border bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                                                >

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

                                            </TableCell>


                                        </TableRow>

                                    ))

                                )}

                            </TableBody>

                        </Table>

                    </div>


                    {/* Pagination */}

                    {pagination && pagination.totalPages > 1 && (

                        <div className="flex items-center justify-between border-t px-6 py-4">

                            <p className="text-sm text-muted-foreground">

                                Page {pagination.page} of{" "}
                                {pagination.totalPages}

                                {" • "}

                                {pagination.total} requests

                            </p>


                            <div className="flex items-center gap-2">

                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page <= 1 || loading}
                                    onClick={() =>
                                        setPage((currentPage) =>
                                            currentPage - 1
                                        )
                                    }
                                >

                                    <ChevronLeft className="h-4 w-4 mr-1" />

                                    Previous

                                </Button>


                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={
                                        page >= pagination.totalPages ||
                                        loading
                                    }
                                    onClick={() =>
                                        setPage((currentPage) =>
                                            currentPage + 1
                                        )
                                    }
                                >

                                    Next

                                    <ChevronRight className="h-4 w-4 ml-1" />

                                </Button>

                            </div>

                        </div>

                    )}

                </CardContent>

            </Card>

        </div>
    );
};



export default SupportRequests;
