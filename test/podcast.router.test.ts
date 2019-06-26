import request from "supertest";
import app from "../src/app";

describe("GET /podcast", function () {
    this.timeout(15000);

    it("should return 200 OK", () => {
        return request(app).get("/podcast")
            .expect(200);
    });
});


describe("GET /podcast/top/charts", function () {
    this.timeout(15000);

    it("should return 200 OK", () => {
        return request(app).get("/podcast/top/charts")
            .expect(200);
    });
});


describe("GET /podcast/:podcastId", function () {
    this.timeout(15000);

    it("should return 200 OK", () => {
        return request(app).get("/podcast/201671138")
            .expect(200);
    });
});


describe("GET /podcast/:podcastId/feed", function () {
    this.timeout(15000);

    it("should return 200 OK", () => {
        return request(app).get("/podcast/201671138/feed")
            .expect(200);
    });
});
