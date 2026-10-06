
 import { useQuery } from "@tanstack/react-query";
import { getMyNotifications } from "@/api/notificationapi";
 import {  getSupportUnits,   } from "@/api/requestapi";
import { useAuth } from "@/context/AuthContext";

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
  PlusCircle,
  MessageSquare,
  Bell,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import socket from "@/socket/socket";



import DashboardHome from "./components/DashboardHome";
import MyRequests from "./components/MyRequests";
import NewRequest from "./components/NewRequest";
import ConversationUI from "./components/ConversationUI";
import NotificationUI from "./components/NotificationUI";


export default function Dashboard() {
  


  const navigate = useNavigate();
  const { user, logout } = useAuth();
  



  // const [user, setUser] = useState(null); // Replaced by useAuth() context
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  
  
  

 

  // Form states for New Request
  const [requests, setRequests] = useState([]);
  

  const [supportUnits, setSupportUnits] = useState([]);
  const [supportUnitLoading, setSupportUnitLoading] = useState(false);




  const [unreadMessages, setUnreadMessages] = useState(0);





  const {
    data: notifications = [],
    isLoading: notificationsLoading,
    isError: notificationsError
} = useQuery({
    queryKey: ["notifications"],
    queryFn: getMyNotifications
});


  
  const profileName =
    user?.studentProfile?.name ||
    user?.staffProfile?.name ||
    "User";




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



  useEffect(() => {
    const loadSupportUnits = async () => {
      try {
        setSupportUnitLoading(true);

        const data = await getSupportUnits();

        setSupportUnits(data);

      } catch (error) {
        console.error("Failed to load support units:", error);
      } finally {
        setSupportUnitLoading(false);
      }
    };

    loadSupportUnits();

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
  }, []);



 





 

  // NEW: handleLogout using AuthContext
  

  
  const handleLogout = () => {
    logout();
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
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "My Requests", icon: ClipboardList },
    { name: "New Request", icon: PlusCircle },
    { name: "Messages", icon: MessageSquare, badge: unreadMessages },
    { name: "Notifications", icon: Bell, badge: notifications.filter(n => !n.read).length },
    { name: "Settings", icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <DashboardHome
            profileName={profileName}
            requests={requests}
            setActiveTab={setActiveTab}
          />
        );
  

      case "My Requests":
        return (
          <MyRequests
            setActiveTab={setActiveTab}
          />
        );

      case "New Request":
            return (
                <NewRequest
                    user={user}
                    supportUnits={supportUnits}
                    supportUnitLoading={supportUnitLoading}
                    setRequests={setRequests}
                    
                />
            );
  

      case "Messages":
        return (
          <ConversationUI
            supportUnits={supportUnits}
          />
        );

      case "Notifications":
         return (
        //   <div className="space-y-8 animate-in fade-in duration-300">
        //     <div>
        //       <h1 className="text-3xl font-bold tracking-tight text-foreground">Notifications</h1>
        //       <p className="text-muted-foreground mt-1">Keep track of alerts, replies, and billing updates.</p>
        //     </div>

        //     <Card>
        //       <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
        //         <div>
        //           <CardTitle>System Notifications</CardTitle>
        //           <CardDescription>Stay updated with activities in your workspace.</CardDescription>
        //         </div>
        //         <div className="flex items-center gap-2">
        //           <Button variant="outline" size="sm" onClick={markAllRead}>
        //             Mark all read
        //           </Button>
        //           <Button variant="ghost" size="sm" onClick={clearNotifications}>
        //             Clear all
        //           </Button>
        //         </div>
        //       </CardHeader>
        //       <CardContent className="p-0">
        //         {notifications.length === 0 ? (
        //           <div className="p-8 text-center text-muted-foreground">No notifications to display.</div>
        //         ) : (
        //           <div className="divide-y divide-border">
        //             {notifications.map((n) => (
        //               <div
        //                 key={n.id}
        //                 className={`p-4 flex items-start gap-4 transition hover:bg-muted/10 ${
        //                   !n.read ? "bg-primary/5 border-l-2 border-primary" : ""
        //                 }`}
        //               >
        //                 <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
        //                   <Bell className="h-4 w-4" />
        //                 </div>
        //                 <div className="flex-1 min-w-0">
        //                   <div className="flex items-center justify-between">
        //                     <p className="font-semibold text-sm text-foreground">{n.title}</p>
        //                     <span className="text-[10px] text-muted-foreground">{n.time}</span>
        //                   </div>
        //                   <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
        //                 </div>
        //               </div>
        //             ))}
        //           </div>
        //         )}
        //       </CardContent>
        //     </Card>
        //   </div>

        <NotificationUI notifications={notifications}  />
        );



      case "Settings":
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-1">Manage configuration and preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Adjust preferences and authentication settings.</CardDescription>
                </CardHeader>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
            CM
          </div>
          <span className="font-bold text-base text-foreground tracking-tight">
            Client Portal
          </span>
        </div>

        {/* Navigation Options */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Card & Logout Footer */}
        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-muted/40">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              {profileName.split(" ").map((n) => n[0]).join("").toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-foreground truncate">{profileName}</p>
              <p className="text-[10px] text-muted-foreground truncate mt-0.5">Client User</p>
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
          {/* Mobile Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileOpen(false)}
          />
          {/* Mobile Menu Panel */}
          <aside className="relative flex flex-col w-72 max-w-xs bg-card border-r border-border h-full p-4 animate-in slide-in-from-left duration-200 ease-out shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold shadow-sm">
                  CM
                </div>
                <span className="font-bold text-base text-foreground tracking-tight">
                  Client Portal
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
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-border mt-auto space-y-3">
              <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-muted/40">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  {profileName.split(" ").map((n) => n[0]).join("").toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground truncate">{profileName}</p>
                  <p className="text-[10px] text-muted-foreground truncate mt-0.5">Client User</p>
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
            <button
              onClick={() => setActiveTab("Notifications")}
              className="relative p-2 rounded-full hover:bg-accent text-muted-foreground transition duration-150"
            >
              <Bell className="h-5 w-5" />
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-card animate-pulse" />
              )}
            </button>

            <div
              onClick={() => setActiveTab("My Profile")}
              className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 p-1.5 rounded-lg transition duration-150"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                {profileName.split(" ").map((n) => n[0]).join("").toUpperCase()}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-semibold text-foreground leading-none">{profileName}</div>
                <div className="text-[9px] text-muted-foreground leading-none mt-1">Client User</div>
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