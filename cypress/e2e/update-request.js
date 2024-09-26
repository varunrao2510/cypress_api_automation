/// <reference types = "cypress" />
"use strict";


describe("Update request", () => {
    var titleOfPost = new Array();
    it("Updating existing post via /post api", () => {
        cy.request({
            method: "PUT",
            url: 'http://localhost:3000/posts/9450',
            body: {
                title: "I want to learn automation cypress",
                author: "Varun rao"
            }
        }).then(response => {
            expect(response.status).to.eql(200)
        })
    })
})