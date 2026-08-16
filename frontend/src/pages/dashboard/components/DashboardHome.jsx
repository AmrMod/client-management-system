import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    GraduationCap,
    ClipboardList,
    Clock,
} from "lucide-react";


const DashboardHome = ({
    profileName,
    requests,
    setActiveTab
}) => {

    const pendingRequests = requests.filter(
        (request) => request.status === "Pending"
    ).length;

    const resolvedRequests = requests.filter(
        (request) => request.status === "Resolved"
    ).length;


    return (
        <div className="space-y-8 animate-in fade-in duration-300">

            {/* Welcome */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Student Support Dashboard
                </h1>

                <p className="text-muted-foreground mt-1">
                    Welcome back, {profileName}. Here's an overview of your support requests.
                </p>
            </div>


            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Total Requests */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Requests
                        </CardTitle>

                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {requests.length}
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            Support requests submitted
                        </p>
                    </CardContent>
                </Card>


                {/* Pending Requests */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pending Requests
                        </CardTitle>

                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {pendingRequests}
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            Awaiting support
                        </p>
                    </CardContent>
                </Card>


                {/* Resolved Requests */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Resolved Requests
                        </CardTitle>

                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {resolvedRequests}
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            Requests successfully resolved
                        </p>
                    </CardContent>
                </Card>

            </div>


            {/* Recent Requests + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Requests */}
                <Card className="lg:col-span-2">

                    <CardHeader>
                        <CardTitle className="text-base font-semibold">
                            Recent Support Requests
                        </CardTitle>

                        <CardDescription>
                            A quick overview of your latest student support requests.
                        </CardDescription>
                    </CardHeader>


                    <CardContent>

                        {requests.length === 0 ? (

                            <div className="py-8 text-center">

                                <ClipboardList className="h-8 w-8 mx-auto text-muted-foreground mb-3" />

                                <p className="text-sm text-muted-foreground">
                                    You haven't submitted any support requests yet.
                                </p>

                            </div>

                        ) : (

                            <div className="space-y-4">

                                {requests.slice(0, 3).map((request) => (

                                    <div
                                        key={request.id}
                                        className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                                    >

                                        <div>

                                            <p className="font-semibold text-sm text-foreground">
                                                {request.title}
                                            </p>

                                            <div className="flex gap-2 mt-1">

                                                <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                                                    {request.category}
                                                </span>

                                                <span className="text-[10px] text-muted-foreground">
                                                    {request.date}
                                                </span>

                                            </div>

                                        </div>


                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                request.status === "Pending"
                                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                                    : request.status === "Resolved"
                                                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                                                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                            }`}
                                        >
                                            {request.status}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        )}

                    </CardContent>

                </Card>


                {/* Quick Actions */}
                <Card>

                    <CardHeader>
                        <CardTitle className="text-base font-semibold">
                            Quick Actions
                        </CardTitle>

                        <CardDescription>
                            Common student support actions.
                        </CardDescription>
                    </CardHeader>


                    <CardContent className="flex flex-col gap-2">

                        <Button
                            onClick={() => setActiveTab("New Request")}
                            className="w-full"
                        >
                            Submit Support Request
                        </Button>


                        <Button
                            onClick={() => setActiveTab("My Requests")}
                            variant="outline"
                            className="w-full"
                        >
                            View My Requests
                        </Button>


                        <Button
                            onClick={() => setActiveTab("Messages")}
                            variant="ghost"
                            className="w-full"
                        >
                            Contact Support
                        </Button>

                    </CardContent>

                </Card>

            </div>

        </div>
    );
};


export default DashboardHome;