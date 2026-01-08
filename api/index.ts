import express from "express";
import { createServer } from "http";
import { registerRoutes } from "../server/routes";
import { storage } from "../server/storage";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Permissive CORS for Vercel
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

const httpServer = createServer(app);

let routesRegistered = false;

export default async function handler(req: any, res: any) {
    try {
        if (!routesRegistered) {
            await registerRoutes(httpServer, app);
            routesRegistered = true;
        }
        return app(req, res);
    } catch (err: any) {
        console.error("Vercel Function Error:", err);
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
}
