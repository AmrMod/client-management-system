
import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Search,
    ChevronLeft,
    ChevronRight,
    Users,
} from "lucide-react";

import { getManagerStudentSummary } from "@/api/requestapi";


const ManagerStudents = () => {

    // ==========================================
    // STATE
    // ==========================================

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ==========================================
    // PAGINATION
    // ==========================================

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalStudents, setTotalStudents] = useState(0);

    const limit = 10;

    // ==========================================
    // SEARCH
    // ==========================================

    const [search, setSearch] = useState("");


    // ==========================================
    // LOAD STUDENTS
    // ==========================================

    useEffect(() => {

        const loadStudents = async () => {

            try {

                setLoading(true);
                setError(null);

                const data = await getManagerStudentSummary({
                    page,
                    limit,
                    search,
                });

                setStudents(data.students);
                setTotalPages(data.totalPages);
                setTotalStudents(data.totalStudents);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }
        };

        loadStudents();

    }, [
        page,
        search,
    ]);


    // ==========================================
    // RESET PAGE ON SEARCH CHANGE
    // ==========================================

    useEffect(() => {
        setPage(1);
    }, [search]);


    // ==========================================
    // RENDER
    // ==========================================

    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Students
                </h1>

                <p className="text-muted-foreground mt-1">
                    View students and their support activity.
                </p>
            </div>


            {/* =============================== */}
            {/* SEARCH */}
            {/* =============================== */}

            <Card>
                <CardContent className="pt-6">

                    <div className="relative">

                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                        <Input
                            placeholder="Search by name or student ID..."
                            className="pl-9"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                </CardContent>
            </Card>


            {/* =============================== */}
            {/* ERROR */}
            {/* =============================== */}

            {error && (
                <div className="text-sm text-destructive text-center py-4">
                    {error}
                </div>
            )}


            {/* =============================== */}
            {/* TABLE */}
            {/* =============================== */}

            <Card>
                <CardContent className="p-0">

                    <Table>

                        <TableHeader>
                            <TableRow>

                                <TableHead>
                                    Student ID
                                </TableHead>

                                <TableHead>
                                    Name
                                </TableHead>

                                <TableHead>
                                    Total Requests
                                </TableHead>

                                <TableHead>
                                    Active Requests
                                </TableHead>

                            </TableRow>
                        </TableHeader>


                        <TableBody>

                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        Loading students...
                                    </TableCell>
                                </TableRow>

                            ) : students.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        <div className="flex flex-col items-center gap-2">

                                            <Users className="h-8 w-8" />

                                            <p>
                                                No students found.
                                            </p>

                                        </div>
                                    </TableCell>
                                </TableRow>

                            ) : (
                                students.map((student) => (
                                    <TableRow key={student.studentId}>

                                        <TableCell className="font-semibold">
                                            {student.studentId}
                                        </TableCell>

                                        <TableCell>
                                            {student.name}
                                        </TableCell>

                                        <TableCell>
                                            {student.requests}
                                        </TableCell>

                                        <TableCell>
                                            <span
                                                className={
                                                    student.activeRequests > 0
                                                        ? "text-primary font-semibold"
                                                        : "text-muted-foreground"
                                                }
                                            >
                                                {student.activeRequests}
                                            </span>
                                        </TableCell>

                                    </TableRow>
                                ))
                            )}

                        </TableBody>

                    </Table>


                    {/* =============================== */}
                    {/* PAGINATION */}
                    {/* =============================== */}

                    <div className="flex items-center justify-between px-4 py-3 border-t">

                        <p className="text-sm text-muted-foreground">
                            {totalStudents} student{totalStudents !== 1 ? "s" : ""} total
                            {" · "}
                            Page {page} of {totalPages || 1}
                        </p>

                        <div className="flex items-center gap-2">

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page <= 1 || loading}
                                onClick={() =>
                                    setPage((current) => current - 1)
                                }
                            >

                                <ChevronLeft className="h-4 w-4 mr-1" />

                                Previous

                            </Button>


                            <Button
                                variant="outline"
                                size="sm"
                                disabled={
                                    page >= totalPages ||
                                    loading
                                }
                                onClick={() =>
                                    setPage((current) => current + 1)
                                }
                            >

                                Next

                                <ChevronRight className="h-4 w-4 ml-1" />

                            </Button>

                        </div>

                    </div>

                </CardContent>
            </Card>

        </div>
    );
};


export default ManagerStudents;
