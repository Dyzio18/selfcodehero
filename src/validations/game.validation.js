const Joi = require('joi');
const { objectId } = require('./custom.validation');

/**
 * Games validator
 */
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
      desc: Joi.string(),
      email: Joi.string().email(),
      name: Joi.string(),
      categories: [Joi.object(), Joi.array()],
      badges: [Joi.object(), Joi.array()],
      missions: [Joi.object(), Joi.array()],
      owners: Joi.array(),
      settings: Joi.object(),
    })
    .min(1),
};

const deleteGame = {
  params: Joi.object().keys({
    gameId: Joi.string().custom(objectId),
  }),
};

/**
 * Badges validator
 */
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

/**
 * Missions validator
 */
const createMission = {
  params: Joi.object().keys({
    gameId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      desc: Joi.string(),
      title: Joi.string(),
      data: Joi.object(),
      statement: Joi.array(),
      tasks: Joi.array(),
      gain: Joi.array(),
    })
    .min(1),
};

const getMissions = {
  params: Joi.object().keys({
    gameId: Joi.required().custom(objectId),
  }),
};

const getMission = {
  params: Joi.object().keys({
    gameId: Joi.required().custom(objectId),
    missionId: Joi.required().custom(objectId),
  }),
};

const updateMission = {
  params: Joi.object().keys({
    gameId: Joi.required().custom(objectId),
    missionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      desc: Joi.string(),
      title: Joi.string(),
      data: Joi.object(),
      statement: Joi.array(),
      tasks: Joi.array(),
      gain: Joi.array(),
    })
    .min(1),
};

const deleteMission = {
  params: Joi.object().keys({
    gameId: Joi.required().custom(objectId),
    missionId: Joi.required().custom(objectId),
  }),
};

/**
 * Player validator
 */
const createPlayer = {
  params: Joi.object().keys({
    gameId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      nick: Joi.string().required(),
      points: Joi.number(),
      xp: Joi.number(),
      level: Joi.number(),
      badges: Joi.array(),
      avaibleMissions: Joi.array(),
      finishMissions: Joi.array(),
      inprogressMissions: Joi.array(),
      data: Joi.object(),
    })
    .min(1),
};

const getPlayers = {
  params: Joi.object().keys({
    gameId: Joi.required().custom(objectId),
  }),
};

const getPlayer = {
  params: Joi.object().keys({
    gameId: Joi.required().custom(objectId),
    playerId: Joi.required().custom(objectId),
  }),
};

const updatePlayer = {
  params: Joi.object().keys({
    gameId: Joi.required().custom(objectId),
    playerId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      nick: Joi.string(),
      points: Joi.number(),
      xp: Joi.number(),
      level: Joi.number(),
      badges: Joi.array(),
      avaibleMissions: Joi.array(),
      finishMissions: Joi.array(),
      inprogressMissions: Joi.array(),
      data: Joi.object(),
    })
    .min(1),
};

const deletePlayer = {
  params: Joi.object().keys({
    gameId: Joi.required().custom(objectId),
    playerId: Joi.required().custom(objectId),
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

  createMission,
  getMissions,
  getMission,
  updateMission,
  deleteMission,

  createPlayer,
  getPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer,
};
