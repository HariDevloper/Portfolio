import express from "express";
import { registerRoutes } from "../server/routes";

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

// Register routes directly to the app
// Note: We pass a mock object for httpServer since registerRoutes expects it but doesn't strictly need it for API logic
registerRoutes({} as any, app).catch(err => {
    console.error("Vercel API Init Error:", err);
});

export default app;
