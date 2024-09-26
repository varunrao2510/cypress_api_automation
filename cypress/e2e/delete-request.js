/// <reference types = "cypress" />
"use strict";


describe("Delete request", () => {
    var titleOfPost = new Array();
    it("Deleting existing post via /post api", () => {
        cy.request({
            method: "DELETE",
            url: 'http://localhost:3000/posts/1b1c',
            body: {
                title: "I want to learn automation cypress",
                author: "Varun rao"
            }
        }).then(response => {
            expect(response.status).to.eql(200)
        })
    })
})