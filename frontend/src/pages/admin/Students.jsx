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
  GraduationCap,
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

import { getAllStudents } from "@/api/studentapi";

export default function Students() {
  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");


  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [limit] = useState(10);

  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("asc");

  // useEffect(() => {
  //   const fetchStudents = async () => {
  //     try {
  //       setLoading(true);
  //       setError("");

  //       const data = await getAllStudents(currentPage, limit);

  //       setStudents(data.students);
  //       setTotalPages(data.totalPages);

  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchStudents();
  // }, [currentPage]);

  // const filteredStudents = students.filter((student) =>
  //   `${student.name} ${student.studentId} ${student.department}`
  //     .toLowerCase()
  //     .includes(search.toLowerCase())
  // );

  useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearch(search);
    }, 400);

    return () => {
        clearTimeout(timer);
    };
    
  }, [search]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllStudents(
        currentPage,
        limit,
        search,
        sortBy,
        order
      );

      setStudents(data.students);
      setTotalPages(data.totalPages);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [currentPage, limit, debouncedSearch, sortBy, order]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Students
          </h1>

          <p className="text-muted-foreground mt-1">
            Manage student accounts and academic information.
          </p>
        </div>

        {/* <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Student
        </Button> */}

      </div>


      {/* Search & Sorting */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

      {/* Search */}
      <div className="flex-1 space-y-2">
        <label className="text-sm font-medium">
          Search students
        </label>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search by name, student ID, department..."
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
          <option value="studentId">Student ID</option>
          <option value="department">Department</option>
          <option value="programme">Programme</option>
          <option value="level">Level</option>
        </select>
      </div>

      {/* Sort Order */}
      <div className="space-y-2">
        <label className="text-sm font-medium block">
          Order
        </label>

        <Button
          variant="outline"
          className="w-full sm:w-24"
          onClick={() => {
            setOrder(order === "asc" ? "desc" : "asc");
            setCurrentPage(1);
          }}
        >
          {order === "asc" ? (
            <>
              ↑ Asc
            </>
          ) : (
            <>
              ↓ Desc
            </>
          )}
        </Button>
      </div>
        </div>
        </CardContent>
      </Card>


      {/* Students */}
      <Card>

        <CardHeader>
          <CardTitle className="flex items-center gap-2">

            <GraduationCap className="h-5 w-5" />

            Student Directory

          </CardTitle>
        </CardHeader>


        <CardContent>

          {loading ? (
            <div className="py-10 text-center text-muted-foreground">
                Loading students...
            </div>
            ) : error ? (
            <div className="py-10 text-center text-destructive">
                {error}
            </div>
            ) : (
            <div className="space-y-2">

                {students.map((student) => (
                <div
                    key={student.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/40 transition"
                >
                    <div className="flex items-center gap-4">

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                        {student.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>

                    {/* Student info */}
                    <div>
                        <p className="font-semibold text-sm">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.studentId}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                        {student.department} · {student.programme}
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-flex px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        Level {student.level}
                    </span>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    </div>

                </div>
                ))}

            </div>
            )}


          {/* Pagination */}
          {!loading && !error && totalPages > 0 && (
            <div className="mt-6 flex justify-center">

              <Pagination>

                <PaginationContent>

                  <PaginationItem>

                    <PaginationPrevious
                      onClick={() => {
                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                        }
                      }}
                    />

                  </PaginationItem>


                  {Array.from(
                    { length: totalPages },
                    (_, i) => (

                      <PaginationItem key={i}>

                        <PaginationLink
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>

                      </PaginationItem>

                    )
                  )}


                  <PaginationItem>

                    <PaginationNext
                      onClick={() => {
                        if (currentPage < totalPages) {
                          setCurrentPage(currentPage + 1);
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