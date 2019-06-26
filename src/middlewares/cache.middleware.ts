import { Response, Request, NextFunction } from "express";
import cache from "memory-cache";

const memCache = new cache.Cache();

export const cacheMiddleware = (req: Request, res: any, next: NextFunction) => {
    const key = "__express__" + req.originalUrl || req.url;

    const cacheContent = memCache.get(key);

    if (cacheContent) {
        res.json(cacheContent);
        return;
    } else {
        res._json = res.json;
        res.json = (body: any) => {
            memCache.put(key, body, 3600 * 1000);
            res._json(body);
        };
        next();
    }
};

