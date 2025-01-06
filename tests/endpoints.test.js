import { expect } from "chai"
import { createUserEndpoint, getAllUsersEndpoint,getUserEndpoint } from "../utils/endpoints.js"

describe("API Endpoints", () => {
    it("Variable getAllUsersEndpoint is '/get/all'", () =>{
        expect(getAllUsersEndpoint).to.equal("/get/all");
    })

    it("Variable getUserEndpoint is '/:id'", () =>{
        expect(getUserEndpoint).to.equal("/:id");
    })

    it("Variable createUserEndpoint is '/create'", () =>{
        expect(createUserEndpoint).to.equal("/create");
    })
});