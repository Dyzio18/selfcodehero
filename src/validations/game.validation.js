const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createGame = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    desc: Joi.string(),
    // password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    // role: Joi.string().required().valid('game', 'admin'),
  }),
};

const getGames = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getGame = {
  params: Joi.object().keys({
    gameId: Joi.string().custom(objectId),
  }),
};

const updateGame = {
  params: Joi.object().keys({
    gameId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteGame = {
  params: Joi.object().keys({
    gameId: Joi.string().custom(objectId),
  }),
};

const createBadge = {
  params: Joi.object().keys({
    gameId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      desc: Joi.string(),
      url: Joi.string(),
      data: Joi.object(),
    })
    .min(1),
};

const getBadges = {
  params: Joi.object().keys({
    gameId: Joi.required().custom(objectId),
  }),
};

const getBadge = {
  params: Joi.object().keys({
    gameId: Joi.required().custom(objectId),
    badgeId: Joi.required().custom(objectId),
  }),
};

const updateBadge = {
  params: Joi.object().keys({
    gameId: Joi.required().custom(objectId),
    badgeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      desc: Joi.string(),
      url: Joi.string(),
      data: Joi.object(),
    })
    .min(1),
};

const deleteBadge = {
  params: Joi.object().keys({
    gameId: Joi.required().custom(objectId),
    badgeId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createGame,
  getGames,
  getGame,
  updateGame,
  deleteGame,
  createBadge,
  getBadges,
  getBadge,
  updateBadge,
  deleteBadge,
};
