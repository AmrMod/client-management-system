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

import { getManagerRequests, getSupportStaff, assignRequest } from "@/api/requestapi";


const ManagerRequests = () => {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [staff, setStaff] = useState([]);
    const [staffLoading, setStaffLoading] = useState(true);


    // useEffect(() => {

    //     const loadRequests = async () => {
    //         try {
    //             setLoading(true);
    //             setError(null);

    //             const data = await getManagerRequests();

    //             setRequests(data);

    //         } catch (error) {
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     loadRequests();

    // }, []);

    useEffect(() => {

    const loadData = async () => {
        try {
            setLoading(true);
            setStaffLoading(true);
            setError(null);

            const [requestsData, staffData] = await Promise.all([
                getManagerRequests(),
                getSupportStaff()
            ]);

            setRequests(requestsData);
            setStaff(staffData);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            setStaffLoading(false);
        }
    };

    loadData();

}, []);

    const handleAssign = async (requestId, staffId) => {
        try {

            const updatedRequest = await assignRequest(
                requestId,
                Number(staffId)
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

                                        {request.assignedStaff ? (

                                            <span>
                                                {request.assignedStaff.name}
                                            </span>

                                        ) : (

                                            <select
                                                className="border rounded-md px-3 py-2 text-sm"
                                                defaultValue=""
                                                onChange={(e) =>
                                                    handleAssign(
                                                        request.id,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="" disabled>
                                                    Select staff
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