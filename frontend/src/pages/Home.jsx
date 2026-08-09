import { Link } from "react-router-dom";
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
    Users,
    Shield,
    Zap,
    ArrowRight,
    CheckCircle2,
    Sparkles,
} from "lucide-react";

const features = [
    {
        icon: ClipboardList,
        title: "Student Support Requests",
        description:
            "Give students one place to submit academic, accommodation, IT, and general support requests.",
    },
    {
        icon: Users,
        title: "Centralized Support",
        description:
            "Help managers and support staff organize, assign, and follow up on student requests efficiently.",
    },
    {
        icon: Shield,
        title: "Role-Based Access",
        description:
            "Students, support staff, managers, and administrators see the information and actions relevant to their roles.",
    },
    {
        icon: Zap,
        title: "Simple & Efficient",
        description:
            "Designed to make student support easier to track, faster to manage, and clearer for everyone involved.",
    },
];

const highlights = [
    "Centralized student support",
    "Request tracking",
    "Role-based access",
    "Support team workflow",
];

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                <GraduationCap className="h-4 w-4 text-primary-foreground" />
                            </div>

                            <span className="text-lg font-bold text-foreground">
                                Student Support
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button size="sm" className="gap-1">
                                    Sign In
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary/5 via-primary/3 to-transparent rounded-full blur-3xl" />

                    <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />

                    <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-gradient-to-bl from-indigo-500/5 to-cyan-500/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-8 shadow-sm">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        <span>One place for student support</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
                        Student Support,{" "}
                        <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                            Made Simple
                        </span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        A centralized platform for students to submit support
                        requests and for university teams to manage, assign,
                        track, and resolve them efficiently.
                    </p>

                    {/* CTA */}
                    <div className="mt-10 flex items-center justify-center">
                        <Link to="/login">
                            <Button
                                size="lg"
                                className="gap-2 text-base px-8 h-12 shadow-lg shadow-primary/20"
                            >
                                Sign In
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                        {highlights.map((item) => (
                            <div key={item} className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="border-t bg-muted/30">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                            Everything in one place
                        </h2>

                        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
                            A simple workflow connecting students with the
                            people responsible for helping them.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature) => (
                            <Card
                                key={feature.title}
                                className="group hover:shadow-md transition-all duration-300 border-border/60 hover:border-primary/20"
                            >
                                <CardHeader>
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/15 transition-colors">
                                        <feature.icon className="h-5 w-5 text-primary" />
                                    </div>

                                    <CardTitle className="text-lg">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <CardDescription className="text-base leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="border-t">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="relative rounded-2xl bg-primary p-10 sm:p-16 text-center overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute inset-0 -z-0">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />

                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground">
                                Need student support?
                            </h2>

                            <p className="mt-4 text-lg text-primary-foreground/80 max-w-lg mx-auto">
                                Sign in to submit and track your support
                                requests.
                            </p>

                            <div className="mt-8">
                                <Link to="/login">
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="text-base px-8 h-12 gap-2 shadow-lg"
                                    >
                                        Sign In
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
                                <GraduationCap className="h-3 w-3 text-primary-foreground" />
                            </div>

                            <span className="text-sm font-semibold text-foreground">
                                Student Support Management System
                            </span>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} Student Support
                            Management System. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}