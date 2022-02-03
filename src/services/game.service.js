const httpStatus = require('http-status');
const { Game } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a game
 * @param {Object} gameBody
 * @returns {Promise<Game>}
 */
const createGame = async (gameBody) => {
  // if (await Game.isEmailTaken(gameBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }

  return Game.create(gameBody);
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
 * Update game by id
 * @param {ObjectId} gameId
 * @param {Object} updateBody
 * @returns {Promise<Game>}
 */
const updateGameById = async (gameId, updateBody) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  if (updateBody.email && (await Game.isEmailTaken(updateBody.email, gameId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(game, updateBody);
  await game.save();
  return game;
};

/**
 * Delete game by id
 * @param {ObjectId} gameId
 * @returns {Promise<Game>}
 */
const deleteGameById = async (gameId) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  await game.remove();
  return game;
};

/**
 * Badges Service
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
 * Create badge {name, desc, url}
 * @param {*} gameId
 * @param {*} updateBody
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
 * Update badge by id
 * @param {ObjectId} gameId
 * @param {Object} updateBody
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
 * Delete badge by id
 * @param {ObjectId} gameId
 * @param {Object} updateBody
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

module.exports = {
  createGame,
  queryGames,
  getGameById,
  getGameByEmail,
  updateGameById,
  deleteGameById,
  getBadgeById,
  updateBadgeById,
  createBadge,
  deleteBadgeById,
};
