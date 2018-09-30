const request = require('supertest');
const server = require('./index');

describe('Loading Express', () => {
  afterEach(function () {
    server.close();
  });

  it('should return "hi"', (done) => {
    request(server)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      })
  });

  it('should get json', (done) => {
    request(server)
      .get('/msg')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '13')
      .expect(200, done);
  });

  it('should return user object', (done) => {
    request(server)
      .post('/user/signup')
      .send('username=JOHN&password=password')
      .set('Accept', 'application/json')
      // Change the data
      .expect(res => {
        res.body.id = 'the fixed id';
      })
      .expect(200, {
        id: 'the fixed id',
        username: 'john',
        password: 'password'
      }, done);
  });

  it('should send Bad Request 403 for falsy sign up inputs', (done) => {
    request(server)
      .post('/user/signup')
      .send('username=')
      .send('password=null')
      .set('Accept', 'application/json')
      .expect(403, done);
  });

  it('should return 404 for everything else', (done) => {
    request(server)
      .get('/hi')
      .expect(404, done);
  });
});