const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const gameSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
gameSchema.plugin(toJSON);
gameSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The game's email
 * @param {ObjectId} [excludeGameId] - The id of the game to be excluded
 * @returns {Promise<boolean>}
 */
gameSchema.statics.isEmailTaken = async function (email, excludeGameId) {
  const game = await this.findOne({ email, _id: { $ne: excludeGameId } });
  return !!game;
};

/**
 * Check if password matches the game's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
gameSchema.methods.isPasswordMatch = async function (password) {
  const game = this;
  return bcrypt.compare(password, game.password);
};

gameSchema.pre('save', async function (next) {
  const game = this;
  if (game.isModified('password')) {
    game.password = await bcrypt.hash(game.password, 8);
  }
  next();
});

/**
 * @typedef Game
 */
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
