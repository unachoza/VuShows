const { Crypt, Tv } = require('../models/crypt.js');
const cryptController = {};
const bcrypt = require('bcrypt');
const saltRounds = 2;
const valid = 60000 * 60 * 24 * 1;


///////////////////////////////////////
// ADMIN METHODS - REMOVE FOR DEPLOY //
///////////////////////////////////////

// Get All Users
  cryptController.userIndex = (req, res) => {
    Crypt.allUsers()
      .then(data => {
        res.json({
          message: 'ok',
          data: data
        });
      })
      .catch(err => {
        res.status(500).json({err});
      });
  };


// Get All Tokens
  cryptController.tokenIndex = (req, res) => {
    Crypt.allTokens()
      .then(data => {
        res.json({
          message: 'ok',
          data: data
        });
      })
      .catch(err => {
        res.status(500).json({err});
      });
  };


// Master Reset: Delete All Tokens And Users(!) [password: iamtheeggman]
  cryptController.uberDestroy = (req, res) => {
    Crypt.getAdmin()
      .then(data => {
        bcrypt.compare(req.params.password, data.hash, (err, same) => {
          if (same) {
            Crypt.deleteFaves()
              .then(del => {
                Crypt.deleteShows()
                  .then(del => {
                    Crypt.deleteTokens()
                      .then(del => {
                        Crypt.deleteUsers()
                          .then(del => {
                            res.json({
                              message: 'i am the walrus'
                            });
                          });
                      });
                  });
              });
          } else {
            res.json({
              message: 'sorry try again'
            });
          };
        });
      })
      .catch(err => {
        res.status(500).json({err});
      });
  };



///////////////////////
// USER AUTH METHODS //
///////////////////////

// Dynamic Token Generator
  makeToken = () => {
    let token = '';
    for (let i = 0; i < 32; i++) {
      const date = Number(new Date()).toString().split('').reverse();
      const rand = Math.floor(Math.random() * 13);
      token += date[rand];
    };
    return token;
  };


// User Login: Verify Password => Generate + Store Token => Return Token
  cryptController.login = (req, res) => {
    Crypt.getUser(req.body.username)
      .then(data => {
        const user_id = data.id;
        Crypt.destroyTokens(user_id)
          .then(ok => {
            bcrypt.compare(req.body.password, data.hash, (err, same) => {
              if (same) {
                const token = makeToken();
                bcrypt.hash(token, saltRounds, (err, hash) => {
                  const tstamp = Number(new Date());
                  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddres;
                  const user_id = parseInt(data.id);
                  Crypt.storeToken({
                    hash: hash,
                    tstamp: tstamp,
                    ip: ip,
                    user_id: user_id
                  })
                    .then(tk => {
                      res.json({
                        message: 'Login Valid.',
                        token: token
                      });
                    })
                });
              } else {
                res.json({
                  message: 'Invalid Password',
                  token: null
                });
              };
            });
          });
      })
      .catch(err => {
        res.json({
          message: 'Invalid Username',
          token: null
        });
      });
  };


// User Logout: Verify Token Matches IP => Delete Token
  cryptController.logout = (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddres;
    Crypt.getToken(ip)
      .then(data => {
        bcrypt.compare(req.body.token, data.hash, (err, same) => {
          if (same) {
            Crypt.destroyTokens(data.user_id)
              .then(ok => {
                res.json({
                  message: 'Logout Successful'
                });
              });
          };
        });
      })
      .catch(err => {
        res.status(500).json({err});
      });
  };


// Verify Token: Get Token Matching Req IP => Delete If Expired => Match With Stored Hash => Return True
  cryptController.tokenCheck = (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddres;
    Crypt.getToken(ip)
      .then(data => {
        const tstamp = data.tstamp;
        const now = Number(new Date());
        if (now - tstamp >= valid) {
          Crypt.destroyTokens(data.user_id)
            .then(ok => {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            });
        } else {
          bcrypt.compare(req.body.token, data.hash, (err, same) => {
            if (same) {
              res.json({
                message: 'Token Is Valid',
                status: true
              });
            } else {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            };
          });
        };
      })
      .catch(err => {
        res.json({
          message: 'Token Is Invalid',
          status: false
        });
      });
  };


