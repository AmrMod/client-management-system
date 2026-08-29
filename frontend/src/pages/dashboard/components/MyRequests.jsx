// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

//  import { getMyRequests  } from "@/api/requestapi";


// const MyRequests = ({ setActiveTab }) => {

//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   useEffect(() => {
//     const loadRequests = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const data = await getMyRequests();

//         setRequests(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadRequests();
//   }, []);


//   return (
//     <div className="space-y-8 animate-in fade-in duration-300">

//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-foreground">
//             My Requests
//           </h1>

//           <p className="text-muted-foreground mt-1">
//             Track and manage your submitted requests.
//           </p>
//         </div>

//         <Button onClick={() => setActiveTab("New Request")}>
//           New Request
//         </Button>
//       </div>


//       {loading && (
//         <p className="text-muted-foreground">
//           Loading requests...
//         </p>
//       )}


//       {error && (
//         <p className="text-red-500">
//           {error}
//         </p>
//       )}


//       {!loading && !error && (
//         <Card>
//           <CardContent className="p-0">
//             <Table>

//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Request ID</TableHead>
//                   <TableHead>Subject</TableHead>
//                   <TableHead>Support Unit</TableHead>
//                   <TableHead>Priority</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Date Created</TableHead>
//                 </TableRow>
//               </TableHeader>


//               <TableBody>

//                 {requests.map((req) => (
//                   <TableRow key={req.id}>

//                     <TableCell className="font-semibold">
//                       {req.id}
//                     </TableCell>

//                     <TableCell>
//                       {req.title}
//                     </TableCell>

//                     <TableCell>
//                       {req.supportUnit?.name}
//                     </TableCell>

//                     <TableCell>
//                       <span
//                         className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
//                           req.priority === "HIGH" ||
//                           req.priority === "URGENT"
//                             ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
//                             : req.priority === "MEDIUM"
//                               ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
//                               : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
//                         }`}
//                       >
//                         {req.priority}
//                       </span>
//                     </TableCell>


//                     <TableCell>
//                       <span
//                         className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
//                           req.status === "PENDING"
//                             ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
//                             : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
//                         }`}
//                       >
//                         {req.status}
//                       </span>
//                     </TableCell>


//                     <TableCell className="text-muted-foreground">
//                       {new Date(req.createdAt).toLocaleDateString()}
//                     </TableCell>

//                   </TableRow>
//                 ))}

//               </TableBody>

//             </Table>
//           </CardContent>
//         </Card>
//       )}

//     </div>
//   );
// };


// export default MyRequests;

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
} from "@/components/ui/pagination";

import {
    Search,
} from "lucide-react";

import { getMyRequests } from "@/api/requestapi";


