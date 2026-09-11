import { useEffect, useState } from "react";

import {
    getMyConversations,
    getMessages,
    createMessage,
    createConversation
} from "@/api/conversationapi";

import socket from "@/socket/socket";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    MessageSquare,
    PlusCircle,
    X
} from "lucide-react";


const ConversationUI = ({ supportUnits }) => {

    const [conversations, setConversations] = useState([]);
    const [activeConversationId, setActiveConversationId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [typedMsg, setTypedMsg] = useState("");

    const [loading, setLoading] = useState(false);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [error, setError] = useState("");

    const [showNewConversation, setShowNewConversation] = useState(false);
    const [newConvSupportUnit, setNewConvSupportUnit] = useState("");
    const [newConvLoading, setNewConvLoading] = useState(false);
    const [newConvError, setNewConvError] = useState("");

    const activeConversation = conversations.find(
        (conversation) => conversation.id === activeConversationId
    );

    // Load conversations on mount
    useEffect(() => {
        const loadConversations = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getMyConversations();

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
// SOCKET CONNECTION
// =========================

useEffect(() => {

    socket.connect();

    return () => {
        socket.disconnect();
    };

}, []);


// =========================
// JOIN ACTIVE CONVERSATION
// =========================

useEffect(() => {

    if (!activeConversationId) {
        return;
    }

    console.log(
        "Joining conversation:",
        activeConversationId
    );

    socket.emit(
        "join_conversation",
        activeConversationId
    );

}, [activeConversationId]);


// =========================
// RECEIVE NEW MESSAGES
// =========================

useEffect(() => {

    const handleNewMessage = (message) => {

        if (
            message.conversationId !==
            activeConversationId
        ) {
            return;
        }

        setMessages(prev => [
            ...prev,
            message
        ]);

    };

    socket.on(
        "new_message",
        handleNewMessage
    );

    return () => {

        socket.off(
            "new_message",
            handleNewMessage
        );

    };

}, [activeConversationId]);

    // Load messages when active conversation changes
    useEffect(() => {
        if (!activeConversationId) {
            return;
        }

        const loadMessages = async () => {
            try {
                setMessagesLoading(true);
                setError("");

                const data = await getMessages(
                    activeConversationId
                );

                setMessages(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setMessagesLoading(false);
            }
        };

        loadMessages();

    }, [activeConversationId]);

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

            // const newMessage = 
            await createMessage(
                activeConversationId,
                typedMsg
            );

            // setMessages(prev => [
            //     ...prev,
            //     newMessage
            // ]);

            setTypedMsg("");

        } catch (err) {
            setError(err.message);
        }
    };

    const handleStartConversation = async () => {
        if (!newConvSupportUnit) return;

        try {
            setNewConvLoading(true);
            setNewConvError("");

            const conversation = await createConversation(
                Number(newConvSupportUnit)
            );

            // Check if conversation already exists in state
            const exists = conversations.find(
                (c) => c.id === conversation.id
            );

            if (!exists) {
                setConversations((prev) => [conversation, ...prev]);
            }

            setActiveConversationId(conversation.id);

            // New conversation has no messages yet
            setMessages([]);
            setShowNewConversation(false);
            setNewConvSupportUnit("");

        } catch (err) {
            setNewConvError(err.message);
        } finally {
            setNewConvLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-300">

            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Messages
                </h1>

                <p className="text-muted-foreground mt-1">
                    Communicate directly with support staff and project managers.
                </p>
            </div>

            {/* Messaging Container */}
            <div className="grid grid-cols-1 lg:grid-cols-4 h-[600px] border border-border rounded-xl overflow-hidden bg-card">

                {/* Conversations Sidebar */}
                <div className="lg:col-span-1 border-r border-border flex flex-col bg-muted/10">

                    {/* Sidebar Header */}
                    <div className="p-4 border-b border-border">
                        <div className="flex items-center justify-between">

                            <h3 className="font-semibold text-foreground">
                                Conversations
                            </h3>

                            <button
                                onClick={() =>
                                    setShowNewConversation(!showNewConversation)
                                }
                                className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition"
                                title="New Conversation"
                            >
                                {showNewConversation ? (
                                    <X className="w-4 h-4" />
                                ) : (
                                    <PlusCircle className="w-4 h-4" />
                                )}
                            </button>

                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            {conversations.length} conversation
                            {conversations.length !== 1 ? "s" : ""}
                        </p>
                    </div>

                    {/* New Conversation Form */}
                    {showNewConversation && (
                        <div className="p-3 border-b border-border bg-muted/20 space-y-2">

                            <p className="text-xs font-medium text-foreground">
                                Start a new conversation
                            </p>

                            <select
                                value={newConvSupportUnit}
                                onChange={(e) =>
                                    setNewConvSupportUnit(e.target.value)
                                }
                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="">
                                    Select support unit...
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

                            {newConvError && (
                                <p className="text-xs text-destructive">
                                    {newConvError}
                                </p>
                            )}

                            <Button
                                size="sm"
                                className="w-full"
                                disabled={
                                    !newConvSupportUnit ||
                                    newConvLoading
                                }
                                onClick={handleStartConversation}
                            >
                                {newConvLoading
                                    ? "Starting..."
                                    : "Start Conversation"}
                            </Button>

                        </div>
                    )}

                    {/* Conversation List */}
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

                            conversations.map((conversation) => {

                                const unitName =
                                    conversation.supportUnit?.name ||
                                    "Unknown";

                                const initials =
                                    unitName
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

                                        {/* Avatar */}
                                        <div className="relative shrink-0">

                                            <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-sm">
                                                {initials}
                                            </div>

                                        </div>

                                        {/* Conversation Info */}
                                        <div className="flex-1 min-w-0">

                                            <div className="flex items-center justify-between gap-2">

                                                <span className="font-medium text-sm text-foreground truncate">
                                                    {unitName}
                                                </span>

                                                <span className="text-[10px] text-muted-foreground shrink-0">
                                                    {conversation.updatedAt
                                                        ? new Date(
                                                            conversation.updatedAt
                                                        ).toLocaleDateString(
                                                            [],
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                            }
                                                        )
                                                        : ""}
                                                </span>

                                            </div>

                                            <p className="text-xs text-muted-foreground truncate mt-1">
                                                Open conversation to view messages
                                            </p>

                                        </div>

                                    </div>
                                );
                            })

                        )}

                    </div>

                </div>

                {/* Active Conversation */}
                <div className="lg:col-span-3 flex flex-col h-full min-h-0 bg-card">

                    {!activeConversation ? (

                        /* No Conversation Selected */
                        <div className="flex-1 flex items-center justify-center">

                            <div className="text-center">

                                <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />

                                <h3 className="text-lg font-medium text-foreground">
                                    Select a conversation
                                </h3>

                                <p className="text-sm text-muted-foreground mt-1">
                                    Choose a conversation to start messaging.
                                </p>

                            </div>

                        </div>

                    ) : (

                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-border flex items-center gap-3 bg-card/50 backdrop-blur-sm">

                                <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-sm">
                                    {activeConversation.supportUnit?.name
                                        ?.substring(0, 2)
                                        .toUpperCase() || "??"}
                                </div>

                                <div>

                                    <h4 className="font-semibold text-sm text-foreground">
                                        {activeConversation.supportUnit?.name ||
                                            "Unknown"}
                                    </h4>

                                </div>

                            </div>

                            {/* Error */}
                            {error && (
                                <div className="border-b border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                    {error}
                                </div>
                            )}

                            {/* Messages */}
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
                                            No messages yet. Start the conversation.
                                        </p>

                                    </div>

                                ) : (

                                    <div className="space-y-4">

                                        {messages.map((message) => {

                                            const isStudent =
                                                message.senderType === "student";

                                            return (
                                                <div
                                                    key={message.id}
                                                    className={`flex ${
                                                        isStudent
                                                            ? "justify-end"
                                                            : "justify-start"
                                                    } items-end gap-2`}
                                                >

                                                    {/* Staff Avatar */}
                                                    {!isStudent && (
                                                        <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">

                                                            {activeConversation
                                                                .supportUnit?.name
                                                                ?.substring(0, 2)
                                                                .toUpperCase() ||
                                                                "??"}

                                                        </div>
                                                    )}

                                                    {/* Message Bubble */}
                                                    <div
                                                        className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                                                            isStudent
                                                                ? "bg-primary text-primary-foreground rounded-br-none"
                                                                : "bg-card border border-border text-foreground rounded-bl-none"
                                                        }`}
                                                    >

                                                        {/* Staff Name */}
                                                        {!isStudent && (
                                                            <p className="text-[10px] font-semibold mb-1 opacity-70">
                                                                {activeConversation
                                                                    .supportUnit?.name ||
                                                                    "Staff"}
                                                            </p>
                                                        )}

                                                        {/* Message Content */}
                                                        <p className="leading-relaxed">
                                                            {message.content}
                                                        </p>

                                                        {/* Message Time */}
                                                        <span className="block text-[9px] text-right mt-1 opacity-70">
                                                            {new Date(
                                                                message.createdAt
                                                            ).toLocaleTimeString(
                                                                [],
                                                                {
                                                                    hour: "numeric",
                                                                    minute: "2-digit",
                                                                }
                                                            )}
                                                        </span>

                                                    </div>

                                                </div>
                                            );
                                        })}

                                    </div>

                                )}

                            </div>

                            {/* Message Input */}
                            <form
                                onSubmit={handleSendMessage}
                                className="p-4 border-t border-border bg-card flex items-center gap-2"
                            >

                                <Input
                                    placeholder="Type a message..."
                                    value={typedMsg}
                                    onChange={(e) =>
                                        setTypedMsg(e.target.value)
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

        </div>
    );
};

export default ConversationUI;
