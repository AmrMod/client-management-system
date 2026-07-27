
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Users as UsersIcon,
  LayoutDashboard,
  LogOut,
  User,
  ClipboardList,
  MessageSquare,
  Bell,
  FolderOpen,
  Settings,
  Menu,
  X,
  ShieldCheck,
  Briefcase,
  FolderKanban,
  CheckSquare,
  BarChart3,
  CreditCard,
  History,
  ChevronDown,
  ChevronRight,
  Plus,
  Activity,
  DollarSign
} from "lucide-react";
import { useEffect, useState } from "react";

// Import user components connected to database
import UsersList from "./Users";
import CreateUserByAdmin from "./createUserByAdmin";

// import { getTotalUsers } from "@/api/userapi";
import { getDashboardStats } from "@/api/userapi";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [openSections, setOpenSections] = useState({ "User Management": true });
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersThisMonth, setUsersThisMonth] = useState(0);
  const [usersLastMonth, setUsersLastMonth] = useState(0);
  const [growthRate, setGrowthRate] = useState(0);
  const [error, setError] = useState("");

  // Mock roles state
  const [roles] = useState([
    { name: "ADMIN", usersCount: 3, description: "Full access to all modules and configurations" },
    { name: "MANAGER", usersCount: 8, description: "Access to clients, projects and tasks management" },
    { name: "CLIENT", usersCount: 120, description: "Access to client portal, documents and ticket submissions" },
    { name: "SUPPORT", usersCount: 15, description: "Access to message portal, requests queue and FAQs" }
  ]);

  // Mock Clients state
  const [clients] = useState([
    { id: "CL-101", name: "Acme Corp", contact: "John Doe", email: "john@acme.com", status: "Active" },
    { id: "CL-102", name: "Stark Industries", contact: "Pepper Potts", email: "pepper@stark.com", status: "Active" },
    { id: "CL-103", name: "Wayne Enterprises", contact: "Lucius Fox", email: "fox@wayne.com", status: "Pending" }
  ]);

  // Mock projects state
  const [projects] = useState([
    { id: "PRJ-901", name: "E-Commerce Gateway", client: "Acme Corp", progress: 85, status: "In Progress" },
    { id: "PRJ-902", name: "Arch Reactor Upgrade", client: "Stark Industries", progress: 40, status: "In Progress" },
    { id: "PRJ-903", name: "Batcave Networking", client: "Wayne Enterprises", progress: 100, status: "Completed" }
  ]);

  // Mock Tasks state
  const [tasks] = useState([
    { id: "TSK-01", name: "Database Schema Update", assignTo: "Admin", priority: "High", status: "In Progress" },
    { id: "TSK-02", name: "Frontend Component Library", assignTo: "Sarah", priority: "Medium", status: "Review" },
    { id: "TSK-03", name: "SSL Certificate Renewal", assignTo: "Devops Team", priority: "Urgent", status: "Completed" }
  ]);

  // Mock activity logs state
  const [activityLogs] = useState([
    { id: 1, user: "Amir Modibbo", action: "Created User 'John Doe'", time: "10 mins ago", type: "Create" },
    { id: 2, user: "System", action: "Backup database process completed successfully", time: "1 hour ago", type: "System" },
    { id: 3, user: "Admin", action: "Updated Project 'Batcave Networking' to Completed", time: "3 hours ago", type: "Update" }
  ]);

  // Mock Payments state
  const [payments] = useState([
    { id: "TXN-8820", client: "Wayne Enterprises", amount: "$15,200.00", date: "2026-07-04", status: "Succeeded" },
    { id: "TXN-8819", client: "Acme Corp", amount: "$4,500.00", date: "2026-07-02", status: "Succeeded" },
    { id: "TXN-8818", client: "Stark Industries", amount: "$8,000.00", date: "2026-06-30", status: "Pending" }
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      const parsed = JSON.parse(storedUser);
      setAdminUser(parsed);
    }

    // Theme initialization
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = savedTheme === "dark" || (!savedTheme && systemDark);
    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [navigate]);

  useEffect(() => {
    // const getTotalUsersByAdmin = async () => {
    //             try {
    //                 const response = await getTotalUsers();
    //                 setTotalUsers(response);
    //             } catch (error) {
    //                 setError(error.message);
    //             } 
    //         };
    // getTotalUsersByAdmin();

    const getDashboardStatsByAdmin = async () => {
        try {
            const response = await getDashboardStats();
            setTotalUsers(response.totalUsers);
            setUsersThisMonth(response.usersThisMonth);
            setUsersLastMonth(response.usersLastMonth);
            setGrowthRate(response.growthRate);
        } catch (error) {
            setError(error.message);
        }
    };
    getDashboardStatsByAdmin();
  }, [adminUser])

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleSection = (sectionName) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
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
    { name: "Dashboard", icon: LayoutDashboard },
    {
      name: "User Management",
      icon: UsersIcon,
      subItems: [
        { name: "Users", icon: User },
        { name: "Roles", icon: ShieldCheck },
      ]
    },
    { name: "Client Management", icon: Briefcase },
    { name: "Projects", icon: FolderKanban },
    { name: "Requests", icon: ClipboardList },
    { name: "Tasks", icon: CheckSquare },
    { name: "Documents", icon: FolderOpen },
    { name: "Messages", icon: MessageSquare },
    { name: "Notifications", icon: Bell },
    { name: "Reports", icon: BarChart3 },
    { name: "Payments", icon: CreditCard },
    { name: "Activity Logs", icon: History },
    { name: "Settings", icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                System Overview, metrics, and administration metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalUsers}</div>
                  <p className="text-xs text-muted-foreground mt-1">{growthRate}% this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground mt-1">4 added this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$48,250</div>
                  <p className="text-xs text-muted-foreground mt-1">+8.2% vs last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                  <ClipboardList className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground mt-1">5 marked as high priority</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">System Audit Trail</CardTitle>
                  <CardDescription>Recent actions performed by system administrators.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activityLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            <Activity className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground">{log.action}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">By {log.user}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Service Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Database Node</span>
                    <span className="text-xs text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">Operational</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Core Authentication API</span>
                    <span className="text-xs text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">Operational</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">SMTP Email Server</span>
                    <span className="text-xs text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">Operational</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "Users":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">User Directory</h1>
                <p className="text-muted-foreground mt-1">Manage system accounts, edit user roles, or remove accounts.</p>
              </div>
              <Button onClick={() => setActiveTab("Create User")} className="gap-2">
                <Plus className="h-4 w-4" /> Create User
              </Button>
            </div>
            <Card className="overflow-hidden p-6 pt-0">
              <UsersList />
              
            </Card>
          </div>
        );

      case "Create User":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setActiveTab("Users")}>
                &larr; Back to Users
              </Button>
            </div>
            <CreateUserByAdmin />
          </div>
        );

      case "Roles":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Role Permissions</h1>
              <p className="text-muted-foreground mt-1">Configure security levels and system user roles.</p>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-semibold">{role.name}</TableCell>
                        <TableCell>{role.usersCount} users</TableCell>
                        <TableCell className="text-muted-foreground">{role.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "Client Management":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Client Management</h1>
              <p className="text-muted-foreground mt-1">Directory of company clients and statuses.</p>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client ID</TableHead>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Contact Representative</TableHead>
                      <TableHead>Email Address</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-semibold">{client.id}</TableCell>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>{client.contact}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            client.status === "Active" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" :
                            "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                          }`}>
                            {client.status}
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

      case "Projects":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Projects</h1>
              <p className="text-muted-foreground mt-1">Track company contract projects and developmental stages.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((prj) => (
                <Card key={prj.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">{prj.name}</CardTitle>
                    <CardDescription>{prj.client}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{prj.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${prj.progress}%` }} />
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t pt-3">
                      <span className="text-xs text-muted-foreground">{prj.id}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        prj.status === "Completed" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" :
                        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      }`}>
                        {prj.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "Requests":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Support Requests Queue</h1>
              <p className="text-muted-foreground mt-1">Manage ticket issues raised by clients.</p>
            </div>
            <Card className="p-6 text-center text-muted-foreground">
              Requests module database queue display here.
            </Card>
          </div>
        );

      case "Tasks":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Operational Tasks</h1>
              <p className="text-muted-foreground mt-1">Coordinate staff operational duties.</p>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-semibold">{task.name}</TableCell>
                        <TableCell>{task.assignTo}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            task.priority === "Urgent" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                            task.priority === "High" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" :
                            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          }`}>
                            {task.priority}
                          </span>
                        </TableCell>
                        <TableCell>{task.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "Documents":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Documents Library</h1>
              <p className="text-muted-foreground mt-1">Manage system uploads and configurations.</p>
            </div>
            <Card className="p-6 text-center text-muted-foreground">
              Document archives database explorer here.
            </Card>
          </div>
        );

      case "Messages":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Messages</h1>
              <p className="text-muted-foreground mt-1">View system support channels.</p>
            </div>
            <Card className="p-6 text-center text-muted-foreground">
              Direct inbox integrations display here.
            </Card>
          </div>
        );

      case "Notifications":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Notifications Log</h1>
              <p className="text-muted-foreground mt-1">View system event alerts and dispatch logs.</p>
            </div>
            <Card className="p-6 text-center text-muted-foreground">
              SMTP dispatch logs and dynamic updates.
            </Card>
          </div>
        );

      case "Reports":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Business Reports</h1>
              <p className="text-muted-foreground mt-1">Export database analytics and metrics.</p>
            </div>
            <Card className="p-6 text-center text-muted-foreground">
              Download PDF/CSV analytics reports here.
            </Card>
          </div>
        );

      case "Payments":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Client Payments</h1>
              <p className="text-muted-foreground mt-1">Transaction entries log history.</p>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-semibold">{payment.id}</TableCell>
                        <TableCell>{payment.client}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            payment.status === "Succeeded" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" :
                            "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                          }`}>
                            {payment.status}
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

      case "Activity Logs":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Activity Logs</h1>
              <p className="text-muted-foreground mt-1">Audit logs of all database actions.</p>
            </div>
            <Card className="p-6 text-center text-muted-foreground">
              User logs stream display here.
            </Card>
          </div>
        );

      case "Settings":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">System Configuration</h1>
              <p className="text-muted-foreground mt-1">Manage global preferences and developer options.</p>
            </div>
            <Card className="max-w-2xl">
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Interface Theme</h4>
                    <p className="text-xs text-muted-foreground">Toggle between light and dark visual styling.</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={toggleDark}>
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
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-40 border-r bg-card border-border">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-border">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold shadow-sm">
            AP
          </div>
          <span className="font-bold text-base text-foreground tracking-tight">
            Admin Portal
          </span>
        </div>

        {/* Navigation Options */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;

            if (item.subItems) {
              const isSectionOpen = openSections[item.name];
              const isChildActive = item.subItems.some(sub => activeTab === sub.name);

              return (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => toggleSection(item.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition duration-150 cursor-pointer ${
                      isChildActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    {isSectionOpen ? (
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </button>

                  {isSectionOpen && (
                    <div className="pl-6 space-y-1">
                      {item.subItems.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = activeTab === sub.name;
                        return (
                          <button
                            key={sub.name}
                            onClick={() => setActiveTab(sub.name)}
                            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition duration-150 cursor-pointer ${
                              isSubActive
                                ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            }`}
                          >
                            <SubIcon className="h-3.5 w-3.5" />
                            <span>{sub.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition duration-150 cursor-pointer ${
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

        {/* User Card & Logout Footer */}
        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-muted/40">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-foreground truncate">Admin User</p>
              <p className="text-[10px] text-muted-foreground truncate mt-0.5">System Admin</p>
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

      {/* Mobile Drawer Sidebar */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="relative flex flex-col w-72 max-w-xs bg-card border-r border-border h-full p-4 animate-in slide-in-from-left duration-200 ease-out shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold shadow-sm">
                  AP
                </div>
                <span className="font-bold text-base text-foreground tracking-tight">
                  Admin Portal
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

                if (item.subItems) {
                  const isSectionOpen = openSections[item.name];
                  const isChildActive = item.subItems.some(sub => activeTab === sub.name);

                  return (
                    <div key={item.name} className="space-y-1">
                      <button
                        onClick={() => toggleSection(item.name)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition duration-150 cursor-pointer ${
                          isChildActive
                            ? "text-primary font-semibold"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        {isSectionOpen ? (
                          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                      </button>

                      {isSectionOpen && (
                        <div className="pl-6 space-y-1">
                          {item.subItems.map((sub) => {
                            const SubIcon = sub.icon;
                            const isSubActive = activeTab === sub.name;
                            return (
                              <button
                                key={sub.name}
                                onClick={() => {
                                  setActiveTab(sub.name);
                                  setIsMobileOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition duration-150 cursor-pointer ${
                                  isSubActive
                                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                }`}
                              >
                                <SubIcon className="h-3.5 w-3.5" />
                                <span>{sub.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.name);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition duration-150 cursor-pointer ${
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

            <div className="p-4 border-t border-border mt-auto space-y-3">
              <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-muted/40">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  AD
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground truncate">AD</p>
                  <p className="text-[10px] text-muted-foreground truncate mt-0.5">System Admin</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-destructive hover:bg-destructive/10 transition duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Panel Content Container */}
      <div className="flex-1 flex flex-col min-h-screen md:pl-64">
        {/* Header Bar */}
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-card/85 backdrop-blur-md flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-md hover:bg-accent text-muted-foreground mr-1"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="font-semibold text-sm md:text-base text-foreground">
              {activeTab}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                AD
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-semibold text-foreground leading-none">Admin User</div>
                <div className="text-[9px] text-muted-foreground leading-none mt-1">System Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Pane */}
        <main className="flex-grow p-6 md:p-8 max-w-6xl w-full mx-auto">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}