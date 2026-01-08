import express from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

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

// Simple diagnostic route
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "API is alive" });
});

// Register all your portfolio routes
registerRoutes(httpServer, app).catch(err => {
    console.error("Route Registration Failed:", err);
});

export default app;
