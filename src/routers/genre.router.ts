import express from "express";
import * as genreController from "../controllers/genre.controller";
import * as cacheMiddleware from "../middlewares/cache.middleware";

const router = express.Router();

router.get("/", cacheMiddleware.cacheMiddleware, genreController.getGenres);

router.get("/:genreId", cacheMiddleware.cacheMiddleware, genreController.getPodcastsByGenre);

export default router;
