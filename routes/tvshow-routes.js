const express = require('express');
const tvshowRouter = express.Router();

const tvshowController = require('../controllers/tvshow-controller');

tvshowRouter.get('/', tvshowController.index);
tvshowRouter.post('/', tvshowController.create);

tvshowRouter.get('/:id', tvshowController.show);
tvshowRouter.put('/:id', tvshowController.update);
tvshowRouter.delete('/:id', tvshowController.destroy);

module.exports = tvshowRouter;
