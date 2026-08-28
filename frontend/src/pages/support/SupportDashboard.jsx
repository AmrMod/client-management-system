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
  MessageSquare,
  Bell,
  Settings,
  Menu,
  X,
  History,
  Building2,
  Activity,
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
} from "lucide-react";



import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import SupportRequests from "./components/SupportRequests";


export default function SupportDashboard() {
  const navigate = useNavigate();

   const { user, logout, updateUser, loading: authLoading } = useAuth();

  const [supportUser, setSupportUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const [requests] = useState([
    {
      id: "REQ-101",
      student: "John Doe",
      subject: "Unable to access student portal",
      unit: "IT Support",
      priority: "High",
      status: "Open",
    },
    {
      id: "REQ-102",
      student: "Aisha Mohammed",
      subject: "Course registration issue",
      unit: "Academic Support",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: "REQ-103",
      student: "Daniel James",
      subject: "Payment confirmation problem",
      unit: "Finance Support",
      priority: "Low",
      status: "Resolved",
    },
  ]);

  const [students] = useState([
    {
      id: "STU-001",
      name: "John Doe",
      email: "john@example.com",
      department: "Computer Science",
      status: "Active",
    },
    {
      id: "STU-002",
      name: "Aisha Mohammed",
      email: "aisha@example.com",
      department: "Accounting",
      status: "Active",
    },
    {
      id: "STU-003",
      name: "Daniel James",
      email: "daniel@example.com",
      department: "Business Administration",
      status: "Active",
    },
  ]);

  const [supportUnits] = useState([
    {
      id: 1,
      name: "IT Support",
      requests: 12,
      status: "Operational",
    },
    {
      id: 2,
      name: "Academic Support",
      requests: 8,
      status: "Operational",
    },
    {
      id: 3,
      name: "Finance Support",
      requests: 5,
      status: "Operational",
    },
  ]);

  const [activityLogs] = useState([
    {
      id: 1,
      action: "Resolved request REQ-103",
      time: "10 mins ago",
    },
    {
      id: 2,
      action: "Updated request REQ-102",
      time: "45 mins ago",
    },
    {
      id: 3,
      action: "Responded to John Doe",
      time: "1 hour ago",
    },
  ]);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");

  //   if (!storedUser) {
  //     navigate("/login");
  //     return;
  //   }

  //   const parsed = JSON.parse(storedUser);
  //   setSupportUser(parsed);

  //   const savedTheme = localStorage.getItem("theme");
  //   const systemDark = window.matchMedia(
  //     "(prefers-color-scheme: dark)"
  //   ).matches;

  //   const initialDark =
  //     savedTheme === "dark" || (!savedTheme && systemDark);

  //   setIsDark(initialDark);

  //   if (initialDark) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [navigate]);
 useEffect(() => {
        if (!authLoading && !user) {
          navigate("/login");
        }
      }, [user, authLoading, navigate]);

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
      name: "Support Units",
      icon: Building2,
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
      name: "Activity",
      icon: History,
    },
    {
      name: "Settings",
      icon: Settings,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
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
                  <div className="text-2xl font-bold">18</div>

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
                  <div className="text-2xl font-bold">9</div>

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
                  <div className="text-2xl font-bold">14</div>

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
                  <div className="text-2xl font-bold">5</div>

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
                      <TableHead>Request</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Support Unit</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div>
                            <p className="font-semibold">
                              {request.subject}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {request.id}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell>{request.student}</TableCell>

                        <TableCell>{request.unit}</TableCell>

                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              request.priority === "High"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                : request.priority === "Medium"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            }`}
                          >
                            {request.priority}
                          </span>
                        </TableCell>

                        <TableCell>{request.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "Requests":
         return (
          <SupportRequests />
        //   <div className="space-y-6 animate-in fade-in duration-300">
        //     <div>
        //       <h1 className="text-3xl font-bold tracking-tight text-foreground">
        //         Support Requests
        //       </h1>

        //       <p className="text-muted-foreground mt-1">
        //         View and manage student support requests.
        //       </p>
        //     </div>

        //     <Card>
        //       <CardContent className="p-0">
        //         <Table>
        //           <TableHeader>
        //             <TableRow>
        //               <TableHead>Request</TableHead>
        //               <TableHead>Student</TableHead>
        //               <TableHead>Unit</TableHead>
        //               <TableHead>Priority</TableHead>
        //               <TableHead>Status</TableHead>
        //             </TableRow>
        //           </TableHeader>

        //           <TableBody>
        //             {requests.map((request) => (
        //               <TableRow key={request.id}>
        //                 <TableCell>
        //                   <div>
        //                     <p className="font-semibold">
        //                       {request.subject}
        //                     </p>

        //                     <p className="text-xs text-muted-foreground">
        //                       {request.id}
        //                     </p>
        //                   </div>
        //                 </TableCell>

        //                 <TableCell>{request.student}</TableCell>
        //                 <TableCell>{request.unit}</TableCell>

        //                 <TableCell>
        //                   <span className="text-sm">
        //                     {request.priority}
        //                   </span>
        //                 </TableCell>

        //                 <TableCell>{request.status}</TableCell>
        //               </TableRow>
        //             ))}
        //           </TableBody>
        //         </Table>
        //       </CardContent>
        //     </Card>
        //   </div>
        );

      case "Students":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Students
              </h1>

              <p className="text-muted-foreground mt-1">
                Students who have interacted with the support system.
              </p>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                              <User className="h-4 w-4" />
                            </div>

                            <div>
                              <p className="font-semibold">
                                {student.name}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                {student.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>{student.email}</TableCell>

                        <TableCell>{student.department}</TableCell>

                        <TableCell>
                          <span className="text-emerald-600 text-sm font-medium">
                            {student.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "Support Units":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Support Units
              </h1>

              <p className="text-muted-foreground mt-1">
                Support departments available to students.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportUnits.map((unit) => (
                <Card key={unit.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Building2 className="h-5 w-5 text-primary" />

                      <span className="text-xs text-emerald-600 font-medium">
                        {unit.status}
                      </span>
                    </div>

                    <CardTitle className="text-base">
                      {unit.name}
                    </CardTitle>

                    <CardDescription>
                      {unit.requests} active requests
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        );

      case "Messages":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Messages
              </h1>

              <p className="text-muted-foreground mt-1">
                Communicate with students regarding their requests.
              </p>
            </div>

            <Card className="p-6 text-center text-muted-foreground">
              Student support conversations will appear here.
            </Card>
          </div>
        );

      case "Notifications":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Notifications
              </h1>

              <p className="text-muted-foreground mt-1">
                Important updates and request alerts.
              </p>
            </div>

            <Card className="p-6 text-center text-muted-foreground">
              Support notifications will appear here.
            </Card>
          </div>
        );

      case "Activity":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Activity
              </h1>

              <p className="text-muted-foreground mt-1">
                Recent actions performed by support staff.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {activityLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between border-b pb-3 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
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
          </div>
        );

      case "Settings":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Settings
              </h1>

              <p className="text-muted-foreground mt-1">
                Manage your support dashboard preferences.
              </p>
            </div>

            <Card className="max-w-2xl">
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <h4 className="text-sm font-semibold">
                      Interface Theme
                    </h4>

                    <p className="text-xs text-muted-foreground">
                      Toggle between light and dark mode.
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleDark}
                  >
                    {isDark ? "Light Mode" : "Dark Mode"}
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

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border flex-col">
        {/* Brand */}
        <div className="h-16 flex items-center px-5 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold">
              SS
            </div>

            <span className="font-bold text-base tracking-tight">
              Support Portal
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition duration-150 ${
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

        {/* User / Logout */}
        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-muted/40">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              {supportUser?.name
                ? supportUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "SS"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold truncate">
                {supportUser?.name || "Support Staff"}
              </p>

              <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                Support Staff
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-destructive hover:bg-destructive/10 transition duration-200"
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
            <div className="flex items-center justify-between mb-6 pb-2 border-b">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold">
                  SS
                </div>

                <span className="font-bold text-base">
                  Support Portal
                </span>
              </div>

              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1.5 rounded-md hover:bg-accent"
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
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />

                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-border mt-auto space-y-3">
              <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-muted/40">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  SS
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold truncate">
                    {supportUser?.name || "Support Staff"}
                  </p>

                  <p className="text-[10px] text-muted-foreground">
                    Support Staff
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

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen md:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-card/85 backdrop-blur-md flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-md hover:bg-accent"
            >
              <Menu className="h-5 w-5" />
            </button>

            <h2 className="font-semibold text-sm md:text-base">
              {activeTab}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              SS
            </div>

            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold leading-none">
                {supportUser?.name || "Support Staff"}
              </div>

              <div className="text-[9px] text-muted-foreground mt-1">
                Support Staff
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow p-6 md:p-8 max-w-6xl w-full mx-auto">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}