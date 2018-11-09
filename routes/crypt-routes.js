const express = require('express');
const cryptRouter = express.Router();
const cryptController = require('../controllers/crypt-controller.js');


//////////////////////////////////////
// ADMIN ROUTES - REMOVE FOR DEPLOY //
//////////////////////////////////////

cryptRouter.get('/user', cryptController.userIndex);
cryptRouter.get('/token', cryptController.tokenIndex);
// cryptRouter.get('/admin', cryptController.adminIndex);
// cryptRouter.post('/admin', cryptController.adminCreate);
cryptRouter.delete('/admin/:password', cryptController.uberDestroy);



//////////////////////
// USER AUTH ROUTES //
//////////////////////

cryptRouter.post('/login', cryptController.login);
cryptRouter.post('/logout', cryptController.logout);
cryptRouter.post('/token', cryptController.tokenCheck);
cryptRouter.post('/newuser', cryptController.newUser);



/////////////////////
// API DATA ROUTES //
/////////////////////

cryptRouter.get('/:token', cryptController.getAllShows);
cryptRouter.get('/:token/:id', cryptController.getShow);
cryptRouter.post('/:token', cryptController.addShow);
cryptRouter.put('/:token/:id', cryptController.updateShow);
cryptRouter.delete('/:token/:id', cryptController.destroyShow);



module.exports = cryptRouter;
