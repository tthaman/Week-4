const mongoose = require('mongoose');
const Note = require('../models/note');


//create(userId, text) - should create a note for the given user
module.exports.create = async (note) => {
  return await Note.create({text: note.text, userId: mongoose.Types.ObjectId(note.userId)});
};

// getById(noteId) - should get note for noteId (_id)
module.exports.getById= async (noteId, userId) => {
  if (userId) {
    return await Note.findOne({_id: noteId, userId: mongoose.Types.ObjectId(userId)}).lean();
  } else {
    return await Note.findOne({_id: noteId}).lean();
  }
};

// getUserNotes(userId) - should get all notes for userId
module.exports.getAllByUserId = async (userId) => {
  return await Note.find({ userId: mongoose.Types.ObjectId(userId) }).lean();
};
