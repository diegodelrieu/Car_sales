import chai from 'chai';
import chaiHttp from 'chai-http';

const app = "http://localhost:3001" 

chai.use(chaiHttp);

chai.should();
describe("Cars", () => {
    describe("GET /api/cars", () => {
        it("should get all the cars", (done) => {
             chai.request(app)
                 .get('/api/cars')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.an('array');
                     done();
                  });
        });
    });
    describe("GET /api/cars/mileage", () => {
        it("should return the mileage", (done) => {
             const brand = 'Peugeot';
             chai.request(app)
                 .get(`/api/mileage?brand=${brand}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.an('array');
                     done();
                  });
         });
         it("should not return unknown brands or invalid inputs", (done) => {
           const brand = "Mercedes";
           chai.request(app)
           .get(`/api/mileage?brand=${brand}`)
           .end((err, res) => {
             res.should.have.status(404);
             done();
            });
          });
    });
    describe("GET /api/cars/sales", () => {
        it("should return all sales when no date is given", (done) => {
          chai.request(app)
              .get(`/api/cars/sales`)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                done();
               });

         });

        it("should return all specified sales when a specific date is given", (done) => {
          const date = "2017-01-20";
          chai.request(app)
              .get(`/api/cars/sales?date='${date}'`)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                res.body.should.have.lengthOf(9);
                done();
               });
         });
    });
});