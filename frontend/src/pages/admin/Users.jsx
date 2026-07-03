// Users.jsx

// =========================
// Imports
// =========================
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/api/userapi";    
import { deleteUser } from "@/api/userapi";
import { useNavigate, Link } from "react-router-dom";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import EditUser from "./EditUsers";

// =========================
// Component
// =========================
export default function Users() {

    // =====================
    // State
    // =====================
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // =====================
    // Fetch Users
    // =====================
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                setUsers(response);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

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

    // =====================
    // JSX
    // =====================
    return (
        <div className="container mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Users
            </h1>

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
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>

            </Table>

        </div>
    );
}