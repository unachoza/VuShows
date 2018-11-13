const express = require('express');
const cryptRouter = express.Router();
const cryptController = require('../controllers/crypt-controller.js');
const API_KEY = '43caac628b4f73785a588143ec291dbe';


//////////////////////////////////////
// ADMIN ROUTES - REMOVE FOR DEPLOY //
//////////////////////////////////////

cryptRouter.get('/user', cryptController.userIndex);
cryptRouter.get('/token', cryptController.tokenIndex);
cryptRouter.delete('/admin/:password', cryptController.uberDestroy);



//////////////////////
// USER AUTH ROUTES //
//////////////////////

cryptRouter.post('/login', cryptController.login);
cryptRouter.post('/logout', cryptController.logout);
cryptRouter.post('/token', cryptController.tokenCheck);
cryptRouter.post('/newuser', cryptController.newUser);



//////////////////////////////
// EXTERNAL API DATA ROUTES //
//////////////////////////////

cryptRouter.get('/external/search/:str', (req, res) => {
  res.status(301).redirect(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${req.params.str}&page=1`)
});
cryptRouter.get('/external/show/:show_id/season/:season', (req, res) => {
  res.status(301).redirect(`https://api.themoviedb.org/3/tv/${req.params.show_id}/season/${req.params.season}?api_key=${API_KEY}&language=en-US`)
});
cryptRouter.get('/external/show/:show_id', (req, res) => {
  res.status(301).redirect(`https://api.themoviedb.org/3/tv/${req.params.show_id}?api_key=${API_KEY}&language=en-US`)
});



////////////////////////
// INTERNAL DB ROUTES //
////////////////////////

cryptRouter.get('/faves/:token', cryptController.getFaves);
cryptRouter.post('/faves/:token', cryptController.addFave);
cryptRouter.delete('/faves/:id/:token', cryptController.removeFave);

cryptRouter.post('/ep/:id/:token', cryptController.addEpisodes);
cryptRouter.get('/ep/:id/:token', cryptController.getEpisodes);
cryptRouter.get('/:token', cryptController.getAllShows);
cryptRouter.get('/:token/:id', cryptController.getShow);
cryptRouter.post('/:token', cryptController.addShow);

// cryptRouter.put('/:token/:id', cryptController.updateShow);
// cryptRouter.delete('/:token/:id', cryptController.destroyShow);



module.exports = cryptRouter;
