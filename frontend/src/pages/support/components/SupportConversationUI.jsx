import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    getStaffConversations,
    getMessages,
    createMessage
} from "@/api/conversationapi";

import socket from "@/socket/socket";

const SupportConversationUI = () => {

    // =========================
    // STATE
    // =========================

    const [conversations, setConversations] = useState([]);
    const [activeConversationId, setActiveConversationId] =
        useState(null);

    const [typedMsg, setTypedMsg] = useState("");

    const [loading, setLoading] = useState(false);
    const [messagesLoading, setMessagesLoading] =
        useState(false);

    const [error, setError] = useState("");



    useEffect(() => {

        socket.connect();

        return () => {
            socket.disconnect();
        };

    }, []);
    // =========================
    // LOAD STAFF CONVERSATIONS
    // =========================

    useEffect(() => {

        const loadConversations = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getStaffConversations();

                setConversations(data);

                if (data.length > 0) {
                    setActiveConversationId(data[0].id);
                }

            } catch (err) {

                setError(err.message);

            } finally {

                setLoading(false);

            }
        };

        loadConversations();

    }, []);


    // =========================
    // ACTIVE CONVERSATION
    // =========================

    const activeConversation =
        conversations.find(
            conversation =>
                conversation.id === activeConversationId
        );


    // =========================
    // LOAD MESSAGES
    // =========================

    useEffect(() => {

        if (!activeConversationId) {
            return;
        }

        const loadMessages = async () => {

            try {

                setMessagesLoading(true);
                setError("");

                const data =
                    await getMessages(
                        activeConversationId
                    );

                setConversations(prev =>
                    prev.map(conversation =>
                        conversation.id ===
                        activeConversationId
                            ? {
                                ...conversation,
                                messages: data
                            }
                            : conversation
                    )
                );

            } catch (err) {

                setError(err.message);

            } finally {

                setMessagesLoading(false);

            }
        };

        loadMessages();

    }, [activeConversationId]);


    // =========================
    // SEND MESSAGE
    // =========================

    const handleSendMessage = async (e) => {

        e.preventDefault();

        if (!typedMsg.trim()) {
            return;
        }

        if (!activeConversationId) {
            return;
        }

        try {

            setError("");

            const newMessage =
                await createMessage(
                    activeConversationId,
                    typedMsg
                );

            setConversations(prev =>
                prev.map(conversation =>
                    conversation.id ===
                    activeConversationId
                        ? {
                            ...conversation,
                            messages: [
                                ...(conversation.messages || []),
                                newMessage
                            ]
                        }
                        : conversation
                )
            );

            setTypedMsg("");

        } catch (err) {

            setError(err.message);

        }
    };


    // =========================
    // UI
    // =========================

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 h-[600px] border border-border rounded-xl overflow-hidden bg-card">

            {/* CONVERSATION LIST */}

            <div className="lg:col-span-1 border-r border-border flex flex-col bg-muted/10">

                <div className="p-4 border-b border-border">

                    <h3 className="font-semibold text-foreground">
                        Conversations
                    </h3>

                    <p className="text-xs text-muted-foreground mt-1">
                        {conversations.length} conversation
                        {conversations.length !== 1
                            ? "s"
                            : ""}
                    </p>

                </div>


                <div className="flex-1 overflow-y-auto divide-y divide-border">

                    {loading ? (

                        <div className="p-4 text-sm text-muted-foreground">
                            Loading conversations...
                        </div>

                    ) : conversations.length === 0 ? (

                        <div className="p-4 text-sm text-muted-foreground">
                            No conversations yet.
                        </div>

                    ) : (

                        conversations.map(conversation => {

                            const student =
                                conversation.student;

                            const name =
                                student?.name ||
                                "Unknown Student";

                            const initials =
                                name
                                    .substring(0, 2)
                                    .toUpperCase();

                            return (
                                <div
                                    key={conversation.id}
                                    onClick={() =>
                                        setActiveConversationId(
                                            conversation.id
                                        )
                                    }
                                    className={`p-4 cursor-pointer transition flex items-center gap-3 ${
                                        activeConversationId ===
                                        conversation.id
                                            ? "bg-accent"
                                            : "hover:bg-accent/40"
                                    }`}
                                >

                                    <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-sm">
                                        {initials}
                                    </div>

                                    <div className="flex-1 min-w-0">

                                        <div className="font-medium text-sm text-foreground truncate">
                                            {name}
                                        </div>

                                        <p className="text-xs text-muted-foreground truncate mt-1">
                                            {student?.studentId ||
                                                "No student ID"}
                                        </p>

                                    </div>

                                </div>
                            );
                        })

                    )}

                </div>

            </div>


            {/* MESSAGE AREA */}

            <div className="lg:col-span-3 flex flex-col h-full bg-card">

                {!activeConversation ? (

                    <div className="flex-1 flex items-center justify-center">

                        <div className="text-center">

                            <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />

                            <h3 className="text-lg font-medium text-foreground">
                                Select a conversation
                            </h3>

                            <p className="text-sm text-muted-foreground mt-1">
                                Choose a student to start messaging.
                            </p>

                        </div>

                    </div>

                ) : (

                    <>

                        {/* HEADER */}

                        <div className="p-4 border-b border-border flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-sm">
                                {activeConversation.student?.name
                                    ?.substring(0, 2)
                                    .toUpperCase() || "??"}
                            </div>

                            <div>

                                <h4 className="font-semibold text-sm text-foreground">
                                    {activeConversation.student?.name ||
                                        "Unknown Student"}
                                </h4>

                                <p className="text-xs text-muted-foreground">
                                    {activeConversation.student?.studentId ||
                                        ""}
                                </p>

                            </div>

                        </div>


                        {/* ERROR */}

                        {error && (
                            <div className="border-b border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}


                        {/* MESSAGES */}

                        <div className="flex-1 p-4 overflow-y-auto bg-muted/5">

                            {messagesLoading ? (

                                <div className="flex h-full items-center justify-center">

                                    <p className="text-sm text-muted-foreground">
                                        Loading messages...
                                    </p>

                                </div>

                            ) : !activeConversation.messages ||
                              activeConversation.messages.length === 0 ? (

                                <div className="flex h-full items-center justify-center">

                                    <p className="text-sm text-muted-foreground">
                                        No messages yet.
                                    </p>

                                </div>

                            ) : (

                                <div className="space-y-4">

                                    {activeConversation.messages.map(
                                        message => {

                                            const isStaff =
                                                message.senderType ===
                                                "staff";

                                            return (

                                                <div
                                                    key={message.id}
                                                    className={`flex items-end gap-2 ${
                                                        isStaff
                                                            ? "justify-end"
                                                            : "justify-start"
                                                    }`}
                                                >

                                                    {!isStaff && (
                                                        <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">
                                                            {activeConversation
                                                                .student?.name
                                                                ?.substring(
                                                                    0,
                                                                    2
                                                                )
                                                                .toUpperCase() ||
                                                                "??"}
                                                        </div>
                                                    )}

                                                    <div
                                                        className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                                                            isStaff
                                                                ? "bg-primary text-primary-foreground rounded-br-none"
                                                                : "bg-card border border-border text-foreground rounded-bl-none"
                                                        }`}
                                                    >

                                                        {!isStaff && (
                                                            <p className="text-[10px] font-semibold mb-1 opacity-70">
                                                                {activeConversation
                                                                    .student
                                                                    ?.name ||
                                                                    "Student"}
                                                            </p>
                                                        )}

                                                        <p className="leading-relaxed">
                                                            {message.content}
                                                        </p>

                                                        <span className="block text-[9px] text-right mt-1 opacity-70">
                                                            {new Date(
                                                                message.createdAt
                                                            ).toLocaleTimeString(
                                                                [],
                                                                {
                                                                    hour: "numeric",
                                                                    minute: "2-digit"
                                                                }
                                                            )}
                                                        </span>

                                                    </div>

                                                </div>

                                            );
                                        }
                                    )}

                                </div>

                            )}

                        </div>


                        {/* SEND FORM */}

                        <form
                            onSubmit={handleSendMessage}
                            className="p-4 border-t border-border bg-card flex items-center gap-2"
                        >

                            <Input
                                placeholder="Type a message..."
                                value={typedMsg}
                                onChange={e =>
                                    setTypedMsg(
                                        e.target.value
                                    )
                                }
                                className="flex-1"
                            />

                            <Button
                                type="submit"
                                disabled={!typedMsg.trim()}
                            >
                                Send
                            </Button>

                        </form>

                    </>

                )}

            </div>

        </div>
    );
};

export default SupportConversationUI;