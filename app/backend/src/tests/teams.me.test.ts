import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
//import teamsModel from '../database/models/teamsModel';

// import { Response } from 'superagent';
import { teamId, teams } from './mock/teams.mock'
import SequelizeTeams from '../database/models/teamsModel';
chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota teams', () => {
  it('should return all teams', async function() {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('should return a teams by id', async function() {
    sinon.stub(SequelizeTeams, 'findOne').resolves(teamId as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamId);
  });

  it('should return not found if the teams doesn\'t exists', async function() {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(null);
  
    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(400);
    expect(body.message).to.equal('team 1 not found');
  });
  afterEach(sinon.restore);
});
