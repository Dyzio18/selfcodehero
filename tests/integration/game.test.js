const request = require('supertest');
// const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
// const { User, Game } = require('../../src/models');
// const { userOne, userTwo, admin, insertUsers } = require('../fixtures/user.fixture');
const { gameOne, insertGames } = require('../fixtures/game.fixture');
const { userOneAccessToken } = require('../fixtures/token.fixture');

setupTestDB();

describe('Game routes', () => {
  describe('GET /v1/games', () => {
    test('should return 200 and apply options', async () => {
      await insertGames([gameOne]);

      const res = await request(app)
        .get('/v1/games')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: expect.any(Number),
        totalResults: expect.any(Number),
      });

      expect(res.body.results[0]).toMatchObject({
        id: gameOne._id.toHexString(),
        name: gameOne.name,
        email: gameOne.email,
        owners: expect.any(Array),
        isEmailVerified: gameOne.isEmailVerified,
        desc: gameOne.desc,
        missions: expect.any(Array),
        players: expect.any(Array),
        badges: expect.any(Array),
      });
    });
  });
});
