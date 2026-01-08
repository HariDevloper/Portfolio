import express from "express";
import { z } from "zod";

const app = express();
app.use(express.json());

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

// DATA (Hardcoded for maximum stability on Vercel)
const portfolioData = {
    profile: {
        id: 1,
        name: "HariKrishnan",
        title: "Aspiring Developer",
        summary: "Motivated and adaptable aspiring engineer seeking opportunities in development and analysis. Experienced in building practical solutions across software, web, and data workflows, with a strong focus on clean execution, problem-solving, and continuous learning. Eager to contribute to real-world projects and support team objectives through a proactive and detail-driven approach.",
        email: "Harikrishnan10125@gmail.com",
        phone: "+91 9597937366",
        location: "Thiruvarur, Tamilnadu, India"
    },
    education: [
        {
            id: 1,
            degree: "B.Tech. Artificial Intelligence and Data Science",
            school: "Sir Issac Newton College of Engineering and Technology",
            location: "Nagapattinam, Tamilnadu, India",
            year: "2022-2026"
        },
        {
            id: 2,
            degree: "Higher Secondary Education",
            school: "Government Higher Secondary School, Pudur",
            location: "Thiruvarur, Tamilnadu, India",
            year: "2020-2022"
        }
    ],
    skills: [
        { id: 1, category: "Programming Languages", items: "Python, Java, SQL, C" },
        { id: 2, category: "Operating Systems", items: "Linux OS, Windows OS" },
        { id: 3, category: "Frameworks & Tools", items: "Flask, Streamlit, Git, Jupyter Notebook, Postgresql, Firebase, Spring Boot, Jhipster, React, MongoDB, Flutter Development" },
        { id: 4, category: "SEO & Analytics", items: "Google Analytics, Screaming Frog, Semrush" },
        { id: 5, category: "Data Visualization", items: "Power BI, Matplotlib, Seaborn, Excel, Numpy, Pandas" },
        { id: 6, category: "AI Tools", items: "Copilot, Cursor, Windsurf, Google Anti-Gravity" },
        { id: 7, category: "Methodologies", items: "SDLC, OOP, Data Structures & Algorithms" }
    ],
    projects: [
        {
            id: 1,
            title: "Portfolio Website",
            description: "A modern, industrial-themed portfolio website built with React and Node.js.",
            techStack: "React, Node.js, Tailwind CSS, Postgres",
            link: "https://github.com/Harikrishnan10125"
        },
        {
            id: 2,
            title: "AI Analysis Tool",
            description: "Data analysis tool using Python and Pandas for processing large datasets.",
            techStack: "Python, Pandas, Matplotlib",
            link: "#"
        }
    ]
};

// ENDPOINTS
app.get("/api/health", (req, res) => res.json({ status: "ok", mode: "monolith" }));

app.get("/api/profile", (req, res) => res.json(portfolioData.profile));

app.get("/api/education", (req, res) => res.json(portfolioData.education));

app.get("/api/skills", (req, res) => res.json(portfolioData.skills));

app.get("/api/projects", (req, res) => res.json(portfolioData.projects));

app.post("/api/contact", async (req, res) => {
    // Simple success response for contact form to keep this file clean
    console.log("Contact form payload received:", req.body);
    res.status(201).json({ success: true });
});

export default app;
