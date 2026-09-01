import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getCurrentUser } from "../api/userapi";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/components/ui/card";
import {
GraduationCap,
LogIn,
ArrowRight,
ShieldCheck,
LifeBuoy,
} from "lucide-react";

const Login = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const navigate = useNavigate();
const {user, login } = useAuth();

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
        setError("Please fill in all the fields");
        return;
    }

    // if (!email.includes("@")) {
    //     setError("Please enter a valid email address");
    //     return;
    // }

    // if (password.length < 6) {
    //     setError("Password must be at least 6 characters long");
    //     return;
    // }

    setLoading(true);

    try {
        const loginResponse = await loginUser(email, password);

        

        const currentUser = await login(loginResponse);

        


        
        

        // if (user.user.role === "ADMIN") {
        //     navigate("/AdminDashboard");
        // } else if (user.user.role === "ManagerDashbo") {
        //     navigate("/ManagerDashboard");
        // } else if (user.user.role === "STUDENT") {
        //     navigate("/dashboard");
        // }

        if (currentUser.role === "ADMIN") {
            navigate("/AdminDashboard");

        } else if (
            currentUser.role === "STAFF" &&
            currentUser.staffProfile?.staffRole === "MANAGER"
        ) {
            navigate("/ManagerDashboard");

        } else if (
            currentUser.role === "STAFF" &&
            currentUser.staffProfile?.staffRole === "SUPPORT_STAFF"
        ) {
            navigate("/SupportDashboard");

        } else if (currentUser.role === "STUDENT") {
            navigate("/dashboard");
        }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

return (
    <div className="min-h-screen bg-muted/30 flex">

        {/* Left panel */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10" />
                <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-white/10" />
            </div>

            <div className="relative z-10 flex flex-col justify-between w-full p-12 xl:p-16">

                <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center">
                        <GraduationCap className="h-6 w-6" />
                    </div>

                    <div>
                        <p className="font-semibold text-lg">
                            Student Support
                        </p>
                        <p className="text-sm text-primary-foreground/70">
                            Management System
                        </p>
                    </div>
                </div>

                <div className="max-w-lg">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1.5 text-sm mb-6">
                        <LifeBuoy className="h-4 w-4" />
                        Student support made simpler
                    </div>

                    <h1 className="text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
                        One place to get the support you need.
                    </h1>

                    <p className="mt-6 text-lg leading-relaxed text-primary-foreground/75">
                        Submit support requests, follow their progress,
                        and stay informed as university support teams
                        work to resolve your concerns.
                    </p>

                    <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                                <ShieldCheck className="h-4 w-4" />
                            </div>

                            <span className="text-sm text-primary-foreground/80">
                                Secure access to your support services
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                                <ArrowRight className="h-4 w-4" />
                            </div>

                            <span className="text-sm text-primary-foreground/80">
                                Track requests from submission to resolution
                            </span>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-primary-foreground/50">
                    Student Support Management System
                </p>
            </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex items-center justify-center px-5 py-10">
            <div className="w-full max-w-md">

                {/* Mobile branding */}
                <div className="lg:hidden text-center mb-8">
                    <div className="inline-flex h-12 w-12 rounded-xl bg-primary items-center justify-center mb-4">
                        <GraduationCap className="h-6 w-6 text-primary-foreground" />
                    </div>

                    <h1 className="text-2xl font-bold">
                        Student Support
                    </h1>

                    <p className="text-sm text-muted-foreground mt-1">
                        Management System
                    </p>
                </div>

                <Card className="border-border/60 shadow-xl shadow-black/5">

                    <CardHeader className="space-y-3 pb-6">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <LogIn className="h-5 w-5 text-primary" />
                        </div>

                        <div>
                            <CardTitle className="text-2xl">
                                Welcome back
                            </CardTitle>

                            <CardDescription className="mt-2">
                                Sign in to access your student support
                                account.
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-5">

                            {error && (
                                <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3">
                                    <p className="text-sm text-destructive">
                                        {error}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    Email address
                                </Label>

                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    autoComplete="email"
                                    className="h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">
                                        Password
                                    </Label>
                                </div>

                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete="current-password"
                                    className="h-11"
                                />
                            </div>

                        </CardContent>

                        <CardFooter className="flex flex-col gap-5 pt-2">

                            <Button
                                type="submit"
                                className="w-full h-11 gap-2"
                                disabled={loading}
                            >
                                {loading
                                    ? "Signing in..."
                                    : "Sign In"}

                                {!loading && (
                                    <ArrowRight className="h-4 w-4" />
                                )}
                            </Button>

                            <p className="text-xs text-center text-muted-foreground leading-relaxed">
                                Use your institutional account credentials
                                to access the system.
                            </p>

                        </CardFooter>
                    </form>
                </Card>

                <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Secure institutional access
                </div>

            </div>
        </div>
    </div>
);


};

export default Login;
