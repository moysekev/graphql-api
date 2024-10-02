import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import { graphqlHTTP } from "express-graphql";
import { createHandler } from 'graphql-http/lib/use/express';
import schema from "./schema";
import { test } from "./playground";
import { test as test_json } from "./playground_json";

const app = express();

dotenv.config();
// app.use(morgan("common"));

// USE HELMET AND CORS MIDDLEWARES
app.use(
    // cors({
    //     origin: ["*"], // Comma separated list of your urls to access your api. * means allow everything
    //     credentials: true, // Allow cookies to be sent with requests,
    // })
    // Commented out because with this config it misses to provide Access-Control-Allow-Origin header,
    // so i had to simply do :
    cors()
);
// app.use(
//     helmet({
//         contentSecurityPolicy:
//             process.env.NODE_ENV === "production" ? undefined : false,
//     })
// );

app.use(express.json());

// DB CONNECTION

if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL environment variable is not defined");
}

mongoose
    .connect(process.env.MONGODB_URL, { dbName: "graphql-api" })
    .then(() => {
        console.log("MongoDB connected to the backend successfully");
    })
    .catch((err: Error) => console.log(err));

app.all('/graphql', createHandler({ schema }));

// Start backend server
const PORT = process.env.PORT || 8500;
app.listen(PORT, () => {
    console.log(`Backend server is running at port ${PORT}`);
});

test()

test_json()

export default app;
