# INST377 Final Project
Kevin Pham
INST377
Anmol Dash
5/17/25

## Project Title
**Anime of the Day** — This website is an anime recommendation website that lets you explore different anime based on your favorite genre. 

## Project Description
**Anime of the Day** is a website that targets anime fans to easily discover new shows based on their preferred genre. Users are able to receive tailored recommendations using the Jikan API, anime rating scores are visualized through Chart.js,and faovrite anime can be saved using Supabase. 

## Target Browsers and Devices
- **Browsers:** Chrome, Firefox, Safari, Microsoft Edge
- **Mobile:** iOS, Safari, and Android Chrome
- **Desktop:** Windows and macOS

## Developer Manual
Below is the full developer manual on how to install and run everything.

---

# Developer Manual

> Audience: Future developers who will maintain or expand this web application.

## System Requirements

- **Node.js** 
- **npm**
- **Supabase account** (set up your own project and get API keys)
- A browser with JavaScript enabled
- **Vercel Deployment** inst377-final-project-3uf3ml0lj-kevin-phams-projects-d7ae3ed.vercel.app

---

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/anime-of-the-day.git
   cd anime-of-the-day

2. Install backend
   ```npm install

3. Create a .env file in the root with Supabase credentials
   ```SUPABASE_URL=https://your-project.supabase.co
      SUPABASE_KEY=your-anon-or-service-role-key

4. To run locally
   ```npm start

   Make sure HTML, JavaScript, and CSS are under the directory "client/"

   Then open browser and navigate to
   http://localhost:3000/recommend.html

5. Bugs

   Problem 1: CORS Policy Blocked file:///
   You're trying to fetch data from a local file system using this URL:

   perl
   Copy
   Edit
   file:///C:/api/anime
   But browsers block fetch requests to file:// URLs for security reasons. That's what this part of the error means:

   Cross origin requests are only supported for protocol schemes: chrome, chrome-extension, chrome-untrusted, data, http, https, isolated-app.

   Problem 2: TypeError: Failed to fetch
   Because the browser blocks that file:/// request, your JavaScript fetch call fails, resulting in this:

   js
   Copy
   Edit
   TypeError: Failed to fetch
   This is a consequence of the CORS issue.

   🛠️ How to Fix This
   You must run your app from a local server — not by opening the .html file directly. Here's how:

   Option 1: Use VS Code with Live Server
   Open your project in VS Code.

   Install the Live Server extension if you haven’t already.

   Right-click on recommend.html and select "Open with Live Server".

   Your site will open at something like:

   arduino
   Copy
   Edit
   http://127.0.0.1:5500/recommend.html
   Now your fetch URLs like /api/anime will resolve correctly.

   Option 2: Use Node.js/Express
   If you're already using Node and Express (as your backend), make sure your frontend files are served using Express:

   js
   Copy
   Edit
   // server.js or index.js
   const express = require('express');
   const app = express();
   const path = require('path');

   app.use(express.static('public')); // serve your frontend
   app.use('/api/anime', require('./routes/animeRoute.js')); // your API route

   app.listen(3000, () => console.log('Server running at http://localhost:3000'));
   Then open:

   bash
   Copy
   Edit
   http://localhost:3000/recommend.html
