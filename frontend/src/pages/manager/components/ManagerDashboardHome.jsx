
import { useQuery } from "@tanstack/react-query";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Activity,
    CheckCircle2,
    Clock,
    Users,
} from "lucide-react";

import { getManagerDashboardData } from "@/api/dashboardapi";


const ManagerDashboardHome = ({ activityLogs }) => {

    const {
        data: dashboardData,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["manager-dashboard"],
        queryFn: getManagerDashboardData,
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
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Manager Dashboard
                </h1>

                <p className="text-muted-foreground mt-1">
                    Monitor student support operations, requests,
                    and staff performance.
                </p>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pending Requests
                        </CardTitle>

                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardData?.pendingRequests ?? 0}
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            {dashboardData?.highPriorityPending ?? 0} high priority
                        </p>
                    </CardContent>
                </Card>


                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Requests
                        </CardTitle>

                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardData?.activeRequests ?? 0}
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            Currently being handled
                        </p>
                    </CardContent>
                </Card>


                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Students Served
                        </CardTitle>

                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardData?.students ?? 0}
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            Unique students with requests
                        </p>
                    </CardContent>
                </Card>


                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Resolved
                        </CardTitle>

                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardData?.resolvedThisMonth ?? 0}
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            This month
                        </p>
                    </CardContent>
                </Card>

            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <Card className="lg:col-span-2">

                    <CardHeader>
                        <CardTitle>
                            Recent Support Activity
                        </CardTitle>

                        <CardDescription>
                            Latest actions across the support system.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="space-y-4">

                            {activityLogs.map((log) => (
                                <div
                                    key={log.id}
                                    className="flex items-center justify-between border-b pb-3 last:border-0"
                                >

                                    <div className="flex items-center gap-3">

                                        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                            <Activity className="h-4 w-4" />
                                        </div>

                                        <p className="text-sm font-medium">
                                            {log.action}
                                        </p>

                                    </div>

                                    <span className="text-xs text-muted-foreground">
                                        {log.time}
                                    </span>

                                </div>
                            ))}

                        </div>
                    </CardContent>

                </Card>


                <Card>

                    <CardHeader>
                        <CardTitle>
                            Support Overview
                        </CardTitle>

                        <CardDescription>
                            Current request distribution.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">

                        <div className="flex justify-between">
                            <span className="text-sm">
                                Pending
                            </span>

                            <span className="font-semibold">
                                {dashboardData?.pendingRequests ?? 0}
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span className="text-sm">
                                In Progress
                            </span>

                            <span className="font-semibold">
                                {dashboardData?.activeRequests ?? 0}
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span className="text-sm">
                                Resolved
                            </span>

                            <span className="font-semibold">
                                {dashboardData?.resolvedThisMonth ?? 0}
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span className="text-sm">
                                Escalated
                            </span>

                            <span className="font-semibold text-destructive">
                                4
                            </span>
                        </div>

                    </CardContent>

                </Card>

            </div>

        </div>
    );
};

export default ManagerDashboardHome;

