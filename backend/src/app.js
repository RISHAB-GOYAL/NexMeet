import express from "express";
import { createServer } from "node:http";
import dotenv from "dotenv";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

const port = Number(process.env.PORT) || 8000;

const normalizeOrigins = (value, fallback = []) => {
    const origins = [...fallback].filter((origin) => typeof origin === "string" && origin.trim());

    if (value) {
        origins.push(...value.split(","));
    }

    return [...new Set(origins.map((origin) => origin.trim()).filter(Boolean))];
};

const allowedOrigins = normalizeOrigins(process.env.CORS_ORIGIN, [
    process.env.FRONTEND_URL,
    "http://localhost:3000",
]);

app.set("trust proxy", 1);
app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is required");
    }

    const connectionDb = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB connected: ${connectionDb.connection.host}`);
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
};



start();