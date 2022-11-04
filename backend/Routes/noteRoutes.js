const express = require('express');
const {getNoteById,
  getNotes,
  CreateNote,
  DeleteNote,
  UpdateNote,} = require('../Controllers/NoteController.js');

const router = express.Router();
const {protect} = require('../Middleware/authMiddleware.js');


router.route("/").get(protect, getNotes);
router
  .route("/:id")
  .get(getNoteById)
  .delete(protect, DeleteNote)
  .put(protect, UpdateNote);
router.route("/create").post(protect, CreateNote);

module.exports = router;
