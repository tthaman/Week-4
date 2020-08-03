const { Router } = require("express");
const router = Router();

const noteDAO = require('../daos/note');

//POST / - If the user is logged in, it should store the incoming note along with their userId
//GET / - If the user is logged in, it should get all notes for their userId
//GET /:id - If the user is logged in, it should get the note with the provided id and that has their userId

// router.use(async (req, res, next) => {
//   const { noteId } = req.params;
//   const note = await noteDAO.getById(noteId);
//   if (!note) {
//   res.status(404).send("note not found");
//   } else {
//     req.note = note;    next();
//   }});

// Create
router.post("/", async (req, res, next) => {
  const note = req.body;
  if (!note || JSON.stringify(note) === '{}' ) {
    res.status(400).send('note is required');
  } else {
    try {
      note.userId = req.userId;
      const savednote = await noteDAO.create(note);
      res.json(savednote);
    } catch(e) {
      res.status(500).send(e.message);
    }
  }
});

// Read - single note
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  let note;
  try {
    note = await noteDAO.getById(id, req.userId);
    if (note) {
      res.json(note);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(400);
  }
});

// Read - all notes
router.get("/", async (req, res, next) => {
  const notes = await noteDAO.getAllByUserId(req.userId);
  if (notes && notes.length > 0) {
    res.json(notes);
  } else {
    res.sendStatus(404);
  }
});

// Update
router.put("/:id", async (req, res, next) => {
  const noteId = req.params.id;
  const note = req.body;
  if (!note || JSON.stringify(note) === '{}' ) {
    res.status(400).send('note is required"');
  } else {
    const updatednote = await noteDAO.updateById(noteId, note);
    res.json(updatednote);
  }
});

// Delete
router.delete("/:id", async (req, res, next) => {
  const noteId = req.params.id;
  try {
    await noteDAO.deleteById(noteId);
    res.sendStatus(200);
  } catch(e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
