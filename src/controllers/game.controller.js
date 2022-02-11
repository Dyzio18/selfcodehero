const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { gameService } = require('../services');
/**
 * Games Controller
 */
// POST games/
const createGame = catchAsync(async (req, res) => {
  const game = await gameService.createGame(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(game);
});

// GET games/
const getGames = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await gameService.queryGames(filter, options);
  res.send(result);
});

// GET games/
const getGamesByOwner = catchAsync(async (req, res) => {
  const result = await gameService.getGamesByOwner(req.user.id);
  res.send(result);
});

// GET games/:gameId
const getGame = catchAsync(async (req, res) => {
  const game = await gameService.getGameById(req.params.gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  res.send(game);
});

// PATCH games/:gameId
const updateGame = catchAsync(async (req, res) => {
  const game = await gameService.updateGameById(req.user.id, req.params.gameId, req.body);
  res.send(game);
});

// DELETE games/:gameId
const deleteGame = catchAsync(async (req, res) => {
  await gameService.deleteGameById(req.user.id, req.params.gameId);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Badges Controller
 */
// POST /games/:gameId/badges/
const createBadge = catchAsync(async (req, res) => {
  const badge = await gameService.createBadge(req.params.gameId, req.body);
  res.send(badge);
});

// GET /games/:gameId/badges/
const getBadges = catchAsync(async (req, res) => {
  const game = await gameService.getGameById(req.params.gameId);
  if (!game && !game.badges) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Badges not found');
  }
  res.send(game.badges);
});

// GET /games/:gameId/badges/:badgeId
const getBadge = catchAsync(async (req, res) => {
  const badge = await gameService.getBadgeById(req.params.gameId, req.params.badgeId);
  if (!badge) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Badge not found');
  }
  res.send(badge);
});

// PATCH /games/:gameId/badges/:badgeId
const updateBadge = catchAsync(async (req, res) => {
  const badge = await gameService.updateBadgeById(req.params.gameId, req.params.badgeId, req.body);
  res.send(badge);
});

// DELETE /games/:gameId/badges/:badgeId
const deleteBadge = catchAsync(async (req, res) => {
  await gameService.deleteBadgeById(req.params.gameId, req.params.badgeId, req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Missions Controller
 */
// POST /games/:gameId/missions/
const createMission = catchAsync(async (req, res) => {
  const mission = await gameService.createMission(req.params.gameId, req.body);
  res.send(mission);
});

// GET /games/:gameId/missions/
const getMissions = catchAsync(async (req, res) => {
  const game = await gameService.getGameById(req.params.gameId);
  if (!game && !game.missions) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Missions not found');
  }
  res.send(game.missions);
});

// GET /games/:gameId/missions/:missionId
const getMission = catchAsync(async (req, res) => {
  const mission = await gameService.getMissionById(req.params.gameId, req.params.missionId);
  if (!mission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mission not found');
  }
  res.send(mission);
});

// PATCH /games/:gameId/missions/:missionId
const updateMission = catchAsync(async (req, res) => {
  const mission = await gameService.updateMissionById(req.params.gameId, req.params.missionId, req.body);
  res.send(mission);
});

// DELETE /games/:gameId/missions/:missionId
const deleteMission = catchAsync(async (req, res) => {
  await gameService.deleteMissionById(req.params.gameId, req.params.missionId, req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Players Controller
 */
// POST /games/:gameId/players/
const createPlayer = catchAsync(async (req, res) => {
  const player = await gameService.createPlayer(req.params.gameId, req.body);
  res.send(player);
});

// GET /games/:gameId/players/
const getPlayers = catchAsync(async (req, res) => {
  const game = await gameService.getGameById(req.params.gameId);
  if (!game && !game.players) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Players not found');
  }
  res.send(game.players);
});

// GET /games/:gameId/players/:playerId
const getPlayer = catchAsync(async (req, res) => {
  const player = await gameService.getPlayerById(req.params.gameId, req.params.playerId);
  if (!player) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Player not found');
  }
  res.send(player);
});

// PATCH /games/:gameId/players/:playerId
const updatePlayer = catchAsync(async (req, res) => {
  const player = await gameService.updatePlayerById(req.params.gameId, req.params.playerId, req.body);
  res.send(player);
});

// DELETE /games/:gameId/players/:playerId
const deletePlayer = catchAsync(async (req, res) => {
  await gameService.deletePlayerById(req.params.gameId, req.params.playerId, req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createGame,
  getGames,
  getGame,
  getGamesByOwner,
  updateGame,
  deleteGame,

  getBadges,
  getBadge,
  updateBadge,
  createBadge,
  deleteBadge,

  getMissions,
  getMission,
  updateMission,
  createMission,
  deleteMission,

  getPlayers,
  getPlayer,
  updatePlayer,
  createPlayer,
  deletePlayer,
};
