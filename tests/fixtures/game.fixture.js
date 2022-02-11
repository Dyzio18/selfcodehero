const mongoose = require('mongoose');
const faker = require('faker');
const { userOne } = require('./user.fixture');
const Game = require('../../src/models/game.model');

const gameOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  desc: faker.lorem.paragraph(),
  isEmailVerified: true,
  owners: [userOne._id],
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
  missions: [
    {
      _id: mongoose.Types.ObjectId(),
      name: 'enter to matrix',
      title: 'Hi Neo! Follow the rabbit',
      desc: 'Find real world in ilusion.',
      statement: [],
      tasks: [],
      gain: [
        {
          type: 'xp',
          value: 100,
        },
      ],
    },
    {
      _id: mongoose.Types.ObjectId(),
      name: 'whiteboard transparent schemas matrix',
      title: 'e-enable wireless users capacitor',
      desc: 'ab accusantium cupiditate In delectus sint accusamus voluptatem enim id libero.',
      statement: [],
      tasks: [],
      gain: [],
    },
  ],
  players: [],
};

const insertGames = async (games) => {
  await Game.insertMany(games.map((game) => ({ ...game })));
};

module.exports = {
  gameOne,
  insertGames,
};
