const httpStatus = require('http-status');
const { Game } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a game
 * @param {Object} gameBody
 * @returns {Promise<Game>}
 */
const createGame = async (gameBody, userId) => {
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User does not exist');
  }

  const game = gameBody;
  game.owners = [userId];
  return Game.create(game);
};

/**
 * Query for games
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryGames = async (filter, options) => {
  const games = await Game.paginate(filter, options);
  return games;
};

/**
 * Get game by id
 * @param {ObjectId} id
 * @returns {Promise<Game>}
 */
const getGameById = async (id) => {
  return Game.findById(id);
};

/**
 * Get game by email
 * @param {string} email
 * @returns {Promise<Game>}
 */
const getGameByEmail = async (email) => {
  return Game.findOne({
    email,
  });
};

/**
 * Get game by owner
 * @param {string} email
 * @returns {Promise<Game>}
 */
const getGamesByOwner = async (userId) => {
  return Game.find({
    owners: userId,
  });
};

/**
 * Update game by id
 * @param {ObjectId} gameId
 * @param {Object} updateBody
 * @returns {Promise<Game>}
 */
const updateGameById = async (userId, gameId, updateBody) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }

  if (!game.owners.includes(userId)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Need authenticate, you are not game owner');
  }

  // if (updateBody.email) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }

  Object.assign(game, updateBody);
  await game.save();
  return game;
};

/**
 * Delete game by id
 * @param {ObjectId} gameId
 * @returns {Promise<Game>}
 */
const deleteGameById = async (userId, gameId) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }

  if (!game.owners.includes(userId)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Need authenticate, you are not game owner');
  }

  await game.remove();
  return game;
};

/**
 * Badges Service
 */

/**
 * Create new badge in game
 * @param {ObjectId} gameId
 * @param {Object} updateBody
 * @param {String} [updateBody.name] - Badge name
 * @param {String} [updateBody.desc] - Badge description
 * @param {String} [updateBody.url] - Badge url to image
 * @returns
 */
const createBadge = async (gameId, updateBody) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  game.badges.push(updateBody);
  await game.save();
  return game;
};

/**
 * Ged badge by id
 * @param {ObjectId} gameId
 * @param {ObjectId} badgeId
 * @returns {Object}
 */
const getBadgeById = async (gameId, badgeId) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  const badges = game.badges || {};
  const badge = badges.find((elem) => elem.id.toString() === badgeId);
  return badge;
};

/**
 * Update badge by id
 * @param {ObjectId} gameId
 * @param {ObjectId} badgeId
 * @param {Object} updateBody
 * @param {String} [updateBody.name] - Badge name
 * @param {String} [updateBody.desc] - Badge description
 * @param {String} [updateBody.url] - Badge url to image
 * @returns {Promise<Game>}
 */
const updateBadgeById = async (gameId, badgeId, updateBody) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  const updatesBadges = game.badges.map((elem) => (elem.id.toString() === badgeId ? Object.assign(elem, updateBody) : elem));
  game.badges = updatesBadges;
  await game.save();
  return game;
};

/**
 * Delete badge by id in game
 * @param {ObjectId} gameId
 * @param {ObjectId} badgeId
 * @returns {Promise<Game>}
 */
const deleteBadgeById = async (gameId, badgeId) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  const updatesBadges = game.badges.filter((elem) => elem.id.toString() !== badgeId);
  game.badges = updatesBadges;
  await game.save();
  return game;
};

/**
 * Missions Service
 */

/**
 * Create new mission in game
 * @param {ObjectId} gameId
 * @param {Object} updateBody
 * @param {String} [updateBody.name] - Mission name
 * @param {String} [updateBody.desc] - Mission description
 * @param {String} [updateBody.url] - Mission url to image
 * @returns
 */
const createMission = async (gameId, updateBody) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  game.missions.push(updateBody);
  await game.save();
  return game;
};

/**
 * Ged mission by id
 * @param {ObjectId} gameId
 * @param {ObjectId} missionId
 * @returns {Object}
 */
const getMissionById = async (gameId, missionId) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  const missions = game.missions || {};
  const mission = missions.find((elem) => elem.id.toString() === missionId);
  return mission;
};

/**
 * Update mission by id
 * @param {ObjectId} gameId
 * @param {ObjectId} missionId
 * @param {Object} updateBody
 * @param {String} [updateBody.name] - Mission name
 * @param {String} [updateBody.desc] - Mission description
 * @param {String} [updateBody.url] - Mission url to image
 * @returns {Promise<Game>}
 */
const updateMissionById = async (gameId, missionId, updateBody) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  const updatesMissions = game.missions.map((elem) =>
    elem.id.toString() === missionId ? Object.assign(elem, updateBody) : elem
  );
  game.missions = updatesMissions;
  await game.save();
  return game;
};

/**
 * Delete mission by id in game
 * @param {ObjectId} gameId
 * @param {ObjectId} missionId
 * @returns {Promise<Game>}
 */
const deleteMissionById = async (gameId, missionId) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  const updatesMissions = game.missions.filter((elem) => elem.id.toString() !== missionId);
  game.missions = updatesMissions;
  await game.save();
  return game;
};

/**
 * Players Service
 */

/**
 * Create new player in game
 * @param {ObjectId} gameId
 * @param {Object} updateBody
 * @param {String} [updateBody.name] - Player name
 * @param {String} [updateBody.desc] - Player description
 * @param {String} [updateBody.url] - Player url to image
 * @returns
 */
const createPlayer = async (gameId, updateBody) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  game.players.push(updateBody);
  await game.save();
  return game;
};

/**
 * Ged player by id
 * @param {ObjectId} gameId
 * @param {ObjectId} playerId
 * @returns {Object}
 */
const getPlayerById = async (gameId, playerId) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  const players = game.players || {};
  const player = players.find((elem) => elem.id.toString() === playerId);
  return player;
};

/**
 * Update player by id
 * @param {ObjectId} gameId
 * @param {ObjectId} playerId
 * @param {Object} updateBody
 * @param {String} [updateBody.name] - Player name
 * @param {String} [updateBody.desc] - Player description
 * @param {String} [updateBody.url] - Player url to image
 * @returns {Promise<Game>}
 */
const updatePlayerById = async (gameId, playerId, updateBody) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  const updatesPlayers = game.players.map((elem) =>
    elem.id.toString() === playerId ? Object.assign(elem, updateBody) : elem
  );
  game.players = updatesPlayers;
  await game.save();
  return game;
};

/**
 * Delete player by id in game
 * @param {ObjectId} gameId
 * @param {ObjectId} playerId
 * @returns {Promise<Game>}
 */
const deletePlayerById = async (gameId, playerId) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  const updatesPlayers = game.players.filter((elem) => elem.id.toString() !== playerId);
  game.players = updatesPlayers;
  await game.save();
  return game;
};

module.exports = {
  createGame,
  queryGames,
  getGameById,
  getGameByEmail,
  getGamesByOwner,
  updateGameById,
  deleteGameById,

  getBadgeById,
  updateBadgeById,
  createBadge,
  deleteBadgeById,

  getMissionById,
  updateMissionById,
  createMission,
  deleteMissionById,

  getPlayerById,
  updatePlayerById,
  createPlayer,
  deletePlayerById,
};
