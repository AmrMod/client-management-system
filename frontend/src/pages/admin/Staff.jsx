import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Users,
    Search,
    Plus,
    MoreHorizontal,
} from "lucide-react";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
} from "@/components/ui/pagination";

import { getAllStaff } from "@/api/staffapi";

export default function Staff() {
    const [staff, setStaff] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");


    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const [sortBy, setSortBy] = useState("id");
    const [order, setOrder] = useState("asc");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // useEffect(() => {
    //     const fetchStaff = async () => {
    //         try {
    //             setLoading(true);
    //             setError("");

    //             const data = await getAllStaff(currentPage, limit);

    //             setStaff(data.staffs);
    //             setTotalPages(data.totalPages);
    //         } catch (error) {
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchStaff();
    // }, [currentPage, limit]);

    useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearch(search);
    }, 400);

    return () => {
        clearTimeout(timer);
    };
    
    }, [search]);

    const fetchStaff = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAllStaff(
                currentPage,
                limit,
                search,
                sortBy,
                order
            );

            setStaff(data.staffs);
            setTotalPages(data.totalPages);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, [currentPage, limit, debouncedSearch, sortBy, order]);

    // const filteredStaff = staff.filter((member) =>
    //     `${member.name} ${member.user?.email || ""} ${member.staffRole} ${member.supportUnit?.name || ""}`
    //         .toLowerCase()
    //         .includes(search.toLowerCase())
    // );

    return (
        <div className="space-y-6 animate-in fade-in duration-300">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Staff
                    </h1>

                    <p className="text-muted-foreground mt-1">
                        Manage staff accounts and support personnel.
                    </p>
                </div>

                
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

                        {/* Search */}
                        <div className="flex-1 space-y-2">
                            <label className="text-sm font-medium">
                                Search staff
                            </label>

                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                                <Input
                                    placeholder="Search by name or role..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        {/* Sort By */}
                        <div className="w-full sm:w-48 space-y-2">
                            <label className="text-sm font-medium">
                                Sort by
                            </label>

                            <select
                                value={sortBy}
                                onChange={(e) => {
                                    setSortBy(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                                <option value="id">ID</option>
                                <option value="name">Name</option>
                                <option value="staffRole">Role</option>
                            </select>
                        </div>

                        {/* Order */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium block">
                                Order
                            </label>

                            <Button
                                variant="outline"
                                className="w-full sm:w-24"
                                onClick={() => {
                                    setOrder(
                                        order === "asc"
                                            ? "desc"
                                            : "asc"
                                    );

                                    setCurrentPage(1);
                                }}
                            >
                                {order === "asc"
                                    ? "↑ Asc"
                                    : "↓ Desc"}
                            </Button>
                        </div>

                    </div>
                </CardContent>
            </Card>

            {/* Staff Directory */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Staff Directory
                    </CardTitle>
                </CardHeader>

                <CardContent>

                    {/* Loading */}
                    {loading ? (
                        <div className="py-10 text-center text-muted-foreground">
                            Loading staff...
                        </div>
                    ) : error ? (
                        <div className="py-10 text-center text-destructive">
                            {error}
                        </div>
                    ) : staff.length === 0 ? (
                        <div className="py-10 text-center text-muted-foreground">
                            No staff found.
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {staff.map((member) => (
                                <div
                                    key={member.id}
                                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/40 transition"
                                >
                                    <div className="flex items-center gap-4">

                                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                            {member.name
                                                ?.split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                                .toUpperCase()}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-sm">
                                                {member.name}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {member.user?.email}
                                            </p>

                                            <p className="text-xs text-muted-foreground mt-1">
                                                {member.staffRole}
                                                {" · "}
                                                {member.supportUnit?.name}
                                            </p>
                                        </div>

                                    </div>

                                    <div>
                                        <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                            {member.staffRole === "MANAGER"
                                                ? "Manager"
                                                : "Support Staff"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Pagination */}
                    {!loading &&
                        !error &&
                        totalPages > 1 && (
                            <div className="mt-6">
                                <Pagination>
                                    <PaginationContent>

                                        {/* Previous */}
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => {
                                                    if (currentPage > 1) {
                                                        setCurrentPage(
                                                            currentPage - 1
                                                        );
                                                    }
                                                }}
                                            />
                                        </PaginationItem>

                                        {/* Page numbers */}
                                        {Array.from(
                                            { length: totalPages },
                                            (_, i) => (
                                                <PaginationItem key={i}>
                                                    <PaginationLink
                                                        isActive={
                                                            currentPage ===
                                                            i + 1
                                                        }
                                                        onClick={() =>
                                                            setCurrentPage(
                                                                i + 1
                                                            )
                                                        }
                                                    >
                                                        {i + 1}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            )
                                        )}

                                        {/* Next */}
                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => {
                                                    if (
                                                        currentPage <
                                                        totalPages
                                                    ) {
                                                        setCurrentPage(
                                                            currentPage + 1
                                                        );
                                                    }
                                                }}
                                            />
                                        </PaginationItem>

                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}

                </CardContent>
            </Card>
        </div>
    );
}