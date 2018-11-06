const Tvshow = require('../models/tvshow');

const tvshowController = {};

tvshowController.index = (req, res) => {
  Tvshow.findAll()
    .then(icecreams => {
      res.json({
        message: 'ok',
        data: icecreams,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

tvshowController.show = (req, res) => {
  Tvshow.findById(req.params.id)
    .then(icecream => {
      res.json({
        message: 'ok',
        data: icecream,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

tvshowController.create = (req, res) => {
  Tvshow.create({
    flavor: req.body.flavor,
    description: req.body.description,
    rating: req.body.rating,
    url: req.body.url,
  })
    .then(icecream => {
      res.json({
        message: 'ok',
        data: icecream,
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
      flavor: req.body.flavor,
      description: req.body.description,
      rating: req.body.rating,
      url: req.body.url,
    },
    req.params.id,
  )
    .then(icecream => {
      res.json({
        message: 'ok',
        data: icecream,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

tvshowController.destroy = (req, res) => {
  Tvshow.destroy(req.params.id)
    .then(icecream => {
      res.json({
        message: 'ok',
        data: icecream,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

module.exports = tvshowController;
