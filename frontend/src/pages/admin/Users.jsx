// Users.jsx

// =========================
// Imports
// =========================
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/api/userapi";
import { deleteUser } from "@/api/userapi";
import { searchUsers } from "@/api/userapi";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,

} from "@/components/ui/table";

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import EditUser from "./EditUsers";

// =========================
// Component
// =========================
export default function Users() {

    // =====================
    // State
    // =====================
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const navigate = useNavigate();
    const limit = 10;

    // =====================
    // Fetch Users
    // =====================
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const response = await getAllUsers();
    //             console.log(response);
    //             setUsers(response);
    //         } catch (error) {
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchUsers();
    // }, []);

    //useeffect with pagination
    // BUG FIX: response is { users, totalUsers, totalPages, currentPage, limit }
    // was doing setUsers(response) which set the whole object as the array — now destructured
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const response = await getAllUsers(currentPage, limit);
    //             setUsers(response);
    //         } catch (error) {
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchUsers();
    // }, [currentPage]);

    useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await getAllUsers(currentPage, limit);
            setUsers(response.users);
            setTotalPages(response.totalPages);
            setTotalItems(response.totalUsers);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchUsers();
}, [currentPage]);

    // BUG FIX: had [users, search] as dependency — since this sets users, it caused an infinite loop.
    // Also need to skip search when search is empty (let pagination handle it)
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const filteredUsers = await searchUsers(search);
    //         setUsers(filteredUsers);
    //     };
    //     fetchUsers();
    // }, [users, search]);

    useEffect(() => {
        if (!search.trim()) {
            // When search is cleared, re-fetch paginated data
            const refetch = async () => {
                try {
                    const response = await getAllUsers(currentPage, limit);
                    setUsers(response.users);
                    setTotalPages(response.totalPages);
                    setTotalItems(response.totalUsers);
                } catch (error) {
                    setError(error.message);
                }
            };
            refetch();
            return;
        }

        const fetchFiltered = async () => {
            const filteredUsers = await searchUsers(search);
            setUsers(filteredUsers);
        };

        fetchFiltered();
    }, [search, currentPage]);




    // =====================
    // Delete User
    // =====================
    const handleDelete = async (id) => {
        const deleteUsers = await deleteUser(id);
        if (deleteUsers) {
            setUsers(users.filter((user) => user.id !== id));
        }


    };

    // =====================
    // Edit User
    // =====================
    const handleEdit = (id) => {
        navigate(`/${id}/EditUsers`);

    };

    const handleNotes = (id) => {
        navigate(`/${id}/ClientNotes`);
    }

    // =====================
    // JSX
    // =====================
    return (
        <div className="container mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Users
            </h1>

            <div className="mb-4 w-full max-w-xl">
                <Input
                    type="text"
                    placeholder="Search users.."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-11"
                />
            </div>

            <Table>


                <TableHeader>







                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>

                </TableHeader>

                <TableBody>

                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.createdAt}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleEdit(user.id)}>Edit</Button>
                                <Button onClick={() => handleDelete(user.id)}>Delete</Button>
                                <Button onClick={() => handleNotes(user.id)}>Notes</Button>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>

            </Table>



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
                    {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={currentPage === i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
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
    );
}