import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { getManagerStaffSummary } from "@/api/requestapi";


const ManagerStaffSummary = () => {

    // ==========================================
    // PAGINATION + SEARCH
    // ==========================================

    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState("");


    // ==========================================
    // FETCH STAFF SUMMARY
    // ==========================================

    const {
        data,
        isLoading,
        isError
    } = useQuery({
        queryKey: [
            "manager-staff-summary",
            page,
            limit,
            search
        ],

        queryFn: () =>
            getManagerStaffSummary({
                page,
                limit,
                search
            })
    });


    const staff = data?.staff || [];

    const totalPages = data?.totalPages || 1;


    // ==========================================
    // LOADING
    // ==========================================

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>
                        Staff Overview
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="p-6 text-center text-muted-foreground">
                        Loading staff...
                    </div>
                </CardContent>
            </Card>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (isError) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>
                        Staff Overview
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="p-6 text-center text-destructive">
                        Failed to load staff.
                    </div>
                </CardContent>
            </Card>
        );
    }


    // ==========================================
    // UI
    // ==========================================

    return (
        <Card>

            {/* HEADER */}

            <CardHeader>

                <CardTitle>
                    Staff Overview
                </CardTitle>

            </CardHeader>


            <CardContent>


                {/* SEARCH */}

                <div className="mb-6">

                    <Input
                        placeholder="Search staff..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />

                </div>


                {/* TABLE */}

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-border">

                                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                                    Staff
                                </th>

                                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                                    Support Unit
                                </th>

                                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                                    Requests
                                </th>

                                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                                    Resolved
                                </th>

                                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                                    Status
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {staff.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="p-8 text-center text-muted-foreground"
                                    >
                                        No staff found.
                                    </td>

                                </tr>

                            ) : (

                                staff.map((member) => (

                                    <tr
                                        key={member.id}
                                        className="border-b border-border last:border-0"
                                    >

                                        {/* STAFF */}

                                        <td className="p-4 text-sm font-medium">
                                            {member.name}
                                        </td>


                                        {/* SUPPORT UNIT */}

                                        <td className="p-4 text-sm text-muted-foreground">
                                            {member.supportUnit}
                                        </td>


                                        {/* REQUESTS */}

                                        <td className="p-4 text-sm">
                                            {member.requests}
                                        </td>


                                        {/* RESOLVED */}

                                        <td className="p-4 text-sm">
                                            {member.resolved}
                                        </td>


                                        {/* STATUS */}

                                        <td className="p-4">

                                            <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-green-500/10 text-green-600">
                                                Available
                                            </span>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>


                {/* PAGINATION */}

                <div className="flex items-center justify-between mt-6">

                    <p className="text-sm text-muted-foreground">
                        Page {data?.currentPage || 1} of {totalPages}
                    </p>


                    <div className="flex gap-2">

                        <Button
                            variant="outline"
                            disabled={page === 1}
                            onClick={() => {
                                setPage((current) => current - 1);
                            }}
                        >
                            Previous
                        </Button>


                        <Button
                            variant="outline"
                            disabled={page >= totalPages}
                            onClick={() => {
                                setPage((current) => current + 1);
                            }}
                        >
                            Next
                        </Button>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
};


export default ManagerStaffSummary;