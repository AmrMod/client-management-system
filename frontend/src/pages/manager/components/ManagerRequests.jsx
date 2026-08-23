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

import { getManagerRequests } from "@/api/requestapi";


const ManagerRequests = () => {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        const loadRequests = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getManagerRequests();

                setRequests(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadRequests();

    }, []);


    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Support Requests
                    </h1>

                    <p className="text-muted-foreground mt-1">
                        Monitor, assign, and track student support requests.
                    </p>
                </div>

                <p className="text-muted-foreground">
                    Loading requests...
                </p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Support Requests
                    </h1>

                    <p className="text-muted-foreground mt-1">
                        Monitor, assign, and track student support requests.
                    </p>
                </div>

                <p className="text-red-500">
                    {error}
                </p>
            </div>
        );
    }


    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Support Requests
                </h1>

                <p className="text-muted-foreground mt-1">
                    Monitor, assign, and track student support requests.
                </p>
            </div>


            <Card>
                <CardContent className="p-0">

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

                            {requests.map((request) => (

                                <TableRow key={request.id}>

                                    <TableCell className="font-semibold">
                                        #{request.id}
                                    </TableCell>


                                    <TableCell>
                                        {request.student?.name}
                                    </TableCell>


                                    <TableCell>
                                        {request.title}
                                    </TableCell>


                                    <TableCell>
                                        {request.priority}
                                    </TableCell>


                                    <TableCell>
                                        {request.status}
                                    </TableCell>


                                    <TableCell>
                                        {request.assignedStaff?.name || "Unassigned"}
                                    </TableCell>


                                    <TableCell className="text-muted-foreground">
                                        {new Date(
                                            request.createdAt
                                        ).toLocaleDateString()}
                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </CardContent>
            </Card>

        </div>
    );
};


export default ManagerRequests;