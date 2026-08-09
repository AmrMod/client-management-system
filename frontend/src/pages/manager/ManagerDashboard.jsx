

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";

import {
    LayoutDashboard,
    LogOut,
    ClipboardList,
    Users,
    UserRoundCog,
    BarChart3,
    MessageSquare,
    Bell,
    Settings,
    Menu,
    X,
    Activity,
    Clock,
    CheckCircle2,
    AlertCircle,
    UserPlus,
} from "lucide-react";

import { useEffect, useState } from "react";

export default function ManagerDashboard() {
    const navigate = useNavigate();

    const [managerUser, setManagerUser] = useState(null);
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            navigate("/login");
            return;
        }

        const parsed = JSON.parse(storedUser);
        setManagerUser(parsed);

        const savedTheme = localStorage.getItem("theme");
        const systemDark =
            window.matchMedia("(prefers-color-scheme: dark)").matches;

        const initialDark =
            savedTheme === "dark" || (!savedTheme && systemDark);

        setIsDark(initialDark);

        if (initialDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const toggleDark = () => {
        const nextDark = !isDark;

        setIsDark(nextDark);

        if (nextDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    const menuItems = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Requests",
            icon: ClipboardList,
        },
        {
            name: "Students",
            icon: Users,
        },
        {
            name: "Support Staff",
            icon: UserRoundCog,
        },
        {
            name: "Reports",
            icon: BarChart3,
        },
        {
            name: "Messages",
            icon: MessageSquare,
        },
        {
            name: "Notifications",
            icon: Bell,
        },
        {
            name: "Settings",
            icon: Settings,
        },
    ];

    const requests = [
        {
            id: "REQ-1001",
            student: "John Doe",
            subject: "Course Registration Issue",
            unit: "Academic Support",
            priority: "High",
            status: "Pending",
        },
        {
            id: "REQ-1002",
            student: "Mary James",
            subject: "Hostel Allocation",
            unit: "Student Affairs",
            priority: "Medium",
            status: "In Progress",
        },
        {
            id: "REQ-1003",
            student: "Ahmed Musa",
            subject: "Payment Confirmation",
            unit: "Finance",
            priority: "Low",
            status: "Resolved",
        },
    ];

    const students = [
        {
            id: "STU-001",
            name: "John Doe",
            email: "john@example.com",
            requests: 3,
            status: "Active",
        },
        {
            id: "STU-002",
            name: "Mary James",
            email: "mary@example.com",
            requests: 1,
            status: "Active",
        },
        {
            id: "STU-003",
            name: "Ahmed Musa",
            email: "ahmed@example.com",
            requests: 5,
            status: "Active",
        },
    ];

    const supportStaff = [
        {
            name: "Sarah Ahmed",
            unit: "Academic Support",
            requests: 12,
            resolved: 9,
            status: "Available",
        },
        {
            name: "David James",
            unit: "Student Affairs",
            requests: 8,
            resolved: 6,
            status: "Busy",
        },
        {
            name: "Fatima Ali",
            unit: "Finance",
            requests: 6,
            resolved: 6,
            status: "Available",
        },
    ];

    const activityLogs = [
        {
            id: 1,
            action: "Request REQ-1002 assigned to Student Affairs",
            time: "10 mins ago",
        },
        {
            id: 2,
            action: "Request REQ-1003 marked as resolved",
            time: "45 mins ago",
        },
        {
            id: 3,
            action: "New student request submitted",
            time: "1 hour ago",
        },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "Dashboard":
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
                                        18
                                    </div>

                                    <p className="text-xs text-muted-foreground mt-1">
                                        5 high priority
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
                                        27
                                    </div>

                                    <p className="text-xs text-muted-foreground mt-1">
                                        Currently being handled
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Students
                                    </CardTitle>

                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>

                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        248
                                    </div>

                                    <p className="text-xs text-muted-foreground mt-1">
                                        Registered students
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
                                        143
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
                                        Latest actions across the support
                                        system.
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
                                            18
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-sm">
                                            In Progress
                                        </span>

                                        <span className="font-semibold">
                                            27
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-sm">
                                            Resolved
                                        </span>

                                        <span className="font-semibold">
                                            143
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

            case "Requests":
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Support Requests
                            </h1>

                            <p className="text-muted-foreground mt-1">
                                Monitor, assign, and track student support
                                requests.
                            </p>
                        </div>

                        <Card>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Request</TableHead>
                                            <TableHead>Student</TableHead>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Unit</TableHead>
                                            <TableHead>Priority</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {requests.map((request) => (
                                            <TableRow key={request.id}>
                                                <TableCell className="font-semibold">
                                                    {request.id}
                                                </TableCell>

                                                <TableCell>
                                                    {request.student}
                                                </TableCell>

                                                <TableCell>
                                                    {request.subject}
                                                </TableCell>

                                                <TableCell>
                                                    {request.unit}
                                                </TableCell>

                                                <TableCell>
                                                    {request.priority}
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

            case "Students":
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Students
                            </h1>

                            <p className="text-muted-foreground mt-1">
                                View students and their support activity.
                            </p>
                        </div>

                        <Card>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Student ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Requests</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {students.map((student) => (
                                            <TableRow key={student.id}>
                                                <TableCell className="font-semibold">
                                                    {student.id}
                                                </TableCell>

                                                <TableCell>
                                                    {student.name}
                                                </TableCell>

                                                <TableCell>
                                                    {student.email}
                                                </TableCell>

                                                <TableCell>
                                                    {student.requests}
                                                </TableCell>

                                                <TableCell>
                                                    {student.status}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                );

            case "Support Staff":
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Support Staff
                            </h1>

                            <p className="text-muted-foreground mt-1">
                                Monitor support staff workload and performance.
                            </p>
                        </div>

                        <Card>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Staff</TableHead>
                                            <TableHead>Support Unit</TableHead>
                                            <TableHead>Requests</TableHead>
                                            <TableHead>Resolved</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {supportStaff.map((staff) => (
                                            <TableRow key={staff.name}>
                                                <TableCell className="font-semibold">
                                                    {staff.name}
                                                </TableCell>

                                                <TableCell>
                                                    {staff.unit}
                                                </TableCell>

                                                <TableCell>
                                                    {staff.requests}
                                                </TableCell>

                                                <TableCell>
                                                    {staff.resolved}
                                                </TableCell>

                                                <TableCell>
                                                    {staff.status}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                );

            case "Reports":
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Reports
                            </h1>

                            <p className="text-muted-foreground mt-1">
                                Review student support performance and trends.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Requests This Month
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <div className="text-3xl font-bold">
                                        188
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Resolution Rate
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <div className="text-3xl font-bold">
                                        86%
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Average Response
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <div className="text-3xl font-bold">
                                        4.2 hrs
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );

            case "Messages":
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Messages
                            </h1>

                            <p className="text-muted-foreground mt-1">
                                Communicate with students and support staff.
                            </p>
                        </div>

                        <Card className="p-6 text-center text-muted-foreground">
                            Manager messaging interface will appear here.
                        </Card>
                    </div>
                );

            case "Notifications":
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Notifications
                            </h1>

                            <p className="text-muted-foreground mt-1">
                                View important support and system notifications.
                            </p>
                        </div>

                        <Card className="p-6 text-center text-muted-foreground">
                            Notifications will appear here.
                        </Card>
                    </div>
                );

            case "Settings":
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Settings
                            </h1>

                            <p className="text-muted-foreground mt-1">
                                Manage your dashboard preferences.
                            </p>
                        </div>

                        <Card className="max-w-2xl">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between pb-4">
                                    <div>
                                        <h4 className="text-sm font-semibold">
                                            Interface Theme
                                        </h4>

                                        <p className="text-xs text-muted-foreground mt-1">
                                            Toggle between light and dark mode.
                                        </p>
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={toggleDark}
                                    >
                                        {isDark
                                            ? "Light Mode"
                                            : "Dark Mode"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                );

            default:
                return null;
        }
    };

    const initials = managerUser?.name
        ? managerUser.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
        : "MG";

    return (
        <div className="min-h-screen bg-background">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-border bg-card">
                <div className="flex items-center gap-3 h-16 px-6 border-b border-border">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground font-bold">
                        SS
                    </div>

                    <div>
                        <p className="font-bold text-sm">
                            Student Support
                        </p>

                        <p className="text-[10px] text-muted-foreground">
                            Manager Portal
                        </p>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.name;

                        return (
                            <button
                                key={item.name}
                                onClick={() => setActiveTab(item.name)}
                                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition ${
                                    isActive
                                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                }`}
                            >
                                <Icon className="h-4 w-4 flex-shrink-0" />
                                <span>{item.name}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border space-y-3">
                    <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-muted/40">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                            {initials}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold truncate">
                                {managerUser?.name || "Manager"}
                            </p>

                            <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                                Manager
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-destructive hover:bg-destructive/10 transition"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            {isMobileOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsMobileOpen(false)}
                    />

                    <aside className="relative flex flex-col w-72 max-w-xs bg-card border-r border-border h-full p-4 shadow-2xl">
                        <div className="flex items-center justify-between mb-6 pb-3 border-b border-border">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold">
                                    SS
                                </div>

                                <span className="font-bold text-sm">
                                    Manager Portal
                                </span>
                            </div>

                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="p-1.5 rounded-md hover:bg-accent text-muted-foreground"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <nav className="flex-1 space-y-1.5 overflow-y-auto">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeTab === item.name;

                                return (
                                    <button
                                        key={item.name}
                                        onClick={() => {
                                            setActiveTab(item.name);
                                            setIsMobileOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition ${
                                            isActive
                                                ? "bg-primary text-primary-foreground font-semibold"
                                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span>{item.name}</span>
                                    </button>
                                );
                            })}
                        </nav>

                        <div className="p-4 border-t border-border space-y-3">
                            <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-muted/40">
                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                    {initials}
                                </div>

                                <div>
                                    <p className="text-xs font-semibold">
                                        {managerUser?.name || "Manager"}
                                    </p>

                                    <p className="text-[10px] text-muted-foreground">
                                        Manager
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setIsMobileOpen(false);
                                    handleLogout();
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-destructive hover:bg-destructive/10"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen md:pl-64">
                <header className="sticky top-0 z-30 h-16 border-b border-border bg-card/85 backdrop-blur-md flex items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsMobileOpen(true)}
                            className="md:hidden p-2 -ml-2 rounded-md hover:bg-accent text-muted-foreground"
                        >
                            <Menu className="h-5 w-5" />
                        </button>

                        <h2 className="font-semibold text-sm md:text-base">
                            {activeTab}
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                            {initials}
                        </div>

                        <div className="hidden sm:block">
                            <p className="text-xs font-semibold">
                                {managerUser?.name || "Manager"}
                            </p>

                            <p className="text-[9px] text-muted-foreground">
                                Manager
                            </p>
                        </div>
                    </div>
                </header>

                <main className="flex-grow p-6 md:p-8 max-w-7xl w-full mx-auto">
                    {renderTabContent()}
                </main>
            </div>
        </div>
    );
}