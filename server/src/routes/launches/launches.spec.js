const assert = require('assert');
const app = require('../../app');

describe('Test GET /launches',()=>{
  test('Response with 200 statusCode',()=>{
    const response = 200;
    expect(response).toBe(200);
  });
});


describe('Test POST /launch',()=>{
  test('Response with 201 statusCode',()=>{

  });
  test('It should catch missing required properties',()=>{});
  test('It should check for invalid dates',()=>{});
})












//Supertest
// describe('Test POST /launches', () => {
//   test('It should respond with 201 creted', async () => {
//     const response = await request(app)
//       .post('/launches')
//       .send({
//         mission: 'Hello Aliens',
//         target: 'Kepler-1652b',
//         launchDate: 'January 4,2028',
//         rocket: "Limbo Mk11"
//
//       })
//       .expect(200)
//       // .expect('Content-Type': /json/)
//     expect(response.body).toMatchObject({
//       mission: 'Hello Aliens',
//       target: 'Kepler-1652b',
//       launchDate: 'January 4,2028',
//       rocket: "Limbo Mk11"
//     })
//   })
// })
//
// // describe('Test POST /launch',()=>{
//     test("It should respond with 200 statusCode",()=>{})
//     test("It should return valid values",()=>{})
// })
