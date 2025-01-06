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
                    res.body.should.be.a('object')
                });
            done();
        });

        it("Get a Single User", (done) => {
            const id = 1;
            chai.request.execute(app)
                .get(`/users/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                });
            done();
        });
    });
});