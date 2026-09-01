import { useState } from "react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { createRequest } from "@/api/requestapi";


const NewRequest = ({
    user,
    supportUnits,
    supportUnitLoading,
    setRequests,
    addSystemNotification
}) => {

    const [newReqTitle, setNewReqTitle] = useState("");
    const [newReqSupportUnit, setNewReqSupportUnit] = useState("");
    const [newReqPriority, setNewReqPriority] = useState("MEDIUM");
    const [newReqDesc, setNewReqDesc] = useState("");

    const [requestLoading, setRequestLoading] = useState(false);
    const [requestMessage, setRequestMessage] = useState("");
    const [requestError, setRequestError] = useState("");

    const handleNewRequestSubmit = async (e) => {
        e.preventDefault();

        setRequestMessage("");
        setRequestError("");

        if (!user) {
            setRequestError("User session not found. Please log in again.");
            return;
        }

        try {
            setRequestLoading(true);

            const newReq = await createRequest(
                Number(newReqSupportUnit),
                newReqTitle,
                newReqDesc,
                newReqPriority
            );

            setRequests(prev => [newReq, ...prev]);

            setNewReqTitle("");
            setNewReqDesc("");

            if (supportUnits.length > 0) {
                setNewReqSupportUnit(String(supportUnits[0].id));
            } else {
                setNewReqSupportUnit("");
            }

            setNewReqPriority("MEDIUM");

            setRequestMessage(
                "Request submitted successfully. Our support team will review it shortly."
            );

            addSystemNotification(
                "Request Created",
                `New request "${newReq.title}" has been submitted.`
            );

        } catch (error) {
            console.error("Failed to create request:", error);

            setRequestError(
                error.message || "Failed to submit request. Please try again."
            );

        } finally {
            setRequestLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-300">

            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    New Request
                </h1>

                <p className="text-muted-foreground mt-1">
                    Submit a new request to our support and project teams.
                </p>
            </div>

            <Card className="max-w-2xl">

                {requestMessage && (
                    <div className="mx-6 mt-6 p-4 rounded-lg bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        {requestMessage}
                    </div>
                )}

                {requestError && (
                    <div className="mx-6 mt-6 p-4 rounded-lg bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                        {requestError}
                    </div>
                )}

                <CardContent className="pt-6">

                    <form
                        onSubmit={handleNewRequestSubmit}
                        className="space-y-6"
                    >

                        <div className="space-y-2">
                            <Label htmlFor="title">
                                Request Subject
                            </Label>

                            <Input
                                id="title"
                                placeholder="e.g. Issues with payment portal"
                                value={newReqTitle}
                                onChange={(e) =>
                                    setNewReqTitle(e.target.value)
                                }
                            />
                        </div>

                        <div className="space-y-2">

                            <Label htmlFor="supportUnit">
                                Support Unit
                            </Label>

                            <select
                                id="supportUnit"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-card dark:text-foreground"
                                value={newReqSupportUnit}
                                onChange={(e) =>
                                    setNewReqSupportUnit(e.target.value)
                                }
                                disabled={supportUnitLoading}
                                required
                            >

                                <option value="">
                                    {supportUnitLoading
                                        ? "Loading support units..."
                                        : "Select support unit"}
                                </option>

                                {supportUnits.map((unit) => (
                                    <option
                                        key={unit.id}
                                        value={unit.id}
                                    >
                                        {unit.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                        <div className="space-y-2 flex flex-col justify-end">

                            <Label className="mb-2">
                                Priority Level
                            </Label>

                            <div className="grid grid-cols-4 gap-1.5">

                                {["LOW", "MEDIUM", "HIGH"].map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() =>
                                            setNewReqPriority(p)
                                        }
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

                        <div className="space-y-2">

                            <Label htmlFor="desc">
                                Description
                            </Label>

                            <textarea
                                id="desc"
                                rows={5}
                                placeholder="Describe your issue or request..."
                                className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus:border-ring dark:text-foreground"
                                value={newReqDesc}
                                onChange={(e) =>
                                    setNewReqDesc(e.target.value)
                                }
                            />

                        </div>

                        <Button
                            type="submit"
                            className="w-full sm:w-auto"
                            disabled={requestLoading}
                        >
                            {requestLoading
                                ? "Submitting..."
                                : "Submit Request"}
                        </Button>

                    </form>

                </CardContent>

            </Card>

        </div>
    );
};

export default NewRequest;