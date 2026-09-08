import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

import {
    getAllConversations,
    getMessages
} from "../../api/conversationapi";

const AdminConversationUI = () => {

    // =========================
    // STATE
    // =========================

    const [conversations, setConversations] =
        useState([]);

    const [activeConversationId, setActiveConversationId] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [messagesLoading, setMessagesLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // =========================
    // LOAD ALL CONVERSATIONS
    // =========================

    useEffect(() => {

        const loadConversations = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getAllConversations();

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
                conversation.id ===
                activeConversationId
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
    // UI
    // =========================

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 h-[600px] border border-border rounded-xl overflow-hidden bg-card">

            {/* CONVERSATIONS */}

            <div className="lg:col-span-1 border-r border-border flex flex-col bg-muted/10">

                <div className="p-4 border-b border-border">

                    <h3 className="font-semibold text-foreground">
                        All Conversations
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

                            const studentName =
                                student?.name ||
                                "Unknown Student";

                            const studentId =
                                student?.studentId ||
                                "No student ID";

                            return (
                                <div
                                    key={conversation.id}
                                    onClick={() =>
                                        setActiveConversationId(
                                            conversation.id
                                        )
                                    }
                                    className={`p-4 cursor-pointer transition ${
                                        activeConversationId ===
                                        conversation.id
                                            ? "bg-accent"
                                            : "hover:bg-accent/40"
                                    }`}
                                >

                                    <div className="flex items-center gap-3">

                                        <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                                            {studentName
                                                .substring(0, 2)
                                                .toUpperCase()}
                                        </div>

                                        <div className="flex-1 min-w-0">

                                            <p className="font-medium text-sm text-foreground truncate">
                                                {studentName}
                                            </p>

                                            <p className="text-xs text-muted-foreground truncate mt-1">
                                                {studentId}
                                            </p>

                                            <p className="text-[10px] text-muted-foreground truncate mt-1">
                                                {conversation.supportUnit?.name ||
                                                    "Unknown Support Unit"}
                                            </p>

                                        </div>

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
                                Choose a conversation to view its messages.
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
                                    .toUpperCase() ||
                                    "??"}
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

                                <p className="text-[10px] text-muted-foreground">
                                    {activeConversation.supportUnit?.name ||
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

                                            const isStudent =
                                                message.senderType ===
                                                "student";

                                            return (

                                                <div
                                                    key={message.id}
                                                    className={`flex items-end gap-2 ${
                                                        isStudent
                                                            ? "justify-start"
                                                            : "justify-end"
                                                    }`}
                                                >

                                                    {/* STUDENT AVATAR */}

                                                    {isStudent && (

                                                        <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">

                                                            {activeConversation
                                                                .student
                                                                ?.name
                                                                ?.substring(
                                                                    0,
                                                                    2
                                                                )
                                                                .toUpperCase() ||
                                                                "??"}

                                                        </div>

                                                    )}


                                                    {/* MESSAGE */}

                                                    <div
                                                        className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                                                            isStudent
                                                                ? "bg-card border border-border text-foreground rounded-bl-none"
                                                                : "bg-primary text-primary-foreground rounded-br-none"
                                                        }`}
                                                    >

                                                        <p className="text-[10px] font-semibold mb-1 opacity-70">
                                                            {isStudent
                                                                ? activeConversation.student?.name ||
                                                                  "Student"
                                                                : "Staff"}
                                                        </p>

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

                    </>

                )}

            </div>

        </div>
    );
};

export default AdminConversationUI;