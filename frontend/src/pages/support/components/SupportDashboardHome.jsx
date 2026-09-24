
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    AlertCircle,
    CheckCircle2,
    ClipboardList,
    Clock,
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useQuery } from "@tanstack/react-query";
import { getSupportDashboardData } from "@/api/dashboardapi";

const SupportDashboardHome = () => {


        const {
        data: dashboardData,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["support-dashboard"],
        queryFn: getSupportDashboardData,
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-sm text-muted-foreground">
                    Loading dashboard...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-sm text-destructive">
                    {error.message}
                </p>
            </div>
        );
    }

        



    return (
        <div className="space-y-6 animate-in fade-in duration-300">

            {/* Header */}

            <div>

                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Support Dashboard
                </h1>

                <p className="text-muted-foreground mt-1">
                    Manage student requests and provide support services.
                </p>

            </div>


            {/* Statistics */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <Card>

                    <CardHeader className="flex flex-row items-center justify-between pb-2">

                        <CardTitle className="text-sm font-medium">
                            Open Requests
                        </CardTitle>

                        <ClipboardList className="h-4 w-4 text-muted-foreground" />

                    </CardHeader>

                    <CardContent>

                        <div className="text-2xl font-bold">
                            {dashboardData?.openRequests ?? 0}
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            Requests waiting for action
                        </p>

                    </CardContent>

                </Card>


                <Card>

                    <CardHeader className="flex flex-row items-center justify-between pb-2">

                        <CardTitle className="text-sm font-medium">
                            In Progress
                        </CardTitle>

                        <Clock className="h-4 w-4 text-muted-foreground" />

                    </CardHeader>

                    <CardContent>

                        <div className="text-2xl font-bold">
                            {dashboardData?.inProgressRequests ?? 0}
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            Currently being handled
                        </p>

                    </CardContent>

                </Card>


                <Card>

                    <CardHeader className="flex flex-row items-center justify-between pb-2">

                        <CardTitle className="text-sm font-medium">
                            Resolved Today
                        </CardTitle>

                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />

                    </CardHeader>

                    <CardContent>

                        <div className="text-2xl font-bold">
                            {dashboardData?.resolvedToday ?? 0}
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            Requests successfully resolved
                        </p>

                    </CardContent>

                </Card>


                <Card>

                    <CardHeader className="flex flex-row items-center justify-between pb-2">

                        <CardTitle className="text-sm font-medium">
                            High Priority
                        </CardTitle>

                        <AlertCircle className="h-4 w-4 text-muted-foreground" />

                    </CardHeader>

                    <CardContent>

                        <div className="text-2xl font-bold">
                            {dashboardData?.highPriorityRequests ?? 0}
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            Require immediate attention
                        </p>

                    </CardContent>

                </Card>

            </div>


            {/* Recent Requests */}

            <Card>

                <CardHeader>

                    <CardTitle className="text-base font-semibold">
                        Recent Requests
                    </CardTitle>

                    <CardDescription>
                        Latest student support requests requiring attention.
                    </CardDescription>

                </CardHeader>


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
                                    Support Unit
                                </TableHead>

                                <TableHead>
                                    Priority
                                </TableHead>

                                <TableHead>
                                    Status
                                </TableHead>

                            </TableRow>

                        </TableHeader>


                        <TableBody>

                            {dashboardData?.recentRequests?.map((request) => (

                                <TableRow key={request.id}>

                                    <TableCell>

                                        <div>

                                            <p className="font-semibold">
                                                {request.title}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {request.id}
                                            </p>

                                        </div>

                                    </TableCell>


                                    <TableCell>
                                        {request.student.name}
                                    </TableCell>


                                    <TableCell>
                                        {request.supportUnit.name}
                                    </TableCell>


                                    <TableCell>

                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                request.priority === "HIGH"
                                                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                                    : request.priority === "MEDIUM"
                                                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                            }`}
                                        >
                                            {request.priority}
                                        </span>

                                    </TableCell>


                                    <TableCell>
                                        {request.status}
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


export default SupportDashboardHome;

