import "express-async-errors"

import express from "express";
import cors from "cors";
import prisma from "../database/prisma";
import routes from "./routes";
import errorHandler from "./errors/error-handler";

prisma.$connect();

const app = express();

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
    });

app.use(express.json());

app.use(routes);

app.use(errorHandler);

prisma.user.findMany().then(res => console.log(res));

const PORT = process.env.PORT || "3333";
app.listen(PORT, () => {
    console.log("Server listen on http://localhost:" + PORT);
})

