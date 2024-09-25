/// <reference types = "cypress" />
"use strict";

// const { title } = require("errorhandler");
//const { array, strict } = require("yargs");


describe("Post request", () => {
    var titleOfPost = new Array();
    it("Create a new post via /post api", () => {
        cy.request({
            method: "POST",
            url: 'http://localhost:3000/posts',
            body: {
                title: "I want to learn automation",
                author: "Varun"
            }
        }).then(response => {
            expect(response.status).to.eql(201)
        })
    })

    it("Validate title latest /post api", () => {
        cy.request({
            method: "GET",
            url: 'http://localhost:3000/posts',
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body))
            body.forEach(function (item) {
                titleOfPost.push(item["title"])
            });
        }).then(() => {
            var latestPost = titleOfPost[titleOfPost.length - 1]
            expect(latestPost).to.eql("I want to learn automation")
        })
    })
})