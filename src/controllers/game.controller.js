const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { gameService } = require('../services');

const createGame = catchAsync(async (req, res) => {
  const game = await gameService.createGame(req.body);
  res.status(httpStatus.CREATED).send(game);
});

const getGames = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await gameService.queryGames(filter, options);
  res.send(result);
});

const getGame = catchAsync(async (req, res) => {
  const game = await gameService.getGameById(req.params.gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  res.send(game);
});

const updateGame = catchAsync(async (req, res) => {
  const game = await gameService.updateGameById(req.params.gameId, req.body);
  res.send(game);
});

const deleteGame = catchAsync(async (req, res) => {
  await gameService.deleteGameById(req.params.gameId);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Badges Controller
 * GET /v1/games/:id/badges/
 */
const getBadges = catchAsync(async (req, res) => {
  const game = await gameService.getGameById(req.params.gameId);
  if (!game && !game.badges) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Badges not found');
  }

  res.send(game.badges);
});

const getBadge = catchAsync(async (req, res) => {
  const badge = await gameService.getBadgeById(req.params.gameId, req.params.badgeId);
  if (!badge) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Badges not found');
  }
  res.send(badge);
});

const updateBadge = catchAsync(async (req, res) => {
  const badge = await gameService.updateBadgeById(req.params.gameId, req.params.badgeId, req.body);
  res.send(badge);
});

const createBadge = catchAsync(async (req, res) => {
  const badge = await gameService.createBadge(req.params.gameId, req.body);
  res.send(badge);
});

const deleteBadge = catchAsync(async (req, res) => {
  await gameService.deleteBadgeById(req.params.gameId, req.params.badgeId, req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createGame,
  getGames,
  getGame,
  updateGame,
  deleteGame,
  getBadges,
  getBadge,
  updateBadge,
  createBadge,
  deleteBadge,
};
