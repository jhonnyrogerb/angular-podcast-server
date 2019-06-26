import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import lusca from "lusca";
import dotenv from "dotenv";
import expressValidator from "express-validator";
import cors  from "cors";


dotenv.config({ path: ".env.example" });

const app = express();
app.use(cors());
app.use(express.json());
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

import podcast from "./routers/podcast.router";
import genre from "./routers/genre.router";

app.use("/podcast", podcast);
app.use("/genre", genre);


export default app;
