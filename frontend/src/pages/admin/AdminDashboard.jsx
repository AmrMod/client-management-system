
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Users as UsersIcon,
  LayoutDashboard,
  LogOut,
  User,
  ClipboardList,
  MessageSquare,
  Settings,
  Menu,
  X,
  Briefcase,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";

// Import user components connected to database
//import UsersList from "./Users";
import Students from "./Students";
import Staff from "./Staff";
import AdminConversationUI from "./AdminConversationUI";
import AdminDashboardHome from "./AdminDashboardHome";
import Allrequests from "./Allrequests";

import { useNavigate } from "react-router-dom";



export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user: adminUser, logout, loading: authLoading } = useAuth();
  // const [adminUser, setAdminUser] = useState(null); // Replaced by useAuth() context
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [openSections, setOpenSections] = useState({ "User Management": true });
  const [error, setError] = useState(null);
  
  



  // NEW: Theme initialization (no longer tied to user loading)
  useEffect(() => {
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

  useEffect(() => {

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



  // NEW: handleLogout using AuthContext
  const handleLogout = () => {
    logout();
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

  // 
  
  const menuItems = [
{ name: "Dashboard", icon: LayoutDashboard },


{
    name: "User Management",
    icon: UsersIcon,
    subItems: [
        { name: "Students", icon: User },
        { name: "Staff", icon: Briefcase },
    ]
},


{ name: "Requests", icon: ClipboardList },
{ name: "Messages", icon: MessageSquare },
{ name: "Settings", icon: Settings },


];


  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
         return (
      <AdminDashboardHome />   );

      case "Staff":
        return <Staff />;

      case "Students":
        return <Students />;
      
      


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

   
      
      case "Requests":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            

            <Allrequests />

            
          </div>


          


        );

      

      case "Messages":
        return (
        <div className="space-y-8">

            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Messages
                </h1>

                <p className="text-muted-foreground mt-1">
                    View conversations across all support units.
                </p>
            </div>

            <AdminConversationUI />

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