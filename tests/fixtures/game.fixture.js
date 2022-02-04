const mongoose = require('mongoose');
const faker = require('faker');
const Game = require('../../src/models/game.model');

const gameOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  desc: faker.lorem.paragraph(),
  isEmailVerified: true,
  owners: ['61fc8282d07ce92260b75c5e'],
  badges: [
    {
      _id: mongoose.Types.ObjectId(),
      name: '$randomWords',
      desc: '$randomLoremWords',
      url: faker.image.avatar(),
      data: {
        btc: '$randomBitcoin',
      },
    },
  ],
  missions: [],
  players: [],
};

const insertGames = async (games) => {
  await Game.insertMany(games.map((game) => ({ ...game })));
};

module.exports = {
  gameOne,
  insertGames,
};
