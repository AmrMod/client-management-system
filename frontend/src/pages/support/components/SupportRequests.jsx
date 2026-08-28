import { useEffect, useState } from "react";

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
    getSupportRequests,
    updateRequestStatus
} from "@/api/requestapi";

import { Button } from "@/components/ui/button";

const SupportRequests = () => {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadRequests = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getSupportRequests();

                setRequests(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadRequests();
    }, []);

    const handleStatusChange = async (requestId, status) => {
        try {

            const updatedRequest = await updateRequestStatus(
                requestId,
                status
            );

            setRequests((currentRequests) =>
                currentRequests.map((request) =>
                    request.id === requestId
                        ? updatedRequest
                        : request
                )
            );

        } catch (error) {
            setError(error.message);
        }
    };

    if (error) {
        return (
            <div className="p-6">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }


    return (
        <div className="space-y-8 animate-in fade-in duration-300">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Assigned Requests
                    </h1>

                    <p className="text-muted-foreground mt-1">
                        Manage and resolve requests assigned to you.
                    </p>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead>Request ID</TableHead>
                                <TableHead>Student</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date Created</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>

                            {requests.map((request) => (
                                <TableRow key={request.id}>

                                    <TableCell className="font-semibold">
                                        {request.id}
                                    </TableCell>

                                    <TableCell>
                                        {request.student?.name || "N/A"}
                                    </TableCell>

                                    <TableCell>
                                        {request.title}
                                    </TableCell>

                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${request.priority === "HIGH" ||
                                                    request.priority === "URGENT"
                                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
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
                                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${request.status === "PENDING"
                                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                                    : request.status === "IN_PROGRESS"
                                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                                        : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                                                }`}
                                        >
                                            {request.status}
                                        </span>
                                    </TableCell>

                                    <TableCell className="text-muted-foreground">
                                        {new Date(request.createdAt).toLocaleDateString()}
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
                                                request.status === "RESOLVED" ||
                                                request.status === "REJECTED"
                                            }
                                            className="border rounded-md px-3 py-2 text-sm"
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
                            ))}

                        </TableBody>

                    </Table>
                </CardContent>
            </Card>

        </div>
    );

}

export default SupportRequests;