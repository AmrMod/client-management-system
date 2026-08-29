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

// import { getManagerRequests, getSupportStaff, assignRequest } from "@/api/requestapi";


// const ManagerRequests = () => {

//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [staff, setStaff] = useState([]);
//     const [staffLoading, setStaffLoading] = useState(true);


//     // useEffect(() => {

//     //     const loadRequests = async () => {
//     //         try {
//     //             setLoading(true);
//     //             setError(null);

//     //             const data = await getManagerRequests();

//     //             setRequests(data);

//     //         } catch (error) {
//     //             setError(error.message);
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };

//     //     loadRequests();

//     // }, []);

//     useEffect(() => {

//     const loadData = async () => {
//         try {
//             setLoading(true);
//             setStaffLoading(true);
//             setError(null);

//             const [requestsData, staffData] = await Promise.all([
//                 getManagerRequests(),
//                 getSupportStaff()
//             ]);

//             setRequests(requestsData);
//             setStaff(staffData);

//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//             setStaffLoading(false);
//         }
//     };

//     loadData();

// }, []);

//     const handleAssign = async (requestId, staffId) => {
//         try {

//             const updatedRequest = await assignRequest(
//                 requestId,
//                 Number(staffId)
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


//     if (loading) {
//         return (
//             <div className="space-y-6">
//                 <div>
//                     <h1 className="text-3xl font-bold tracking-tight">
//                         Support Requests
//                     </h1>

//                     <p className="text-muted-foreground mt-1">
//                         Monitor, assign, and track student support requests.
//                     </p>
//                 </div>

//                 <p className="text-muted-foreground">
//                     Loading requests...
//                 </p>
//             </div>
//         );
//     }


//     if (error) {
//         return (
//             <div className="space-y-6">
//                 <div>
//                     <h1 className="text-3xl font-bold tracking-tight">
//                         Support Requests
//                     </h1>

//                     <p className="text-muted-foreground mt-1">
//                         Monitor, assign, and track student support requests.
//                     </p>
//                 </div>

//                 <p className="text-red-500">
//                     {error}
//                 </p>
//             </div>
//         );
//     }


//     return (
//         <div className="space-y-6">

//             <div>
//                 <h1 className="text-3xl font-bold tracking-tight">
//                     Support Requests
//                 </h1>

//                 <p className="text-muted-foreground mt-1">
//                     Monitor, assign, and track student support requests.
//                 </p>
//             </div>


//             <Card>
//                 <CardContent className="p-0">

//                     <Table>

//                         <TableHeader>
//                             <TableRow>

//                                 <TableHead>
//                                     Request
//                                 </TableHead>

//                                 <TableHead>
//                                     Student
//                                 </TableHead>

//                                 <TableHead>
//                                     Subject
//                                 </TableHead>

//                                 <TableHead>
//                                     Priority
//                                 </TableHead>

//                                 <TableHead>
//                                     Status
//                                 </TableHead>

//                                 <TableHead>
//                                     Assigned To
//                                 </TableHead>

//                                 <TableHead>
//                                     Date
//                                 </TableHead>

//                             </TableRow>
//                         </TableHeader>


//                         <TableBody>

//                             {requests.map((request) => (

//                                 <TableRow key={request.id}>

//                                     <TableCell className="font-semibold">
//                                         #{request.id}
//                                     </TableCell>


//                                     <TableCell>
//                                         {request.student?.name}
//                                     </TableCell>


//                                     <TableCell>
//                                         {request.title}
//                                     </TableCell>


//                                     <TableCell>
//                                         {request.priority}
//                                     </TableCell>


//                                     <TableCell>
//                                         {request.status}
//                                     </TableCell>


//                                     <TableCell>

//                                         {request.assignedStaff ? (

//                                             <span>
//                                                 {request.assignedStaff.name}
//                                             </span>

//                                         ) : (

//                                             <select
//                                                 className="border rounded-md px-3 py-2 text-sm"
//                                                 defaultValue=""
//                                                 onChange={(e) =>
//                                                     handleAssign(
//                                                         request.id,
//                                                         e.target.value
//                                                     )
//                                                 }
//                                             >
//                                                 <option value="" disabled>
//                                                     Select staff
//                                                 </option>

