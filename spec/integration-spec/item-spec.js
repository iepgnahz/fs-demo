const mongoTool = require('../../tool/fixture/mongo-tools');
const supertest = require('supertest');
const should = require('should');
const app = require('../../app');
const request = supertest(app);
beforeEach((done) => {
  console.log('********************')
  mongoTool.refresh(done);
});

describe('GET /items', () => {
  it('should be return all items : GET /items', (done) => {
    request
      .get('/items')
      .set('Accept', 'application/json')
      .expect((res) => {
        res.body.item.length.should.equal(2);
        res.body.totalCount.should.equal(2);
      })
      .expect(200, done)
  });
});

describe('GET /items/:itemId', () => {
  it('should be return one item : GET /items/:itemId', (done) => {
    request
      .get('/items/5898836601ae3c3ba5c60a7d')
      .expect((res) => {
        res.body._id.should.equal('5898836601ae3c3ba5c60a7d');
      })
      .expect(200, done)
  });

  it('should be return NOT FOUND : GET /items/5898836601ae3c3ba5c60a6a', (done) => {
    request
      .get('/items/5898836601ae3c3ba5c60a6a')
      .expect(404, done)
  })
});


describe('POST /items', () => {
  it('should be return 201 and create doc : POST /items', (done) => {
    request
      .post('/items')
      .type('application/json')
      .send({
        "_id": "5898836601ae3c3ba5c60a8a",
        "category": "5899d5a5cf6b306c4a80e2f1", "name": "麻花", "price": 4
      })
      .expect((res) => {
        res.body.uri.should.equal('items/5898836601ae3c3ba5c60a8a')
      })
      .expect(201, done)
  });

  it('should be return 500 : POST /items', (done) => {
    request
      .post('/items')
      .type('application/json')
      .send({
        "_id": "5898836601ae3c3ba5c60a7e",
        "category": "5899d5a5cf6b306c4a80e2f1", "name": "麻花", "price": 4
      })
      .expect(500, done)
  })
});

describe('DELETE /items/:itemId', () => {
  it('should return 204 : DELETE /items/5898836601ae3c3ba5c60a7e', (done) => {
    request
      .del('/items/5898836601ae3c3ba5c60a7e')
      .expect(204, done);
  })

  it('should return 404 : DELETE /items/5898836601ae3c3ba5c60a8a', (done) => {
    request
      .del('/items/5898836601ae3c3ba5c60a8a')
      .expect(404, done);
  })
});

describe('PUT /items/:itemId', () => {
  it('should be return 204 : PUT /items/5898836601ae3c3ba5c60a7e', (done) => {
    request
      .put('/items/5898836601ae3c3ba5c60a7e')
      .type('application/json')
      .send({
        "_id": "5898836601ae3c3ba5c60a7e",
        "category": "5899d5a5cf6b306c4a80e2f1", "name": "芝麻", "price": 2
      })
      .expect(204, done)
  });

  it('should be return 404 : PUT /items/5898836601ae3c3ba5c60a8a', (done) => {
    request
      .put('/items/5898836601ae3c3ba5c60a8a')
      .type('application/json')
      .send({
        "_id": "5898836601ae3c3ba5c60a8a",
        "category": "5899d5a5cf6b306c4a80e2f1", "name": "芝麻", "price": 2
      })
      .expect(404, done)
  })
});




