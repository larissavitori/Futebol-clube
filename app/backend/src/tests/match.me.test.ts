import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { resultMatch, inprogressTrue } from './mock/match.mock'
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
  it('all match True', async function() {
     sinon.stub(SequelizeMatch, 'findAll').resolves(inprogressTrue as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(inprogressTrue);
  });
  afterEach(sinon.restore);
});