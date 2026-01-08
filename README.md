# 🏗️ Industrial Portfolio Website

> A modern, industrial-themed portfolio website built with React, Node.js, and TypeScript. Features a cyberpunk aesthetic, 3D visualizations, and a secure contact system.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

- **Industrial & Cyberpunk Theme:** Dark mode, terminal-style typography, and cyan accents.
- **3D Hero Visualization:** Interactive hexagonal network animation built with CSS and SVGs.
- **Project Showcase:** Filterable project cards with tech stack badges and GitHub/Live Demo links.
- **Secure Contact System:** 
  - Direct integration with Gmail using Nodemailer.
  - **Industrial-styled email notifications** sent to the admin.
  - **Automated "Transmission Received" auto-replies** sent to visitors.
- **Responsive Design:** Fully optimized for desktop and mobile devices.

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend:** Node.js, Express
- **Language:** TypeScript
- **Database:** PostgreSQL (via Drizzle ORM)

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/HariDevloper/Portfolio.git
    cd Portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    GMAIL_USER=your-email@gmail.com
    GMAIL_APP_PASSWORD=your-google-app-password
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    The application will start on `http://localhost:5000`.

## 📧 Email Configuration

To enable the contact form functionality:
1.  Go to your [Google Account Security](https://myaccount.google.com/security).
2.  Enable 2-Step Verification.
3.  Generate an **App Password** (search for "App passwords").
4.  Paste the generated 16-character password into your `.env` file.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <sub>Built by <a href="https://github.com/HariDevloper">HariKrishnan</a></sub>
</p>
