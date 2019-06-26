"use strict";

import { Response, Request, NextFunction } from "express";
import rp from "request-promise";


export const getGenres = async (req: Request, res: Response) => {
    try {
        const response = await rp.get("https://itunes.apple.com/WebObjects/MZStoreServices.woa/ws/genres?id=26", {json: true});

        const subGenres = response["26"].subgenres;
        const genres = Object.keys(subGenres).map(key => ({id: subGenres[key].id, name: subGenres[key].name}));

        res.status(200).json(genres);
    } catch (e) {
        res.status(e.statusCode || 500).json({"error": e.message.toString() || "Internal server error"});
    }
};


export const getPodcastsByGenre = async (req: Request, res: Response) => {
    try {
        const {countryCode = "US", limit = 100} = req.query;
        const {genreId} = req.params;

        if (!genreId) return res.status(400).json({"error": "invalid genre id"});

        const podcasts = await rp.get(`https://itunes.apple.com/search?media=podcast&country=${countryCode}&term=podcast&genreId=${genreId}&limit=${limit}`, {json: true});

        res.status(200).json(podcasts);
    } catch (e) {
        res.status(e.statusCode || 500).json({"error": e.message.toString() || "Internal server error"});
    }
};
