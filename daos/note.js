const mongoose = require('mongoose');
const Note = require('../models/note');


//createNote(userId, text) - should create a note for the given user
module.exports.createNote = async (text, userId) => {
  return await Note.create({text: text, userId: userId});
};

// getNote(userId, noteId) - should get note for userId and noteId (_id)
module.exports.getNote = async (userId, noteId) => {
  return await Note.findOne({userId: userId, _id: mongoose.Types.ObjectId(noteId)}).lean();

};

// getUserNotes(userId) - should get all notes for userId
module.exports.getUserNotes = async (userId) => {
  return await Note.find({ userId: userId }).lean();
};
