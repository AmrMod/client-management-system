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
  Users,
  LayoutDashboard,
  LogOut,
  User,
  ClipboardList,
  PlusCircle,
  MessageSquare,
  Bell,
  Folder,
  Settings,
  Menu,
  X
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Profile states
  const [profileName, setProfileName] = useState("Client");
  const [profileEmail, setProfileEmail] = useState("client@example.com");
  const [profilePhone, setProfilePhone] = useState("+1 (555) 019-2834");
  const [profileCompany, setProfileCompany] = useState("Acme Corp");

  // Requests state
  const [requests, setRequests] = useState([
    { id: "REQ-1002", title: "API Integration Error", category: "Technical Support", priority: "High", status: "Pending", date: "2026-07-04" },
    { id: "REQ-1001", title: "Invoice Revision Request", category: "Billing", priority: "Medium", status: "Resolved", date: "2026-06-28" },
    { id: "REQ-0998", title: "Custom Theme Settings request", category: "Feature Request", priority: "Low", status: "Resolved", date: "2026-05-15" }
  ]);

  // Form states for New Request
  const [newReqTitle, setNewReqTitle] = useState("");
  const [newReqCategory, setNewReqCategory] = useState("Technical Support");
  const [newReqPriority, setNewReqPriority] = useState("Medium");
  const [newReqDesc, setNewReqDesc] = useState("");

  // Chats state
  const [activeChat, setActiveChat] = useState("Support");
  const [messages, setMessages] = useState({
    Support: [
      { sender: "support", text: "Hello! How can I assist you today?", time: "10:30 AM" },
      { sender: "client", text: "Hi, I have an issue with the API token auth.", time: "10:32 AM" },
      { sender: "support", text: "I can help with that. Could you share the response code you are receiving?", time: "10:33 AM" },
    ],
    PM: [
      { sender: "pm", text: "Hi Amir, the design sprint layouts are ready for your review.", time: "Yesterday" },
      { sender: "client", text: "Great! I'll take a look at them today.", time: "Yesterday" },
    ]
  });
  const [typedMsg, setTypedMsg] = useState("");

  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Support Reply", message: "A support agent replied to your ticket REQ-1002.", time: "10 min ago", read: false },
    { id: 2, title: "Invoice Paid", message: "Payment for invoice #INV-2026-04 was processed successfully.", time: "2 hours ago", read: false },
    { id: 3, title: "Project Update", message: "Project Manager shared a new design specification document.", time: "Yesterday", read: true }
  ]);

  // Documents state
  const [documents, setDocuments] = useState([
    { name: "Service_Agreement_2026.pdf", size: "2.4 MB", type: "PDF", date: "2026-06-01" },
    { name: "Project_Requirements.docx", size: "840 KB", type: "DOCX", date: "2026-06-15" },
    { name: "Homepage_Design_v2.png", size: "5.1 MB", type: "Image", date: "2026-07-02" },
  ]);
  const [uploadingDoc, setUploadingDoc] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
    } else {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setProfileName(parsed.name || "Client");
      setProfileEmail(parsed.email || "client@example.com");
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const addSystemNotification = (title, message) => {
    const newNotification = {
      id: Date.now(),
      title,
      message,
      time: "Just now",
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name: profileName, email: profileEmail };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    addSystemNotification("Profile Updated", "Your profile details have been successfully saved.");
  };

  const handleNewRequestSubmit = (e) => {
    e.preventDefault();
    if (!newReqTitle.trim() || !newReqDesc.trim()) return;

    const newReq = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newReqTitle,
      category: newReqCategory,
      priority: newReqPriority,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };

    setRequests([newReq, ...requests]);
    setNewReqTitle("");
    setNewReqDesc("");
    setActiveTab("My Requests");
    addSystemNotification("Request Created", `New request "${newReq.title}" has been submitted.`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typedMsg.trim()) return;

    const newMsg = {
      sender: "client",
      text: typedMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [activeChat]: [...prev[activeChat], newMsg]
    }));
    setTypedMsg("");

    setTimeout(() => {
      const reply = activeChat === "Support"
        ? { sender: "support", text: "Thanks for the details. Let me look into this and get back to you shortly.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        : { sender: "pm", text: "Sounds good, let me know if you need any adjustments.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };

      setMessages(prev => ({
        ...prev,
        [activeChat]: [...prev[activeChat], reply]
      }));
    }, 1500);
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const handleAddDocMock = () => {
    setUploadingDoc(true);
    setTimeout(() => {
      const mockDoc = {
        name: `Uploaded_Doc_${Math.floor(100 + Math.random() * 900)}.pdf`,
        size: "1.2 MB",
        type: "PDF",
        date: new Date().toISOString().split("T")[0]
      };
      setDocuments(prev => [mockDoc, ...prev]);
      setUploadingDoc(false);
      addSystemNotification("Document Uploaded", `Document "${mockDoc.name}" has been uploaded.`);
    }, 1000);
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
    { name: "My Profile", icon: User },
    { name: "My Requests", icon: ClipboardList },
    { name: "New Request", icon: PlusCircle },
    { name: "Messages", icon: MessageSquare, badge: 3 },
    { name: "Notifications", icon: Bell, badge: notifications.filter(n => !n.read).length },
    { name: "Documents", icon: Folder },
    { name: "Settings", icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {profileName}. Here&apos;s an overview of your workspace.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground mt-1">2 added this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground mt-1">Next release in 2 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                  <ClipboardList className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {requests.filter((r) => r.status === "Pending").length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Awaiting support reply</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Recent Requests</CardTitle>
                  <CardDescription>Overview of your most recent support requests.</CardDescription>
                </CardHeader>
                <CardContent>
                  {requests.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">No requests submitted yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {requests.slice(0, 3).map((req) => (
                        <div key={req.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                          <div>
                            <p className="font-semibold text-sm text-foreground">{req.title}</p>
                            <div className="flex gap-2 mt-1">
                              <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{req.category}</span>
                              <span className="text-[10px] text-muted-foreground">{req.date}</span>
                            </div>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            req.status === "Pending" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" :
                            "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                          }`}>
                            {req.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <Button onClick={() => setActiveTab("New Request")} className="w-full">
                    Create New Request
                  </Button>
                  <Button onClick={() => setActiveTab("Messages")} variant="outline" className="w-full">
                    Message Support
                  </Button>
                  <Button onClick={() => setActiveTab("Documents")} variant="ghost" className="w-full">
                    View Documents
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "My Profile":
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">My Profile</h1>
              <p className="text-muted-foreground mt-1">View and update your profile details.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1 flex flex-col items-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl shadow-sm mb-4">
                  {profileName.split(" ").map((n) => n[0]).join("").toUpperCase()}
                </div>
                <h3 className="font-bold text-lg text-foreground">{profileName}</h3>
                <p className="text-sm text-muted-foreground mt-1">{profileEmail}</p>
                <div className="w-full border-t my-6 pt-4 text-left space-y-3">
                  <div>
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">Role</span>
                    <span className="text-sm font-medium text-foreground">Client User</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">Status</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">Active</span>
                  </div>
                </div>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Profile Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="p-name">Full Name</Label>
                        <Input id="p-name" value={profileName} onChange={(e) => setProfileName(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="p-email">Email Address</Label>
                        <Input id="p-email" type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="p-phone">Phone Number</Label>
                        <Input id="p-phone" value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="p-company">Company</Label>
                        <Input id="p-company" value={profileCompany} onChange={(e) => setProfileCompany(e.target.value)} />
                      </div>
                    </div>
                    <Button type="submit" className="mt-4">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "My Requests":
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">My Requests</h1>
                <p className="text-muted-foreground mt-1">Track and manage your submitted requests.</p>
              </div>
              <Button onClick={() => setActiveTab("New Request")}>New Request</Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-semibold">{req.id}</TableCell>
                        <TableCell>{req.title}</TableCell>
                        <TableCell>{req.category}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            req.priority === "High" || req.priority === "Urgent" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                            req.priority === "Medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          }`}>
                            {req.priority}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            req.status === "Pending" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" :
                            "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                          }`}>
                            {req.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{req.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "New Request":
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">New Request</h1>
              <p className="text-muted-foreground mt-1">Submit a new request to our support and project teams.</p>
            </div>

            <Card className="max-w-2xl">
              <CardContent className="pt-6">
                <form onSubmit={handleNewRequestSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Request Subject</Label>
                    <Input
                      id="title"
                      placeholder="e.g. Issues with payment portal"
                      value={newReqTitle}
                      onChange={(e) => setNewReqTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-card dark:text-foreground"
                        value={newReqCategory}
                        onChange={(e) => setNewReqCategory(e.target.value)}
                      >
                        <option value="Technical Support">Technical Support</option>
                        <option value="Billing">Billing</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="Feedback">Feedback</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>

                    <div className="space-y-2 flex flex-col justify-end">
                      <Label className="mb-2">Priority Level</Label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {["Low", "Medium", "High", "Urgent"].map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setNewReqPriority(p)}
                            className={`py-1.5 px-2 text-xs font-medium rounded-md border transition-all ${
                              newReqPriority === p
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background hover:bg-accent border-input text-muted-foreground"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="desc">Description</Label>
                    <textarea
                      id="desc"
                      rows={5}
                      placeholder="Describe your issue or request..."
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus:border-ring dark:text-foreground"
                      value={newReqDesc}
                      onChange={(e) => setNewReqDesc(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full sm:w-auto">
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        );

      case "Messages":
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Messages</h1>
              <p className="text-muted-foreground mt-1">Communicate directly with your support agents and project managers.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[500px] border border-border rounded-xl overflow-hidden bg-card">
              <div className="lg:col-span-1 border-r border-border flex flex-col h-full bg-muted/10">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Conversations</h3>
                </div>
                <div className="flex-1 overflow-y-auto divide-y divide-border">
                  <div
                    onClick={() => setActiveChat("Support")}
                    className={`p-4 cursor-pointer transition flex items-center gap-3 ${
                      activeChat === "Support" ? "bg-accent" : "hover:bg-accent/40"
                    }`}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-sm">
                        SP
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-card" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-foreground">Support Team</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {messages.Support[messages.Support.length - 1]?.text}
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveChat("PM")}
                    className={`p-4 cursor-pointer transition flex items-center gap-3 ${
                      activeChat === "PM" ? "bg-accent" : "hover:bg-accent/40"
                    }`}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-sm">
                        PM
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-card" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-foreground">Sarah (PM)</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {messages.PM[messages.PM.length - 1]?.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 flex flex-col h-full bg-card">
                <div className="p-4 border-b border-border flex items-center gap-3 bg-card/50 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-sm">
                    {activeChat === "Support" ? "SP" : "PM"}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">
                      {activeChat === "Support" ? "Support Team" : "Sarah (Project Manager)"}
                    </h4>
                    <span className="text-xs text-emerald-500 font-medium">Online</span>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-muted/5 flex flex-col justify-end">
                  <div className="space-y-4">
                    {messages[activeChat].map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"} items-end gap-2`}>
                        {msg.sender !== "client" && (
                          <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold">
                            {activeChat === "Support" ? "SP" : "PM"}
                          </div>
                        )}
                        <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                          msg.sender === "client"
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-card border border-border text-foreground rounded-bl-none"
                        }`}>
                          <p className="leading-relaxed">{msg.text}</p>
                          <span className="block text-[9px] text-right mt-1 opacity-70">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-card flex items-center gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={typedMsg}
                    onChange={(e) => setTypedMsg(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">Send</Button>
                </form>
              </div>
            </div>
          </div>
        );

      case "Notifications":
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Notifications</h1>
              <p className="text-muted-foreground mt-1">Keep track of alerts, replies, and billing updates.</p>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
                <div>
                  <CardTitle>System Notifications</CardTitle>
                  <CardDescription>Stay updated with activities in your workspace.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={markAllRead}>
                    Mark all read
                  </Button>
                  <Button variant="ghost" size="sm" onClick={clearNotifications}>
                    Clear all
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">No notifications to display.</div>
                ) : (
                  <div className="divide-y divide-border">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-4 flex items-start gap-4 transition hover:bg-muted/10 ${
                          !n.read ? "bg-primary/5 border-l-2 border-primary" : ""
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bell className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm text-foreground">{n.title}</p>
                            <span className="text-[10px] text-muted-foreground">{n.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case "Documents":
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Documents</h1>
                <p className="text-muted-foreground mt-1">Access all your contracts, receipts, and agreements.</p>
              </div>
              <Button onClick={handleAddDocMock} disabled={uploadingDoc}>
                {uploadingDoc ? "Uploading..." : "Upload Document"}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc, idx) => (
                <Card key={idx} className="hover:shadow-md transition">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {doc.type}
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-sm font-semibold truncate">{doc.name}</CardTitle>
                      <CardDescription className="text-xs">{doc.size}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between border-t border-border pt-4">
                    <span className="text-xs text-muted-foreground">Uploaded: {doc.date}</span>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
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

                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Email Notifications</h4>
                      <p className="text-xs text-muted-foreground">Receive daily summaries and ticket replies.</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-input text-primary focus:ring-ring h-4 w-4"
                    />
                  </div>

                  <div className="flex items-center justify-between pb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Two-Factor Authentication</h4>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security to your client account.</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Configure
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