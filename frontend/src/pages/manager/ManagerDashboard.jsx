

// import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    LayoutDashboard,
    LogOut,
    ClipboardList,
    Users,
    UserRoundCog,
    MessageSquare,
    Bell,
    Settings,
    Menu,
    X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ManagerRequests from "./components/ManagerRequests";
import ManagerStudents from "./components/ManagerStudents";
import SupportConversationUI from "../support/components/SupportConversationUI";
import ManagerDashboardHome from "./components/ManagerDashboardHome";
import NotificationUI from "../dashboard/components/NotificationUI";
import ManagerStaffSummary from "./components/ManagerStaffSummary";

import { useQuery } from "@tanstack/react-query";

import { getMyNotifications } from "@/api/notificationapi";



import socket from "@/socket/socket";



export default function ManagerDashboard() {
    // const navigate = useNavigate();

      const { user, logout, loading: authLoading } = useAuth();

    const [activeTab, setActiveTab] = useState("Dashboard");
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const [unreadMessages, setUnreadMessages] = useState(0);

 

    const profileName =
    user?.studentProfile?.name ||
    user?.staffProfile?.name ||
    "User";
    

    
    const {
        data: notifications = [],
        isLoading: notificationsLoading,
        isError: notificationsError
    } = useQuery({
        queryKey: ["notifications"],
        queryFn: getMyNotifications
    });


    const handleLogout = () => {
        logout();
    };

     useEffect(() => {

    socket.connect();

    return () => {
        socket.disconnect();
    };

}, []);



  useEffect(() => {

      const handleNewMessage = (message) => {

          // Don't count messages while the user is
          // already viewing the Messages page.
          if (activeTab === "Messages") {
              return;
          }

          setUnreadMessages(prev => prev + 1);

      };

      socket.on(
          "new_message",
          handleNewMessage
      );

      return () => {

          socket.off(
              "new_message",
              handleNewMessage
          );

      };

  }, [activeTab]);


// When user opens Messages page, clear badge
  useEffect(() => {

      if (activeTab === "Messages") {
          setUnreadMessages(0);
      }

  }, [activeTab]);

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
            name: "Messages",
            icon: MessageSquare,
            badge:unreadMessages,
        },
        {
            name: "Notifications",
            icon: Bell,
            badge: notifications.filter(n => !n.read).length
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

                    <ManagerDashboardHome notifications={notifications} />

                );

            case "Requests":
                return (
                    <ManagerRequests />
                );
            case "Students":
                return (
                    <ManagerStudents />
                );

            case "Support Staff":
                 return (

                <ManagerStaffSummary />
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

                        <SupportConversationUI />
                    </div>
                );

            case "Notifications":
                return (
                    <div className="space-y-6">
                        <div>

                            
                        </div>

                        

                        <NotificationUI notifications={notifications} />

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

    const initials = profileName
        ? profileName
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


                                {item.badge > 0 && (
                                <span className="min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                    {item.badge}
                                </span>
                                )}
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
                                {profileName || "Manager"}
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

                                        {item.badge > 0 && (
                                            <span className="min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                                {item.badge}
                                            </span>
                                        )}
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
                                        {profileName || "Manager"}
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
                                {profileName || "Manager"}
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