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
    Users,
    BarChart3,
    Shield,
    Zap,
    ArrowRight,
    CheckCircle2,
    Sparkles,
} from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Client Management",
        description:
            "Organize and manage all your client information in one centralized, easy-to-access platform.",
    },
    {
        icon: BarChart3,
        title: "Project Tracking",
        description:
            "Monitor project progress, deadlines, and deliverables with real-time updates and insights.",
    },
    {
        icon: Shield,
        title: "Secure & Reliable",
        description:
            "Enterprise-grade security to keep your client data safe and your operations running smoothly.",
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description:
            "Built for speed — instant search, quick navigation, and a responsive interface you'll love.",
    },
];

const highlights = [
    "Unlimited clients & projects",
    "Real-time collaboration",
    "Detailed analytics & reports",
    "Role-based access control",
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
                                <Sparkles className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="text-lg font-bold text-foreground">
                                ClientFlow
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="ghost" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button size="sm" className="gap-1">
                                    Get Started
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Gradient background decoration */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary/5 via-primary/3 to-transparent rounded-full blur-3xl" />
                    <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
                    <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-gradient-to-bl from-indigo-500/5 to-cyan-500/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-8 shadow-sm">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        <span>Streamline your client operations</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-3xl mx-auto leading-[1.1]">
                        Manage Clients{" "}
                        <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                            Effortlessly
                        </span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        The all-in-one platform to organize clients, track projects, and
                        grow your business — beautifully designed and incredibly simple.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register">
                            <Button size="lg" className="gap-2 text-base px-8 h-12 shadow-lg shadow-primary/20">
                                Start for Free
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-base px-8 h-12"
                            >
                                Sign In
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
                            Everything you need
                        </h2>
                        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
                            Powerful features to help you manage clients and projects with
                            confidence.
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
                                    <CardTitle className="text-lg">{feature.title}</CardTitle>
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
                                Ready to get started?
                            </h2>
                            <p className="mt-4 text-lg text-primary-foreground/80 max-w-lg mx-auto">
                                Join today and start managing your clients more effectively.
                                It&apos;s free to get started.
                            </p>
                            <div className="mt-8">
                                <Link to="/register">
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="text-base px-8 h-12 gap-2 shadow-lg"
                                    >
                                        Create Your Account
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
                                <Sparkles className="h-3 w-3 text-primary-foreground" />
                            </div>
                            <span className="text-sm font-semibold text-foreground">
                                ClientFlow
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} ClientFlow. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
