const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;
// const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
// const { roles } = require('../config/roles');
// const { user } = require('./user.model');

const _playerSchema = mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    nick: { type: String },
    points: { type: Number },
    xp: { type: Number },
    level: { type: Number },
    badges: [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
    avaibleMissions: [{ type: Schema.Types.ObjectId, ref: 'Mission' }],
    finishMissions: [{ type: Schema.Types.ObjectId, ref: 'Mission' }],
    inprogressMissions: [{ type: Schema.Types.ObjectId, ref: 'Mission' }],
    data: { type: Object },
  },
  {
    _id: true,
    timestamps: true,
  }
);

const _settingsSchema = mongoose.Schema({
  levels: {
    start: { type: Number, default: 1 },
    max: { type: Number },
    stepxp: [
      {
        level: { type: Number },
        xp: { type: Number },
        _id: false,
      },
    ],
  },
  type: { type: String },
  link: { type: String },
  public: { type: Boolean },
  data: { type: Object },
});

// IF f(type, rule, value)
// eg. f(USER.ACTION IS ACTIVE), f(USER.LEVEL >= 10)
const _statementSchema = mongoose.Schema(
  {
    type: { type: String },
    rule: { type: String },
    value: { type: String },
  },
  {
    _id: false,
  }
);

const _badgeSchema = mongoose.Schema(
  {
    name: { type: String },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    hash: {
      type: String,
      // eslint-disable-next-line no-undef
      default: (generateHashBlock = () => {
        // Generate random hash (TODO: pass real eth blockchain hash)
        const hash = uuid.v4();
        return hash;
      }),
    },
    url: { type: String },
    desc: { type: String },
    data: { type: Object },
  },
  {
    _id: true,
    timestamps: true,
  }
);

const _categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String },
    slug: { type: String },
    data: { type: Object },
  },
  {
    _id: true,
    timestamps: true,
  }
);

const _missionSchema = mongoose.Schema(
  {
    name: { type: String },
    title: { type: String },
    hash: {
      type: String,
      default: () => {
        // Generate random hash (TODO: pass real eth blockchain hash)
        const hash = uuid.v4();
        return hash;
      },
    },
    desc: { type: String },
    data: { type: Object },
    statement: [_statementSchema],
    tasks: [
      {
        title: { type: String },
        desc: { type: String },
        goal: { type: String },
        statement: [_statementSchema],
      },
    ],
    gain: [
      {
        type: { type: String },
        value: { type: Number },
        data: { type: Object },
      },
    ],
  },
  {
    _id: true,
    timestamps: true,
  }
);

// const _actionSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     title: { type: String },
//     desc: { type: String },
//     data: { type: Object },
//     statement: [_statementSchema],
//     nextActions: [{ type: Schema.Types.ObjectId, ref: 'Action' }],
//     category: { type: String },
//     type: { type: String },
//   },
//   {
//     _id: true,
//     timestamps: true,
//   }
// );

const gameSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    owners: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    categories: [_categorySchema],
    email: {
      type: String,
      // required: false,
      // unique: true,
      // trim: true,
      // lowercase: true,
      // validate(value) {
      //   if (!validator.isEmail(value)) {
      //     throw new Error('Invalid email');
      //   }
      // },
    },
    desc: {
      type: String,
    },
    badges: [_badgeSchema],
    missions: [_missionSchema],
    players: [_playerSchema],
    settings: _settingsSchema,
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
  const game = await this.findOne({
    email,
    _id: {
      $ne: excludeGameId,
    },
  });
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
  // const game = this;
  next();
});

/**
 * @typedef Game
 */
const Game = mongoose.model('Game', gameSchema);
// const Category = mongoose.model('Category', _categorySchema);
// const Badge = mongoose.model('Badge', _badgeSchema);
// const Mission = mongoose.model('Mission', _missionSchema);
// const Player = mongoose.model('Player', _playerSchema);
// const Settings = mongoose.model('Settings', _settingsSchema);
// const Action = mongoose.model('Action', _actionSchema);

module.exports = Game;
