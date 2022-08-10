const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const verify = require('../verifyToken');

// CREATE Movie

router.post('/', verify, async (req, res) => {
  console.log(req.user);
  if (req.user.isAdmin) {
    const movie = new Movie(req.body);
    try {
      const saveMovie = await movie.save();
      res.status(201).json(saveMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You are not allowed!');
  }
});

// UPDATE movie

router.put('/:id', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You are not allowed!');
  }
});

//  Delete

router.delete('/:id', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json('The movie deleted successfully');
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You are not allowed!');
  }
});

//    GET

router.get('/find/:id', verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//  GET all

router.get('/', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const allMovies = await Movie.find();
      res.status(200).json(allMovies.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You don't have access");
  }
});

//  GET Random movie for main page

router.get('/random', verify, async (req, res) => {
  const { type } = req.query;
  let movie;
  try {
    if (type === 'series') {
      movie = await Movie.aggregate([
        {
          $match: { $isSeries: true },
        },
        {
          $sample: { size: 1 },
        },
      ]);
    } else {
      movie = await Movie.findOne({});
      // movie = await Movie.aggregate([
      //     {$match:{$isSeries:false}},
      //     {$sample:{size:1}}
      // ])
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
