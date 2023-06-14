const user = {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      // senha: secret_admin
  }
const loginValido = { email: 'admin@admin.com', password: 'secret_admin' };
const senhaInvalida = { email: 'test@email.com', password: '123' };
const emailInvalid = { email: 'test_', password: '123456' };
const userRegistrado = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };

export {
    user,
    emailInvalid,
    senhaInvalida,
    loginValido,
    userRegistrado,
  };