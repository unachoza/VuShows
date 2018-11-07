const Tvshow = require('../models/tvshow');

const tvshowController = {};

tvshowController.index = (req, res) => {
  Tvshow.findAll()
    .then(Tvshows => {
      res.json({
        message: 'ok',
        data: Tvshows,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

tvshowController.show = (req, res) => {
  Tvshow.findById(req.params.id)
    .then(Tvshow => {
      res.json({
        message: 'ok',
        data: Tvshow,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

tvshowController.create = (req, res) => {
  Tvshow.create({
    name: req.body.name,
    genre: req.body.genre,
    net: req.body.net,
    url: req.body.url,
  })
    .then(Tvshow => {
      res.json({
        message: 'ok',
        data: Tvshow,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

tvshowController.update = (req, res) => {
  Tvshow.update(
    {
      name: req.body.name,
      genre: req.body.genre,
      net: req.body.net,
      url: req.body.url,
    },
    req.params.id,
  )
    .then(Tvshow => {
      res.json({
        message: 'ok',
        data: Tvshow,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

tvshowController.destroy = (req, res) => {
  Tvshow.destroy(req.params.id)
    .then(Tvshow => {
      res.json({
        message: 'ok',
        data: Tvshow,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

module.exports = tvshowController;
