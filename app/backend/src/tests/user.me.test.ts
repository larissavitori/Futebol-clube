import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { user, emailInvalid, senhaInvalida,
 userRegistrado, role,
 loginValido} from './mock/user.mock';
import JWT from '../../src/middlewares/JWT';
import Validations from '../../src/middlewares/validLogin';

// @ts-ignore

import SequelizeUser from '../../src/database/models/usersModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Test', function() {
  it('sem body, passando um objeto vazio', async function() {
    const { status, body } = await chai.request(app).post('/login')
      .send({});

    expect(status).to.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Passando email invalido', async function() {
    const { status, body } = await chai.request(app).post('/login')
      .send(emailInvalid);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Passando password invalido', async function() {
    const { status, body } = await chai.request(app).post('/login')
      .send(senhaInvalida);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Não passando nada', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(null); // não passo nada null 

    const { status, body } = await chai.request(app)
      .post('/login')
      .send(loginValido);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('retorna o token', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(userRegistrado as any);
    sinon.stub(JWT, 'sign').returns('validToken');
    sinon.stub(Validations, 'validateCampos').returns();

    const { status, body } = await chai.request(app)
      .post('/login')
      .send(loginValido);

    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  });

  it('senha invalida', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves( user as any);
    sinon.stub(JWT, 'sign').returns('validToken');
    sinon.stub(Validations, 'validateLogin').returns();

    const { status, body } = await chai.request(app)
      .post('/login')
      .send(senhaInvalida);

    expect(status).to.equal(401);
    expect(body.message).to.equal('Invalid email or password');
  });
   /* it('testa se retorna um role', async function() {
    sinon.stub(JWT, 'verify').returns('validToken');
    sinon.stub(Validations, 'validateLogin').returns();
    
    const { status, body } = await chai.request(app)
    .get('/login/role')
    .set('authorization', 'token')
    .send(role);

    expect(status).to.equal(200);
    expect(body.message).to.equal(role);
  }); */
  afterEach(sinon.restore);
});
