"use strict";

import { Response, Request, NextFunction } from "express";
import rp from "request-promise";
import Parser from "rss-parser";
import { Util } from "../util/util";


export const getPodcasts = async (req: Request, res: Response) => {
    try {
        const {countryCode = "US", term} = req.query;

        const response = await rp.get(`https://itunes.apple.com/search?media=podcast&country=${countryCode}&term=${term}`, {json: true});

        const podcasts = response.results
            .map((podcast: any) => <any>{
                ...podcast,
                id: podcast.collectionId,
                author: podcast.artistName,
                cover: podcast.artworkUrl600,
                title: podcast.collectionName,
                lastUpdate: podcast.releaseDate
            });

        res.status(200).json(podcasts);
    } catch (e) {
        res.status(e.statusCode || 500).json({"error": e.message.toString() || "Internal server error"});
    }
};


export const getTopPodcasts = async (req: Request, res: Response) => {
    try {
        const {countryCode = "US", limit = 20} = req.query;

        const podcasts = await rp.get(`https://rss.itunes.apple.com/api/v1/${countryCode}/podcasts/top-podcasts/all/${limit}/explicit.json`, {json: true});

        res.status(200).json(podcasts);
    } catch (e) {
        res.status(e.statusCode || 500).json({"error": e.message.toString() || "Internal server error"});
    }
};


export const getPodcastById = async (req: Request, res: Response) => {
    try {
        const {podcastId} = req.params;

        if (!podcastId) return res.status(400).json({"error": "invalid podcast id"});

        const response = await rp.get(`https://itunes.apple.com/lookup?id=${podcastId}`, {json: true});

        let podcast = response.results[0];
        podcast = {
            ...podcast,
            id: podcast.collectionId,
            author: podcast.artistName,
            cover: podcast.artworkUrl600,
            title: podcast.collectionName,
            lastUpdate: podcast.releaseDate
        };

        res.status(200).json(podcast);

    } catch (e) {
        res.status(e.statusCode || 500).json({"error": e.message.toString() || "Internal server error"});
    }
};


export const getPodcastFeed = async (req: Request, res: Response) => {
    try {
        const {podcastId} = req.params;

        if (!podcastId) return res.status(400).json({"error": "invalid podcast id"});

        const response = await rp.get(`https://itunes.apple.com/lookup?id=${podcastId}`, {json: true});

        let podcast = response.results[0];
        podcast = {
            ...podcast,
            id: podcast.collectionId,
            author: podcast.artistName,
            cover: podcast.artworkUrl600,
            title: podcast.collectionName,
            lastUpdate: podcast.releaseDate
        };

        const feedStr = await rp.get(`${podcast.feedUrl}?format=xml`);

        const parsedFeed = await new Parser().parseString(feedStr);

        const episodes = parsedFeed.items
            .map(episode => {
                try {
                    return {
                        ...episode,
                        author: podcast.author,
                        src: Util.toHttps(episode.enclosure.url),
                        type: episode.enclosure.type,
                        cover: episode.itunes.image || podcast.cover,
                        description: episode.contentSnippet || episode.content,
                        size: episode.enclosure.length,
                        releaseDate: episode.pubDate,
                        podcastTitle: podcast.title,
                        duration: episode.itunes.duration,
                        podcastId: podcast.id
                    };
                } catch (e) {
                    return undefined;
                }
            }).filter(v => v);

        const feed = {
            ...podcast,
            description: parsedFeed.description,
            episodes
        };

        res.status(200).json(feed);
    } catch (e) {
        res.status(e.statusCode || 500).json({"error": e.message.toString() || "Internal server error"});
    }
};
