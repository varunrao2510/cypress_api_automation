/// <reference types = "cypress" />
"use strict";


describe("Post, Get and Delete comments", () => {
   
    it("Create a new post via /comments api", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3000/comments",
            body: {
                "id": 6,
                "body": "I love india",
                "postId": 6
            }
        }).then(response => {
            expect(response.status).to.eq(201)
        })
    })

    it("Locate and assert new /comments api", () => {
        var comments = new Array()
        cy.request({
            method: "GET",
            url: "http://localhost:3000/comments",
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            expect(response.status).to.eq(200)
            let body = JSON.parse(JSON.stringify(response.body))
            body.forEach(function (item) {
                comments.push(item["body"])
                
            })
        }).then(() => {
            var latestComments = comments[comments.length - 1]
            expect(latestComments).to.eq("I love india")
        })
       
    })

    it("Delete comments via /comments api", () => {
        cy.request({
            method: "DELETE",
            url: "http://localhost:3000/comments/5",
        }).then(response => {
            expect(response.status).to.eq(200)
        })
    })
})