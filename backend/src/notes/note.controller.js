const noteService = require('./note.service');

const getNotesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const notes = await noteService.getNotesByUserId(userId);
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await noteService.getNoteById(id);
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createNote = async (req, res) => {
    try {
        const { userId, title, content } = req.body;
        const note = await noteService.createNote({ userId, title, content });
        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const note = await noteService.updateNote(id, { title, content });
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await noteService.deleteNote(id);
        res.status(200).json({ message: 'Note deleted successfully', note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getNotesByUserId,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};
