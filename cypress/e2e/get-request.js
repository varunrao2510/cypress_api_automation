/// <reference types = "cypress" />

// const { json } = require("body-parser");
// const { response } = require("express");
//const os_tmpdir = require("os-tmpdir");

describe("Get request", () => {
    var results;
    it("Validate status code of /post api", () => {
        results = cy.request('http://localhost:3000/posts')
        results.its("status").should('equal',200)
    })

    it("Validate /post api contains correct keys and values", () => {
        cy.request({
            method: "GET",
            url: 'http://localhost:3000/posts',
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body))
            cy.log(body)
            expect(body[0]).has.property('title', 'json-server')
            
            body.forEach(function(item) {
                expect(item).to.have.all.keys("id","title","author")
            });
        })
    })
})