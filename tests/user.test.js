import { expect, use } from "chai";
import chaiHttp from "chai-http";

import app from "../app.js";


// Configure chai
const chai = use(chaiHttp);
chai.should();

// Integration Testing

describe("Users", () => {
    describe("GET '/' Request", () => {
        it("Get All Users", (done) => {
            chai.request.execute(app)
                .get('/users/get/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                });
            done();
        });

        it("Get a Single User", (done) => {
            chai.request.execute(app)
                .get(`/users/1`)
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.be.an('object');
                });
            done();
        });
    });

    describe("POST Request - Creating User", () => {
        it("Create a New ShopaBlog User", () => {
            chai.request.execute(app)
                .post('/users/create')
                .end((err, res) => {
                    res.should.have.status(200);
                    // expect()
                })
        })
    })
});