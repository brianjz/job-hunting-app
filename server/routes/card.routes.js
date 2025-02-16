const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

const Card = require('../models/Card.model');

// ****************************************************************************************
// Create
// ****************************************************************************************

// <form action="/cards" method="POST">
router.post('/api/cards', (req, res, next) => {
  // console.log(req.body);
  Card.create({
    title: req.body.title,
    company: req.body.company,
    date: req.body.date,
    note: req.body.note,
    location: req.body.location,
    jobtype: req.body.jobtype,
    salary: req.body.salary,
    postingURL: req.body.postingURL,
    creator: req.user._id
  })
    .then(cardDoc => res.status(200).json({ card: cardDoc, successMessage: 'Successfully created!' }))
    .catch(err => res.json({ failureMessage: 'Failed to create card.' }));
});

// ****************************************************************************************
// Read - Get all
// ****************************************************************************************

router.get('/api/cards', (req, res, next) => {
  if (req.user)
  Card.find({ "creator": ObjectId(req.user._id)})
    .then(cardsFromDB => res.status(200).json({ cards: cardsFromDB }))
    .catch(err => next(err));
  else 
    res.status(201).json({ message: 'Must log in first'} );
});

// ****************************************************************************************
// Update
// ****************************************************************************************

// <form action="/cards/{{foundCard._id}}/update" method="POST">
router.post('/api/cards/:id/update', (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedCard => res.status(200).json({ successMessage: 'Updated Successfully!', card: updatedCard }))
    .catch(err => res.json({ failureMessage: 'Failed to update card.' }));
});

// ****************************************************************************************
// Delete
// ****************************************************************************************

// <form action="/cards/{{this._id}}/delete" method="post">
router.post('/api/cards/:cardId/delete', (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.json({ successMessage: 'Successfully deleted!' }))
    .catch(err => res.status(500).json({ failureMessage: 'Failed to delete card.' }));
});

// ****************************************************************************************
// Read - Get by id
// ****************************************************************************************

router.get('/api/cards/:someCardId', (req, res, next) => {
  Card.findById(req.params.someCardId)
    .then(foundCard => res.status(200).json({ card: foundCard }))
    .catch(err => next(err));
});

module.exports = router;