// Create New User: Verify Username + Password Meet Criteria => Verify Username Doesn't Exist => Hash Password + Store User
  cryptController.newUser = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username && !password) {
      res.json({
        message: 'Please Enter A Username & Password.',
        status: false
      });
    } else if (!username) {
      res.json({
        message: 'You Must Enter A Username.',
        status: false
      });
    } else if (!password) {
      res.json({
        message: 'You Must Enter A Password.',
        status: false
      });
    } else if (password.length < 6) {
      res.json({
        message: 'Password Must Be At Least 6 Characters.',
        status: false
      });
    } else {
      Crypt.checkUserExists(req.body.username)
        .then(data => {
          if (data.username) {
            res.json({
              message: 'User Name Taken',
              status: false
            });
          };
        })
        .catch(err => {
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
              Crypt.createUser({
                username: req.body.username,
                hash: hash
              })
                .then(data => {
                  res.json({
                    message: 'Account Created!',
                    status: true
                  });
                })
                .catch(err => {
                  res.status(500).json({err});
                });
            });
        });
    };
  };



//////////////////////
// API DATA METHODS //
//////////////////////

// Get All Shows
  cryptController.getAllShows = (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddres;
    Crypt.getToken(ip)
      .then(data => {
        const tstamp = data.tstamp;
        const now = Number(new Date());
        if (now - tstamp >= valid) {
          Crypt.destroyTokens(data.user_id)
            .then(ok => {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            });
        } else {
          bcrypt.compare(req.params.token, data.hash, (err, same) => {
            if (same) {
              Tv.indexShows()
                .then(data => {
                  res.json({
                    message: 'All Shows From Db',
                    status: true,
                    data: data
                  });
                });
            } else {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            };
          });
        };
      })
      .catch(err => {
        res.status(500).json({err});
      });
  };


// Get Show By Id
  cryptController.getShow = (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddres;
    Crypt.getToken(ip)
      .then(data => {
        const tstamp = data.tstamp;
        const now = Number(new Date());
        if (now - tstamp >= valid) {
          Crypt.destroyTokens(data.user_id)
            .then(ok => {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            });
        } else {
          bcrypt.compare(req.params.token, data.hash, (err, same) => {
            if (same) {
              Tv.show(req.params.id)
                .then(data => {
                  res.json({
                    message: 'Single Show From Db',
                    status: true,
                    data: data
                  });
                });
            } else {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            };
          });
        };
      })
      .catch(err => {
        res.status(500).json({err});
      });
  };


// Add Show To DB
  cryptController.addShow = (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddres;
    Crypt.getToken(ip)
      .then(data => {
        const tstamp = data.tstamp;
        const now = Number(new Date());
        if (now - tstamp >= valid) {
          Crypt.destroyTokens(data.user_id)
            .then(ok => {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            });
        } else {
          bcrypt.compare(req.params.token, data.hash, (err, same) => {
            if (same) {
              Tv.showByDbId(req.body.db_id)
                .then(redundant => {
                  const data = req.body;
                  if (redundant) {
                    Tv.updateShow({
                      db_id: data.db_id,
                      title: data.title,
                      summary: data.summary,
                      air_start: data.air_start,
                      air_end: data.air_end,
                      popularity: data.popularity,
                      rating: data.rating,
                      img: data.img,
                      img_bg: data.img_bg,
                      network: data.network,
                      seasons: data.seasons,
                      episodes: data.episodes
                    }, redundant.id)
                      .then(update => {
                        res.json({
                          message: 'Db Entry Updated',
                          status: true,
                          data: update
                        });
                      });
                  } else {
                    Tv.addShow({
                      db_id: data.db_id,
                      title: data.title,
                      summary: data.summary,
                      air_start: data.air_start,
                      air_end: data.air_end,
                      popularity: data.popularity,
                      rating: data.rating,
                      img: data.img,
                      img_bg: data.img_bg,
                      network: data.network,
                      seasons: data.seasons,
                      episodes: data.episodes
                    })
                      .then(data => {
                        res.json({
                          message: 'Added To Db',
                          status: true,
                          data: data
                        });
                      });
                  };
                });
            } else {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            };
          });
        };
      })
      .catch(err => {
        res.status(500).json({err});
      });
  };


