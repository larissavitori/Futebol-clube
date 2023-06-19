import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { resultMatch, inprogressTrue, inProgressFalse,creatreturn, token, resultId, macthbody } from './mock/match.mock'
import SequelizeMatch from '../database/models/matchesModel';
chai.use(chaiHttp);
import JWT from '../../src/middlewares/JWT';
import Validations from '../../src/middlewares/validLogin';
import SequelizeUsers from '../database/models/usersModel';
import { userRegistrado} from './mock/user.mock';

const { expect } = chai;

describe('testando a rota macth', () => {
  it('all match', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(resultMatch as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(resultMatch);
  });
  it('all match inprogress True', async function() {
     sinon.stub(SequelizeMatch, 'findAll').resolves(inprogressTrue as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(inprogressTrue);
  });
  it('all match inprogress false', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(inProgressFalse as any);

   const { status, body } = await chai.request(app).get('/matches?inProgress=true');

   expect(status).to.equal(200);
   expect(body).to.deep.equal(inProgressFalse);
 });
  it('testa a função create', async () => {
  const userMock = SequelizeMatch.build(creatreturn)
  sinon.stub(SequelizeUsers, 'findOne').resolves(userRegistrado as any);
  sinon.stub(JWT, 'verify').returns(userRegistrado);
  sinon.stub(SequelizeMatch, 'create').resolves(userMock as any);

    const { status, body } = await chai.request(app).post('/matches')
      .set('Authorization', token) 
      .send(creatreturn);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(creatreturn);
}) 
it('testa a função create', async () => {
  const userMock = SequelizeMatch.build(creatreturn)
  sinon.stub(SequelizeUsers, 'findOne').resolves(userRegistrado as any);
  sinon.stub(JWT, 'verify').returns(userRegistrado);
  sinon.stub(SequelizeMatch, 'create').resolves(userMock as any);

    const { status, body } = await chai.request(app).post('/matches')
      .set('Authorization', token) 
      .send(creatreturn);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(creatreturn);
}) 
it('testa a função create retorna um erro', async () => {
  sinon.stub(SequelizeUsers, 'findOne').resolves(userRegistrado as any);
  sinon.stub(JWT, 'verify').returns(userRegistrado);
  sinon.stub(SequelizeMatch, 'create').resolves();

    const { status, body } = await chai.request(app).post('/matches')
      .set('Authorization', token) 
      .send({
        "homeTeamId": 1666,
        "awayTeamId": 8, 
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      });

    expect(status).to.equal(404);
    expect(body).to.deep.equal({message: 'There is no team with such id!'});
}) 
it('testa a função getMatchById', async () => {
  sinon.stub(SequelizeUsers, 'findOne').resolves(userRegistrado as any);
  sinon.stub(JWT, 'verify').returns(userRegistrado);
  sinon.stub(SequelizeMatch, 'findAll').resolves(macthbody as any);

    const { status, body } = await chai.request(app).patch('/matches/1')
      .set('Authorization', token) 
      .send(macthbody);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(resultId);
}) 
it('testa a função update', async () => {
  sinon.stub(SequelizeUsers, 'findOne').resolves(userRegistrado as any);
  sinon.stub(JWT, 'verify').returns(userRegistrado);
  sinon.stub(SequelizeMatch, 'findAll').resolves();

    const { status, body } = await chai.request(app).patch('/matches/1/finish')
      .set('Authorization', token) 
      .send({
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      });

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ "message": "Finished" });
}) 
  afterEach(sinon.restore);
});