const supertest = require('supertest');
const should = require('should');
const app = require('../../app');
const request = supertest(app);

describe('GET /categories', () => {
  it('should be return all categories : GET /categories', (done) => {
    request
      .get('/categories')
      .set('Accept', 'application/json')
      .expect((res) => {
        res.body.category.length.should.equal(3);
        res.body.totalCount.should.equal(3);
      })
      .expect(200, done)
  });
});

describe('GET /categories/:categoryId', () => {
  it('should be return one category : GET /categories/:categoryId', (done) => {
    request
      .get('/categories/5899d5a5cf6b306c4a80e2f1')
      .expect((res) => {
        res.body._id.should.equal('5899d5a5cf6b306c4a80e2f1');
      })
      .expect(200, done)
  });

  it('should be return NOT FOUND : GET /items/5899d5a5cf6b306c4a80e2f8', (done) => {
    request
      .get('/items/5899d5a5cf6b306c4a80e2f8')
      .expect(404, done)
  })
});


describe('POST /categories', () => {
  it('should be return 201 and create category : POST /categories', (done) => {
    request
      .post('/categories')
      .type('application/json')
      .send({"_id":"5899d5a5cf6b306c4a80e2f4","name":"工具"})
      .expect((res) => {
        res.body.uri.should.equal('categories/5899d5a5cf6b306c4a80e2f4')
      })
      .expect(201, done)
  });

  it('should be return 500 : POST /categories', (done) => {
    request
      .post('/categories')
      .type('application/json')
      .send({"_id":"5899d5a5cf6b306c4a80e2f1","name":"工具"})
      .expect(500, done)
  })
});

describe('DELETE /categories/:categoryId', () => {
  it('should return 400 : DELETE /categories/5899d5a5cf6b306c4a80e2f1', (done) => {
    request
      .del('/categories/5899d5a5cf6b306c4a80e2f1')
      .expect(400, done);
  });

  it('should return 204 : DELETE /categories/5899d5a5cf6b306c4a80e2f2', (done) => {
    request
      .del('/categories/5899d5a5cf6b306c4a80e2f2')
      .expect(204, done);
  });

  it('should return 404 : DELETE /categories/5899d5a5cf6b306c4a80e2f4', (done) => {
    request
      .del('/categories/5899d5a5cf6b306c4a80e2f4')
      .expect(404, done);
  })
});

describe('PUT /categories/:categoryId', () => {
  it('should be return 204 : PUT /categories/5899d5a5cf6b306c4a80e2f1', (done) => {
    request
      .put('/categories/5899d5a5cf6b306c4a80e2f1')
      .type('application/json')
      .send({
        name:'水果'
      })
      .expect(204, done)
  });

  it('should be return 404 : PUT /categories/5899d5a5cf6b306c4a80e2f8', (done) => {
    request
      .put('/categories/5899d5a5cf6b306c4a80e2f8')
      .type('application/json')
      .send({
        name:"水果"
      })
      .expect(404, done)
  });

  it('should be return 500 : PUT /categories/5899d5a5cf6b306c4a80e2f1', (done) => {
    request
      .put('/categories/5899d5a5cf6b306c4a80e2f1')
      .type('application/json')
      .send({
        name:"水果",
        _id:"5899d5a5cf6b306c4a80e2f8"
      })
      .expect(500, done)
  })
});





