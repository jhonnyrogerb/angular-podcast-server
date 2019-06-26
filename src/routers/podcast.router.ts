import express from "express";
import * as podcastController from "../controllers/podcast.controller";
import * as cacheMiddleware from "../middlewares/cache.middleware";


const router = express.Router();

router.get("/", cacheMiddleware.cacheMiddleware, podcastController.getPodcasts);

router.get("/top/charts", cacheMiddleware.cacheMiddleware, podcastController.getTopPodcasts);

router.get("/:podcastId", cacheMiddleware.cacheMiddleware, podcastController.getPodcastById);

router.get("/:podcastId/feed", cacheMiddleware.cacheMiddleware, podcastController.getPodcastFeed);

export default router;
