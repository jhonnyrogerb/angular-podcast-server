import request from "supertest";
import app from "../src/app";


describe("GET /genre", function () {
    this.timeout(15000);

    it("should return 200 OK", () => {
        return request(app).get("/genre")
            .expect(200);
    });
});


describe("GET /genre/:genreId", function () {
    this.timeout(15000);

    it("should return 200 OK", () => {
        return request(app).get("/genre/13014")
            .expect(200);
    });
});
