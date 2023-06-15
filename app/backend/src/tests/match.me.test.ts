import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { resultMatch } from './mock/match.mock'
import SequelizeMatch from '../database/models/matchesModel';
chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota macth', () => {
  it('all match', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(resultMatch as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(resultMatch);
  });
});