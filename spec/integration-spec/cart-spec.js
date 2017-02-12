const supertest = require('supertest');
const should = require('should');
const app = require('../../app');
const request = supertest(app);

describe('GET /carts', () => {
  it('should be return all carts : GET /carts', (done) => {
    request
      .get('/carts')
      .expect((res) => {
        res.body.cart.length.should.equal(1);
        res.body.totalCount.should.equal(1);
      })
      .expect(200, done)
  });
});

describe('GET /carts/:cartId', () => {
  it('should be return one cart : GET /carts/58a0242c50e7b4dd0072c7e1', (done) => {
    request
      .get('/carts/58a0242c50e7b4dd0072c7e1')
      .expect((res) => {
        res.body._id.should.equal('58a0242c50e7b4dd0072c7e1')
      })
      .expect(200, done)
  });

  it('should be return NOT FOUND : GET /items/5898836601ae3c3ba5c60a6a', (done) => {
    request
      .get('/items/5898836601ae3c3ba5c60a6a')
      .expect(404, done)
  })
});


describe('POST /carts', () => {
  it('should be return 201 and create cart : POST /carts', (done) => {
    request
      .post('/carts')
      .type('application/json')
      .send(  {
          "_id": "5898836601ae3c3ba5c60a6b",
          "userId":"2",
          "items": [
            {
              "item": "5898836601ae3c3ba5c60a7d",
              "count":2
            },
            {
              "item": "5898836601ae3c3ba5c60a7e",
              "count":2
            }],
          "total":16
        }
      )
      .expect((res) => {
        res.body.uri.should.equal('carts/5898836601ae3c3ba5c60a6b')
      })
      .expect(201, done)
  });

  it('should be return 500 : POST /carts', (done) => {
    request
      .post('/carts')
      .type('application/json')
      .send({
          "_id": "58a0242c50e7b4dd0072c7e1",
          "userId":"2",
          "items": [
            {
              "item": "5898836601ae3c3ba5c60a7d",
              "count":2
            },
            {
              "item": "5898836601ae3c3ba5c60a7e",
              "count":2
            }],
          "total":16
        }
      )
      .expect(500, done)
  })
});

describe('DELETE /carts/:cartId', () => {
  it('should return 204 : DELETE /carts/58a0242c50e7b4dd0072c7e1', (done) => {
    request
      .del('/carts/58a0242c50e7b4dd0072c7e1')
      .expect(204, done);
  })

  it('should return 404 : DELETE /items/5898836601ae3c3ba5c60a8a', (done) => {
    request
      .del('/carts/5898836601ae3c3ba5c60a8a')
      .expect(404, done);
  })
});

describe('PUT /carts/:cartId', () => {
  it('should be return 204 : PUT /carts/58a0242c50e7b4dd0072c7e1', (done) => {
    request
      .put('/carts/58a0242c50e7b4dd0072c7e1')
      .type('application/json')
      .send({
          "userId":"2",
          "items": [
            {
              "item": "5898836601ae3c3ba5c60a7d",
              "count":2
            },
            {
              "item": "5898836601ae3c3ba5c60a7e",
              "count":2
            }],
          "total":16
        }
      )
      .expect(204, done)
  });

  it('should be return 404 : PUT /carts/5898836601ae3c3ba5c60a8a', (done) => {
    request
      .put('/items/5898836601ae3c3ba5c60a8a')
      .type('application/json')
      .send({
          "userId":"2",
          "items": [
            {
              "item": "5898836601ae3c3ba5c60a7d",
              "count":2
            },
            {
              "item": "5898836601ae3c3ba5c60a7e",
              "count":2
            }],
          "total":16
        }
      )
      .expect(404, done)
  })
});




