// ClientNotes.jsx

// =========================
// Imports
// =========================
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNotesByUserId, createNote, updateNote, deleteNote } from "@/api/noteapi";
import { getUserById } from "@/api/userapi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  StickyNote,
  PlusCircle,
  Trash2,
  Pencil,
  X,
  Save,
  ArrowLeft,
  CalendarDays,
  User,
} from "lucide-react";

// =========================
// Component
// =========================
export default function ClientNotes() {
  // =====================
  // State
  // =====================
  const params = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================
  // Data Fetching
  // =====================
  const fetchNotes = async () => {
    try {
      const data = await getNotesByUserId(params.id);
      setNotes(data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  //promise.all for faster initial page load. Promise.all starts both requests in parallel and waits until both finish.
  useEffect(() => {
  async function loadPage() {
    try {
      const [clientData, notesData] = await Promise.all([
        getUserById(params.id),
        getNotesByUserId(params.id),
      ]);

      setClient(clientData);
      setNotes(notesData);
    } catch (err) {
      console.error("Failed to load page:", err);
    }
  }

  loadPage();
  }, [params.id]);

  // =====================
  // Handlers
  // =====================
  const handleCreateNote = async () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await createNote(Number(params.id), newNoteTitle, newNoteContent);
      setNewNoteTitle("");
      setNewNoteContent("");
      setShowForm(false);
      await fetchNotes();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNote = async (id) => {
    setLoading(true);
    try {
      await updateNote(id, editTitle, editContent);
      setEditingNoteId(null);
      await fetchNotes();
    } catch (err) {
      console.error("Failed to update note:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      await fetchNotes();
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  // =====================
  // JSX
  // =====================
  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ── Header ── */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <StickyNote className="h-7 w-7" />
              Client Notes
            </h1>
            <p className="text-muted-foreground mt-0.5 text-sm">
              Manage notes for client ID: <span className="font-medium"> {params.id}</span>
            </p>
          </div>
        </div>

        {/* ── Client Info Card ── */}
        {client && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-4 w-4" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Name</p>
                  <p className="font-medium">{client.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Email</p>
                  <p className="font-medium">{client.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Role</p>
                  <p className="font-medium">{client.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Add Note Section ── */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Notes ({notes.length})
          </h2>
          <Button onClick={() => setShowForm((prev) => !prev)} className="flex items-center gap-2">
            {showForm ? (
              <>
                <X className="h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4" />
                Add Note
              </>
            )}
          </Button>
        </div>

        {/* ── Add Note Form ── */}
        {showForm && (
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                New Note
              </CardTitle>
              <CardDescription>Fill in the details to add a new client note.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {error && (
                <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="note-title">Title</Label>
                <Input
                  id="note-title"
                  type="text"
                  placeholder="e.g. Initial Meeting"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="note-content">Content</Label>
                <textarea
                  id="note-content"
                  rows={4}
                  placeholder="Write your note here..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="w-full border rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button type="button" onClick={handleCreateNote} disabled={loading} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {loading ? "Saving..." : "Save Note"}
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* ── Notes List ── */}
        {notes.length === 0 ? (
          <Card>
            <CardContent className="py-16 flex flex-col items-center justify-center text-center text-muted-foreground gap-3">
              <StickyNote className="h-12 w-12 opacity-30" />
              <p className="text-lg font-medium">No notes yet</p>
              <p className="text-sm">Click "Add Note" to create the first note for this client.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <Card key={note.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4">
                    {/* ── Editing title ── */}
                    {editingNoteId === note.id ? (
                      <Input
                        id={`edit-title-${note.id}`}
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="text-base font-semibold"
                      />
                    ) : (
                      <CardTitle className="text-base">{note.title}</CardTitle>
                    )}

                    {/* ── Action buttons ── */}
                    <div className="flex items-center gap-2 shrink-0">
                      {editingNoteId === note.id ? (
                        <>
                          <Button
                            size="icon"
                            variant="default"
                            onClick={() => handleUpdateNote(note.id)}
                            title="Save changes"
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setEditingNoteId(null)}
                            title="Cancel edit"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              setEditingNoteId(note.id);
                              setEditTitle(note.title);
                              setEditContent(note.content);
                            }}
                            title="Edit note"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteNote(note.id)}
                            title="Delete note"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* ── Date ── */}
                  <CardDescription className="flex items-center gap-1 text-xs mt-1">
                    <CalendarDays className="h-3 w-3" />
                    {new Date(note.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* ── Editing content ── */}
                  {editingNoteId === note.id ? (
                    <textarea
                      id={`edit-content-${note.id}`}
                      rows={4}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full border rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {note.content}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
