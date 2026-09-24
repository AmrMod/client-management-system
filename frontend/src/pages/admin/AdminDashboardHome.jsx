
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ClipboardList,
    Building2,
    Users,
    UserCog,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import { getAdminDashboardData } from "@/api/dashboardapi";


const AdminDashboardHome = () => {

    const {
        data: dashboardData,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["admin-dashboard"],
        queryFn: getAdminDashboardData,
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
        <div className="space-y-8 animate-in fade-in duration-300">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Admin Dashboard
                </h1>

                <p className="text-muted-foreground mt-1">
                    System-wide overview of students, staff, requests, and support units.
                </p>
            </div>


            {/* System Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Students */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Students
                        </CardTitle>

                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardData?.students ?? 0}
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            Total students
                        </p>
                    </CardContent>
                </Card>


                {/* Staff */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Staff
                        </CardTitle>

                        <UserCog className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardData?.staff ?? 0}
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            Support staff and managers
                        </p>
                    </CardContent>
                </Card>


                {/* Requests */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Requests
                        </CardTitle>

                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardData?.requests ?? 0}
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            Total support requests
                        </p>
                    </CardContent>
                </Card>


                {/* Support Units */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Support Units
                        </CardTitle>

                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardData?.supportUnits ?? 0}
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            Active support units
                        </p>
                    </CardContent>
                </Card>

            </div>


            {/* Request Distribution */}
            <Card>

                <CardHeader>
                    <CardTitle>
                        System-wide Request Distribution
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">

                    {/* Pending */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            Pending
                        </span>

                        <span className="font-semibold">
                            {dashboardData?.pendingRequests ?? 0}
                        </span>
                    </div>


                    {/* In Progress */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            In Progress
                        </span>

                        <span className="font-semibold">
                            {dashboardData?.inProgressRequests ?? 0}
                        </span>
                    </div>


                    {/* Resolved */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            Resolved
                        </span>

                        <span className="font-semibold">
                            {dashboardData?.resolvedRequests ?? 0}
                        </span>
                    </div>


                    {/* Rejected */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            Rejected
                        </span>

                        <span className="font-semibold">
                            {dashboardData?.rejectedRequests ?? 0}
                        </span>
                    </div>

                </CardContent>

            </Card>

        </div>
    );
};

export default AdminDashboardHome;

