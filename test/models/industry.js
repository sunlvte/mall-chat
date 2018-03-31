
require('../setup');

const industryModel = include('app/models/industry');
const mongoose = require('mongoose');

describe('app/models/industry', function() {
  before(async () => {
    await industryModel.remove();
  });
  after(async () => {
    mongoose.connection.close();
  });
  afterEach(async () => {
  });

  describe('#create()', () => {
    it('create record success', async () => {
      const mock = {
        name: 'name',
        token: 'token',
      };
      const industry = await industryModel.create(mock);

      assert.equal(mock.token, industry.token);
    });
  });

  describe('#find()', () => {
    it('get record by token', async () => {
      const [industry] = await industryModel.find({token: 'token'});

      assert.equal('token', industry.token);
    });
  });

});