// Add Episodes To DB
  cryptController.addEpisodes = (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddres;
    Crypt.getToken(ip)
      .then(data => {
        const tstamp = data.tstamp;
        const now = Number(new Date());
        if (now - tstamp >= valid) {
          Crypt.destroyTokens(data.user_id)
            .then(ok => {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            });
        } else {
          bcrypt.compare(req.params.token, data.hash, (err, same) => {
            if (same) {
              Tv.episodeByDbId(req.body.db_episode_id)
                .then(redundant => {
                  const data = req.body;
                  if (redundant) {
                    Tv.updateEpisode({
                      db_id: data.db_id,
                      db_episode_id: data.db_episode_id,
                      name: data.name,
                      summary: data.summary,
                      season: data.season,
                      episode: data.episode,
                      air_date: data.air_date,
                      rating:  data.rating,
                      img: data.img
                    }, redundant.id)
                      .then(update => {
                        res.json({
                          message: 'Db Entry Updated',
                          status: true,
                          data: update
                        });
                      });
                  } else {
                    Tv.addEpisode({
                      db_id: data.db_id,
                      db_episode_id: data.db_episode_id,
                      name: data.name,
                      summary: data.summary,
                      season: data.season,
                      episode: data.episode,
                      air_date: data.air_date,
                      rating:  data.rating,
                      img: data.img
                    }, req.params.id)
                      .then(data => {
                        res.json({
                          message: 'Added To Db',
                          status: true,
                          data: data
                        });
                      });
                  };
                });
            } else {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            };
          });
        };
      })
      .catch(err => {
        res.status(500).json({err});
      });
  };


// Get Episodes By Show ID
  cryptController.getEpisodes = (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddres;
    Crypt.getToken(ip)
      .then(data => {
        const tstamp = data.tstamp;
        const now = Number(new Date());
        if (now - tstamp >= valid) {
          Crypt.destroyTokens(data.user_id)
            .then(ok => {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            });
        } else {
          bcrypt.compare(req.params.token, data.hash, (err, same) => {
            if (same) {
              Tv.episodes(req.params.id)
                .then(data => {
                  res.json({
                    message: 'Episodes From DB By Show ID',
                    status: true,
                    data: data
                  });
                });
            } else {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            };
          });
        };
      })
      .catch(err => {
        res.status(500).json({err});
      });
  };


// Get Faves
  cryptController.getFaves = (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddres;
    Crypt.getToken(ip)
      .then(data => {
        const tstamp = data.tstamp;
        const now = Number(new Date());
        if (now - tstamp >= valid) {
          Crypt.destroyTokens(data.user_id)
            .then(ok => {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            });
        } else {
          bcrypt.compare(req.params.token, data.hash, (err, same) => {
            if (same) {
              Tv.getFaves(data.user_id)
                .then(data => {
                  res.json({
                    message: 'User Faves From Db',
                    status: true,
                    data: data
                  });
                });
            } else {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            };
          });
        };
      })
      .catch(err => {
        res.status(500).json({err});
      });
  };


// Add Fave
  cryptController.addFave = (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddres;
    Crypt.getToken(ip)
      .then(data => {
        const tstamp = data.tstamp;
        const now = Number(new Date());
        if (now - tstamp >= valid) {
          Crypt.destroyTokens(data.user_id)
            .then(ok => {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            });
        } else {
          bcrypt.compare(req.params.token, data.hash, (err, same) => {
            if (same) {
              Tv.getFaveByIds(data.user_id, req.body.show_id)
                .then(redundant => {
                  if (redundant) {
                    res.json({
                      message: 'Show Already In Faves',
                      status: false
                    });
                  } else {
                    Tv.addFave(data.user_id, req.body.show_id)
                      .then(data => {
                        res.json({
                          message: 'Show Added To Faves',
                          status: true,
                          data: data
                        });
                      });
                    };
                });
            } else {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            };
          });
        };
      })
      .catch(err => {
        res.status(500).json({err});
      });
  };


// Remove Fave
  cryptController.removeFave = (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddres;
    Crypt.getToken(ip)
      .then(data => {
        const tstamp = data.tstamp;
        const now = Number(new Date());
        if (now - tstamp >= valid) {
          Crypt.destroyTokens(data.user_id)
            .then(ok => {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            });
        } else {
          bcrypt.compare(req.params.token, data.hash, (err, same) => {
            if (same) {
              Tv.destroyFave(req.params.id)
                .then(data => {
                  res.json({
                    message: 'Show Removed From Faves',
                    status: true
                  });
                });
            } else {
              res.json({
                message: 'Token Is Invalid',
                status: false
              });
            };
          });
        };
      })
      .catch(err => {
        res.status(500).json({err});
      });
  };



module.exports = cryptController;
