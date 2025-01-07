import { expect } from "chai"
import { createUserEndpoint, deleteUserEndpoint, getAllUsersEndpoint,getUserEndpoint, updateUserEndpoint } from "../utils/endpoints.js"

describe("API Endpoints", () => {
    describe("User Endpoints", () => {     
        it("Variable getAllUsersEndpoint is '/get/all'", () =>{
            expect(getAllUsersEndpoint).to.equal("/get/all");
        })
    
        it("Variable getUserEndpoint is '/:id'", () =>{
            expect(getUserEndpoint).to.equal("/:id");
        })
    
        it("Variable createUserEndpoint is '/create'", () =>{
            expect(createUserEndpoint).to.equal("/create");
        })
    
        it("Variable deleteUserEndpoint is '/delete/:id'", () =>{
            expect(deleteUserEndpoint).to.equal("/delete/:id");
        })
    
        it("Variable updateUserEndpoint is '/update/:id'", () =>{
            expect(updateUserEndpoint).to.equal("/update/:id");
        })
    });

    describe("Blog Endpoints", () => {

    });
});