//                                                 {staff.map((member) => (
//                                                     <option
//                                                         key={member.id}
//                                                         value={member.id}
//                                                     >
//                                                         {member.name}
//                                                     </option>
//                                                 ))}
//                                             </select>

//                                         )}

//                                     </TableCell>


//                                     <TableCell className="text-muted-foreground">
//                                         {new Date(
//                                             request.createdAt
//                                         ).toLocaleDateString()}
//                                     </TableCell>

//                                 </TableRow>

//                             ))}

//                         </TableBody>

//                     </Table>

//                 </CardContent>
//             </Card>

//         </div>
//     );
// };


// export default ManagerRequests;

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
import { Input } from "@/components/ui/input";

import {
    Search,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    ClipboardList,
    Clock,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

import {
    getManagerRequests,
    getSupportStaff,
    assignRequest,
} from "@/api/requestapi";


const ManagerRequests = () => {

    // ==========================================
    // DATA
    // ==========================================

    const [requests, setRequests] = useState([]);
    const [staff, setStaff] = useState([]);

    // ==========================================
    // LOADING / ERROR
    // ==========================================

    const [loading, setLoading] = useState(true);
    const [staffLoading, setStaffLoading] = useState(true);
    const [error, setError] = useState(null);

    // ==========================================
    // PAGINATION
    // ==========================================

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit = 10;

    // ==========================================
    // SEARCH / FILTER / SORT
    // ==========================================

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [order, setOrder] = useState("desc");

    // ==========================================
    // ASSIGNMENT
    // ==========================================

    const [assigningRequestId, setAssigningRequestId] = useState(null);


    // ==========================================
    // LOAD STAFF
    // ==========================================

    useEffect(() => {

        const loadStaff = async () => {

            try {

                setStaffLoading(true);

                const staffData = await getSupportStaff();

                setStaff(staffData);

            } catch (error) {

                setError(error.message);

            } finally {

                setStaffLoading(false);

            }
        };

        loadStaff();

    }, []);


    // ==========================================
    // LOAD REQUESTS
    // ==========================================

    useEffect(() => {

        const loadRequests = async () => {

            try {

                setLoading(true);
                setError(null);

                const data = await getManagerRequests({
                    page,
                    limit,
                    search,
                    status,
                    priority,
                    sortBy,
                    order,
                });

                setRequests(data.requests);
                setTotalPages(data.totalPages);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }
        };

        loadRequests();

    }, [
        page,
        search,
        status,
        priority,
        sortBy,
        order,
    ]);


    // ==========================================
    // ASSIGN REQUEST
    // ==========================================

    const handleAssign = async (requestId, staffId) => {

        if (!staffId) return;

        try {

            setAssigningRequestId(requestId);
            setError(null);

            const updatedRequest = await assignRequest(
                requestId,
                Number(staffId)
            );

            setRequests((currentRequests) =>
                currentRequests.map((request) =>
                    request.id === requestId
                        ? {
                            ...request,
                            assignedStaff:
                                updatedRequest.assignedStaff
                        }
                        : request
                )
            );

        } catch (error) {

            setError(error.message);

        } finally {

            setAssigningRequestId(null);

        }
    };


    // ==========================================
    // REFRESH
    // ==========================================

    const handleRefresh = () => {

        setPage(1);

        // Changing search temporarily forces reload
        // without changing its actual value.

        setSearch((current) => current + " ");

        setTimeout(() => {
            setSearch((current) => current.trim());
        }, 0);
    };


    // ==========================================
    // RESET FILTERS
    // ==========================================

    const resetFilters = () => {

        setSearch("");
        setStatus("");
        setPriority("");
        setSortBy("createdAt");
        setOrder("desc");
        setPage(1);

    };


    // ==========================================
    // STATISTICS
    // ==========================================

    const pendingCount = requests.filter(
        (request) => request.status === "PENDING"
    ).length;

    const inProgressCount = requests.filter(
        (request) => request.status === "IN_PROGRESS"
    ).length;

    const resolvedCount = requests.filter(
        (request) => request.status === "RESOLVED"
    ).length;

    const urgentCount = requests.filter(
        (request) =>
            request.priority === "URGENT" ||
            request.priority === "HIGH"
    ).length;


    // ==========================================
    // LOADING
    // ==========================================

    if (loading && requests.length === 0) {

        return (
            <div className="space-y-8 animate-in fade-in duration-300">

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Support Requests
                    </h1>

                    <p className="text-muted-foreground mt-1">
                        Monitor, assign, and manage student support requests.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                    {[1, 2, 3, 4].map((item) => (

                        <Card key={item}>

                            <CardContent className="p-6">

                                <div className="space-y-3">

                                    <div className="h-4 w-24 bg-muted rounded animate-pulse" />

                                    <div className="h-8 w-16 bg-muted rounded animate-pulse" />

                                </div>

                            </CardContent>

                        </Card>

                    ))}

                </div>

                <Card>

                    <CardContent className="p-8 text-center">

                        <p className="text-muted-foreground">
                            Loading requests...
                        </p>

                    </CardContent>

                </Card>

            </div>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error && requests.length === 0) {

        return (
            <div className="space-y-6">

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Support Requests
                    </h1>

                    <p className="text-muted-foreground mt-1">
                        Monitor, assign, and manage student support requests.
                    </p>
                </div>

                <Card>

                    <CardContent className="p-8 text-center">

                        <AlertCircle className="mx-auto h-10 w-10 text-red-500 mb-3" />

                        <p className="text-red-500 font-medium">
                            {error}
                        </p>

                        <Button
                            className="mt-4"
                            onClick={handleRefresh}
                        >
                            Try Again
                        </Button>

                    </CardContent>

                </Card>

            </div>
        );
    }


    return (
        <div className="space-y-8 animate-in fade-in duration-300">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-3xl font-bold tracking-tight">
                        Support Requests
                    </h1>

                    <p className="text-muted-foreground mt-1">
                        Monitor, assign, and manage student support requests.
                    </p>

                </div>

                <Button
                    variant="outline"
                    onClick={handleRefresh}
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


            {/* ==========================================
                STATISTICS
            ========================================== */}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                <Card>

                    <CardContent className="p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-muted-foreground">
                                    Total Requests
                                </p>

                                <p className="text-2xl font-bold mt-2">
                                    {requests.length}
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

                                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />

                            </div>

                        </div>

                    </CardContent>

                </Card>


                <Card>

                    <CardContent className="p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-muted-foreground">
                                    High Priority
                                </p>

                                <p className="text-2xl font-bold mt-2">
                                    {urgentCount}
                                </p>

                            </div>

                            <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3">

                                <CheckCircle2 className="h-5 w-5 text-red-600 dark:text-red-400" />

                            </div>

                        </div>

                    </CardContent>

                </Card>

            </div>


            {/* ==========================================
                SEARCH + FILTERS
            ========================================== */}

            <Card>

                <CardContent className="p-4">

                    <div className="flex flex-col gap-3 lg:flex-row">

                        {/* SEARCH */}

                        <div className="relative flex-1">

                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                placeholder="Search requests or students..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                className="pl-9"
                            />

                        </div>


                        {/* STATUS */}

                        <select
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                                setPage(1);
                            }}
                            className="h-10 rounded-md border bg-background px-3 text-sm"
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


                        {/* PRIORITY */}

                        <select
                            value={priority}
                            onChange={(e) => {
                                setPriority(e.target.value);
                                setPage(1);
                            }}
                            className="h-10 rounded-md border bg-background px-3 text-sm"
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


                        {/* SORT */}

                        <select
                            value={`${sortBy}-${order}`}
                            onChange={(e) => {

                                const [newSortBy, newOrder] =
                                    e.target.value.split("-");

                                setSortBy(newSortBy);
                                setOrder(newOrder);
                                setPage(1);

                            }}
                            className="h-10 rounded-md border bg-background px-3 text-sm"
                        >

                            <option value="createdAt-desc">
                                Newest
                            </option>

                            <option value="createdAt-asc">
                                Oldest
                            </option>

                            <option value="priority-desc">
                                Priority
                            </option>

                            <option value="status-asc">
                                Status
                            </option>

                        </select>


                        {(search || status || priority) && (

                            <Button
                                variant="ghost"
                                onClick={resetFilters}
                            >
                                Clear
                            </Button>

                        )}

                    </div>

                </CardContent>

            </Card>


            {/* ==========================================
                ERROR BANNER
            ========================================== */}

            {error && (

                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400">
                    {error}
                </div>

            )}


            {/* ==========================================
                REQUEST TABLE
            ========================================== */}

            <Card>

                <CardHeader>

                    <div className="flex items-center justify-between">

                        <CardTitle>
                            Requests
                        </CardTitle>

                        {loading && (
                            <span className="text-sm text-muted-foreground">
                                Updating...
                            </span>
                        )}

                    </div>

                </CardHeader>


                <CardContent className="p-0">

                    <div className="overflow-x-auto">

                        <Table>

                            <TableHeader>

                                <TableRow>

                                    <TableHead>
                                        Request
                                    </TableHead>

                                    <TableHead>
                                        Student
                                    </TableHead>

                                    <TableHead>
                                        Subject
                                    </TableHead>

                                    <TableHead>
                                        Priority
                                    </TableHead>

                                    <TableHead>
                                        Status
                                    </TableHead>

                                    <TableHead>
                                        Assigned To
                                    </TableHead>

                                    <TableHead>
                                        Date
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

                                            <div className="flex flex-col items-center justify-center">

                                                <ClipboardList className="h-8 w-8 text-muted-foreground mb-2" />

                                                <p className="font-medium">
                                                    No requests found
                                                </p>

                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Try changing your search or filters.
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

                                                    <p className="text-xs text-muted-foreground">
                                                        {request.student?.studentId || ""}
                                                    </p>

                                                </div>

                                            </TableCell>


                                            <TableCell>
                                                {request.title}
                                            </TableCell>


                                            {/* PRIORITY */}

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


                                            {/* STATUS */}

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


                                            {/* ASSIGNMENT */}

                                            <TableCell>

                                                {request.assignedStaff ? (

                                                    <div className="text-sm">

                                                        <p className="font-medium">
                                                            {request.assignedStaff.name}
                                                        </p>

                                                    </div>

                                                ) : (

                                                    <select
                                                        disabled={
                                                            staffLoading ||
                                                            assigningRequestId === request.id
                                                        }
                                                        defaultValue=""
                                                        onChange={(e) =>
                                                            handleAssign(
                                                                request.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="h-9 rounded-md border bg-background px-3 text-sm"
                                                    >

                                                        <option value="" disabled>
                                                            {assigningRequestId === request.id
                                                                ? "Assigning..."
                                                                : "Select staff"
                                                            }
                                                        </option>

                                                        {staff.map((member) => (

                                                            <option
                                                                key={member.id}
                                                                value={member.id}
                                                            >
                                                                {member.name}
                                                            </option>

                                                        ))}

                                                    </select>

                                                )}

                                            </TableCell>


                                            <TableCell className="text-muted-foreground whitespace-nowrap">

                                                {new Date(
                                                    request.createdAt
                                                ).toLocaleDateString()}

                                            </TableCell>

                                        </TableRow>

                                    ))

                                )}

                            </TableBody>

                        </Table>

                    </div>


                    {/* ==========================================
                        PAGINATION
                    ========================================== */}

                    <div className="flex items-center justify-between border-t px-4 py-4">

                        <p className="text-sm text-muted-foreground">

                            Page {page} of {totalPages}

                        </p>


                        <div className="flex items-center gap-2">

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page <= 1 || loading}
                                onClick={() =>
                                    setPage((current) => current - 1)
                                }
                            >

                                <ChevronLeft className="h-4 w-4 mr-1" />

                                Previous

                            </Button>


                            <Button
                                variant="outline"
                                size="sm"
                                disabled={
                                    page >= totalPages ||
                                    loading
                                }
                                onClick={() =>
                                    setPage((current) => current + 1)
                                }
                            >

                                Next

                                <ChevronRight className="h-4 w-4 ml-1" />

                            </Button>

                        </div>

                    </div>

                </CardContent>

            </Card>

        </div>
    );
};


export default ManagerRequests;