const MyRequests = ({ setActiveTab }) => {

    const [requests, setRequests] = useState([]);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [limit] = useState(10);

    // Sorting
    const [sortBy, setSortBy] = useState("createdAt");
    const [order, setOrder] = useState("asc");


    // ==========================================
    // DEBOUNCE SEARCH
    // ==========================================

    useEffect(() => {

        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400);

        return () => {
            clearTimeout(timer);
        };

    }, [search]);


    // ==========================================
    // FETCH REQUESTS
    // ==========================================

    const fetchRequests = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getMyRequests(
                currentPage,
                limit,
                debouncedSearch,
                sortBy,
                order
            );

            setRequests(data.requests);
            setTotalPages(data.totalPages);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchRequests();

    }, [
        currentPage,
        limit,
        debouncedSearch,
        sortBy,
        order
    ]);


    return (
        <div className="space-y-8 animate-in fade-in duration-300">


            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        My Requests
                    </h1>

                    <p className="text-muted-foreground mt-1">
                        Track and manage your submitted requests.
                    </p>

                </div>


                <Button
                    onClick={() => setActiveTab("New Request")}
                >
                    New Request
                </Button>

            </div>


            {/* ==========================================
                SEARCH & SORTING
            ========================================== */}

            <Card>

                <CardContent className="p-4">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">


                        {/* Search */}

                        <div className="flex-1 space-y-2">

                            <label className="text-sm font-medium">
                                Search requests
                            </label>

                            <div className="relative">

                                <Search
                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                                />

                                <Input
                                    placeholder="Search by subject or support unit..."
                                    value={search}
                                    onChange={(e) => {

                                        setSearch(e.target.value);

                                        setCurrentPage(1);

                                    }}
                                    className="pl-9"
                                />

                            </div>

                        </div>


                        {/* Sort By */}

                        <div className="w-full sm:w-48 space-y-2">

                            <label className="text-sm font-medium">
                                Sort by
                            </label>

                            <select
                                value={sortBy}
                                onChange={(e) => {

                                    setSortBy(e.target.value);

                                    setCurrentPage(1);

                                }}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >

                                <option value="createdAt">
                                    Date Created
                                </option>

                                <option value="id">
                                    Request ID
                                </option>

                                <option value="title">
                                    Subject
                                </option>

                                <option value="priority">
                                    Priority
                                </option>

                                <option value="status">
                                    Status
                                </option>

                            </select>

                        </div>


                        {/* Sort Order */}

                        <div className="space-y-2">

                            <label className="text-sm font-medium block">
                                Order
                            </label>

                            <Button
                                variant="outline"
                                className="w-full sm:w-24"
                                onClick={() => {

                                    setOrder(
                                        order === "asc"
                                            ? "desc"
                                            : "asc"
                                    );

                                    setCurrentPage(1);

                                }}
                            >

                                {order === "asc"
                                    ? "↑ Asc"
                                    : "↓ Desc"
                                }

                            </Button>

                        </div>

                    </div>

                </CardContent>

            </Card>


            {/* ==========================================
                REQUESTS
            ========================================== */}

            {loading && (

                <p className="text-muted-foreground">
                    Loading requests...
                </p>

            )}


            {error && (

                <p className="text-red-500">
                    {error}
                </p>

            )}


            {!loading && !error && (

                <Card>

                    <CardContent className="p-0">

                        <Table>

                            <TableHeader>

                                <TableRow>

                                    <TableHead>
                                        Request ID
                                    </TableHead>

                                    <TableHead>
                                        Subject
                                    </TableHead>

                                    <TableHead>
                                        Support Unit
                                    </TableHead>

                                    <TableHead>
                                        Priority
                                    </TableHead>

                                    <TableHead>
                                        Status
                                    </TableHead>

                                    <TableHead>
                                        Date Created
                                    </TableHead>

                                </TableRow>

                            </TableHeader>


                            <TableBody>

                                {requests.map((req) => (

                                    <TableRow key={req.id}>


                                        <TableCell className="font-semibold">
                                            {req.id}
                                        </TableCell>


                                        <TableCell>
                                            {req.title}
                                        </TableCell>


                                        <TableCell>
                                            {req.supportUnit?.name}
                                        </TableCell>


                                        {/* Priority */}

                                        <TableCell>

                                            <span
                                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    req.priority === "HIGH" ||
                                                    req.priority === "URGENT"
                                                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                                        : req.priority === "MEDIUM"
                                                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                                }`}
                                            >

                                                {req.priority}

                                            </span>

                                        </TableCell>


                                        {/* Status */}

                                        <TableCell>

                                            <span
                                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    req.status === "PENDING"
                                                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                                        : req.status === "IN_PROGRESS"
                                                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                                            : req.status === "RESOLVED"
                                                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                                                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                                }`}
                                            >

                                                {req.status}

                                            </span>

                                        </TableCell>


                                        {/* Date */}

                                        <TableCell className="text-muted-foreground">

                                            {new Date(
                                                req.createdAt
                                            ).toLocaleDateString()}

                                        </TableCell>


                                    </TableRow>

                                ))}


                                {/* Empty state */}

                                {requests.length === 0 && (

                                    <TableRow>

                                        <TableCell
                                            colSpan={6}
                                            className="text-center py-10 text-muted-foreground"
                                        >
                                            No requests found.
                                        </TableCell>

                                    </TableRow>

                                )}

                            </TableBody>

                        </Table>

                    </CardContent>

                </Card>

            )}


            {/* ==========================================
                PAGINATION
            ========================================== */}

            {!loading &&
                !error &&
                totalPages > 0 && (

                    <div className="flex justify-center">

                        <Pagination>

                            <PaginationContent>


                                <PaginationItem>

                                    <PaginationPrevious
                                        onClick={() => {

                                            if (currentPage > 1) {
                                                setCurrentPage(
                                                    currentPage - 1
                                                );
                                            }

                                        }}
                                    />

                                </PaginationItem>


                                {Array.from(
                                    { length: totalPages },
                                    (_, i) => (

                                        <PaginationItem key={i}>

                                            <PaginationLink
                                                isActive={
                                                    currentPage === i + 1
                                                }
                                                onClick={() =>
                                                    setCurrentPage(i + 1)
                                                }
                                            >
                                                {i + 1}
                                            </PaginationLink>

                                        </PaginationItem>

                                    )
                                )}


                                <PaginationItem>

                                    <PaginationNext
                                        onClick={() => {

                                            if (
                                                currentPage <
                                                totalPages
                                            ) {
                                                setCurrentPage(
                                                    currentPage + 1
                                                );
                                            }

                                        }}
                                    />

                                </PaginationItem>


                            </PaginationContent>

                        </Pagination>

                    </div>

                )}

        </div>
    );
};


export default MyRequests;