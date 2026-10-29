import { useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";


import { MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    getStaffConversations,
    getMessages,
    createMessage,
    startStaffConversation,
} from "@/api/conversationapi";

import { getAllStudents } from "@/api/studentapi";

import socket from "@/socket/socket";

const SupportConversationUI = () => {
    const queryClient = useQueryClient();


    // =========================
    // STATE
    // =========================

    const [activeConversationId, setActiveConversationId] =
        useState(null);

    const [typedMsg, setTypedMsg] = useState("");

    
    const [showNewConversation, setShowNewConversation] = useState(false);
    const [studentSearch, setStudentSearch] = useState("");
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [openingMessage, setOpeningMessage] = useState("");


    

       // =========================
    // STAFF CONVERSATIONS QUERY
    // =========================

    const {
        data: conversations = [],
        isLoading: conversationsLoading,
        error: conversationsError
    } = useQuery({
        queryKey: ["staff-conversations"],
        queryFn: getStaffConversations
    });

    

    const {
        data: studentsData,
        isLoading: studentsLoading,
        error: studentsError
    } = useQuery({
        queryKey: ["students", "conversation", studentSearch],
        queryFn: () =>
            getAllStudents(
                1,
                100,
                studentSearch,
                "name",
                "asc"
            ),
        enabled: showNewConversation
    });

    const students = studentsData?.students ?? [];

    
    const {
        mutate: startConversation,
        isPending: startingConversation,
        error: startConversationError
    } = useMutation({
        mutationFn: () =>
            startStaffConversation(
                Number(selectedStudentId),
                openingMessage.trim()
            ),

        onSuccess: async (data) => {
            const conversationId = data.conversation.id;

            await queryClient.invalidateQueries({
                queryKey: ["staff-conversations"]
            });

            setActiveConversationId(conversationId);
            setShowNewConversation(false);
            setStudentSearch("");
            setSelectedStudentId("");
            setOpeningMessage("");

            await queryClient.invalidateQueries({
                queryKey: ["messages", conversationId]
            });
        }
    });



    // =========================
    // SELECT FIRST CONVERSATION
    // =========================

    useEffect(() => {
        if (
            conversations.length > 0 &&
            !activeConversationId
        ) {
            setActiveConversationId(conversations[0].id);
        }
    }, [conversations, activeConversationId]);



    const {
        data: messages = [],
        isLoading: messagesLoading,
        error: messagesError
    } = useQuery({
        queryKey: ["messages", activeConversationId],
        queryFn: () => getMessages(activeConversationId),
        enabled: !!activeConversationId
    });



    

    useEffect(() => {

        if (!activeConversationId) {
            return;
        }

        // console.log("Joining conversation:", activeConversationId);


        socket.emit(
            "join_conversation",
            activeConversationId
        );

    }, [activeConversationId]);

    useEffect(() => {

    const handleNewMessage = (message) => {

        // setConversations(prev =>
        //     prev.map(conversation =>
        //         conversation.id === message.conversationId
        //             ? {
        //                 ...conversation,
        //                 messages: [
        //                     ...(conversation.messages || []),
        //                     message
        //                 ]
        //             }
        //             : conversation
        //     )
        // );

        // queryClient.setQueryData(
        //     ["messages", message.conversationId],
        //     (oldMessages = []) => [
        //         ...oldMessages,
        //         message
        //     ]
        // );

        
        queryClient.setQueryData(
            ["messages", message.conversationId],
            (oldMessages = []) => {
                if (
                    oldMessages.some(
                        (existing) => existing.id === message.id
                    )
                ) {
                    return oldMessages;
                }

                return [...oldMessages, message];
            }
        );


    };

    socket.on("new_message", handleNewMessage);

    return () => {
        socket.off("new_message", handleNewMessage);
    };

    }, [queryClient]);

    


    // =========================
    // ACTIVE CONVERSATION
    // =========================

    const activeConversation =
        conversations.find(
            conversation =>
                conversation.id === activeConversationId
        );


   


    // =========================
    // SEND MESSAGE
    // =========================

    const {
        mutate: sendMessage,
        isPending: sendingMessage,
        error: sendMessageError
    } = useMutation({
        mutationFn: ({ conversationId, content }) =>
            createMessage(conversationId, content)
    });

    const handleSendMessage = async (e) => {

        e.preventDefault();

        if (!typedMsg.trim()) {
            return;
        }

        if (!activeConversationId) {
            return;
        }

        // try {

        //     setError("");

            // const newMessage =

                // await createMessage(
                //     activeConversationId,
                //     typedMsg
                // );

            sendMessage({
                conversationId: activeConversationId,
                content: typedMsg
            });

            // setTypedMsg("");    

            // setConversations(prev =>
            //     prev.map(conversation =>
            //         conversation.id ===
            //         activeConversationId
            //             ? {
            //                 ...conversation,
            //                 messages: [
            //                     ...(conversation.messages || []),
            //                     newMessage
            //                 ]
            //             }
            //             : conversation
            //     )
            // );

            setTypedMsg("");

        // } catch (err) {

        //     setError(err.message);

        // }
    };


    // =========================
    // UI
    // =========================

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 h-[600px] border border-border rounded-xl overflow-hidden bg-card">

            {/* CONVERSATION LIST */}

            <div className="lg:col-span-1 border-r border-border flex flex-col bg-muted/10">

                {/* <div className="p-4 border-b border-border">

                    <h3 className="font-semibold text-foreground">
                        Conversations
                    </h3>

                    <p className="text-xs text-muted-foreground mt-1">
                        {conversations.length} conversation
                        {conversations.length !== 1
                            ? "s"
                            : ""}
                    </p>

                </div> */}

                
                <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-foreground">
                            Conversations
                        </h3>

                        <Button
                            type="button"
                            size="sm"
                            onClick={() =>
                                setShowNewConversation((previous) => !previous)
                            }
                        >
                            {showNewConversation ? "Cancel" : "+ New"}
                        </Button>
                    </div>

                    <p className="text-xs text-muted-foreground mt-1">
                        {conversations.length} conversation
                        {conversations.length !== 1 ? "s" : ""}
                    </p>

                    {showNewConversation && (
                        <form
                            className="mt-4 space-y-3"
                            onSubmit={(e) => {
                                e.preventDefault();

                                if (
                                    selectedStudentId &&
                                    openingMessage.trim()
                                ) {
                                    startConversation();
                                }
                            }}
                        >
                            <Input
                                placeholder="Search by name or student ID"
                                value={studentSearch}
                                onChange={(e) => {
                                    setStudentSearch(e.target.value);
                                    setSelectedStudentId("");
                                }}
                            />

                            <div>
                                <label className="text-xs text-muted-foreground">
                                    Select student
                                </label>

                                <select
                                    value={selectedStudentId}
                                    onChange={(e) =>
                                        setSelectedStudentId(e.target.value)
                                    }
                                    disabled={studentsLoading || !!studentsError}
                                    className="mt-1 w-full rounded-md border border-input bg-background p-2 text-sm"
                                >
                                    <option value="">
                                        {studentsLoading
                                            ? "Loading students..."
                                            : "Choose a student"}
                                    </option>

                                    {students.map((student) => (
                                        <option
                                            key={student.id}
                                            value={student.id}
                                        >
                                            {student.name} ({student.studentId})
                                        </option>
                                    ))}
                                </select>

                                {studentsError && (
                                    <p className="mt-1 text-xs text-destructive">
                                        {studentsError.message ||
                                            "Failed to load students."}
                                    </p>
                                )}
                            </div>

                            <textarea
                                placeholder="Write your opening message..."
                                value={openingMessage}
                                onChange={(e) =>
                                    setOpeningMessage(e.target.value)
                                }
                                rows={3}
                                maxLength={5000}
                                className="w-full resize-none rounded-md border border-input bg-background p-2 text-sm"
                            />

                            {startConversationError && (
                                <p className="text-xs text-destructive">
                                    {startConversationError.message ||
                                        "Failed to start conversation."}
                                </p>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={
                                    !selectedStudentId ||
                                    !openingMessage.trim() ||
                                    startingConversation
                                }
                            >
                                {startingConversation
                                    ? "Starting..."
                                    : "Start Conversation"}
                            </Button>
                        </form>
                    )}
                </div>



                <div className="flex-1 overflow-y-auto divide-y divide-border">

                    {conversationsLoading ? (

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

            <div className="lg:col-span-3 flex flex-col h-full min-h-0 bg-card">

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

                        {sendMessageError  && (
                            <div className="border-b border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                {sendMessageError.message}
                            </div>
                        )}


                        {/* MESSAGES */}

                        <div className="flex-1 min-h-0 p-4 overflow-y-auto bg-muted/5">

                            {messagesLoading ? (

                                <div className="flex h-full items-center justify-center">

                                    <p className="text-sm text-muted-foreground">
                                        Loading messages...
                                    </p>

                                </div>

                            ) : messages.length === 0 ? (

                                <div className="flex h-full items-center justify-center">

                                    <p className="text-sm text-muted-foreground">
                                        No messages yet.
                                    </p>

                                </div>

                            ) : (

                                <div className="space-y-4">

                                    {messages.map(
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
                                disabled={!typedMsg.trim() || sendingMessage}
                            >
                                {sendingMessage ? "Sending..." : "Send"}
                            </Button>

                        </form>

                    </>

                )}

            </div>

        </div>
    );
};

export default SupportConversationUI;