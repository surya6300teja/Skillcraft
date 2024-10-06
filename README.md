# Resume Skill Craft

This project is a full-stack web application that helps users analyze their resume by identifying key skills, providing recommendations, and fetching relevant courses. The frontend is built using **React (Vite)**, and the backend is powered by **Node.js** and **Express**, integrated with the **Google Generative AI** API.

## Features

- **Upload Resume**: Users can upload PDF resumes.
- **AI-Powered Resume Analysis**: The backend processes the resume, extracts relevant information, and uses Google Generative AI to analyze and provide skill recommendations.
- **Fetch Courses**: Based on the recommended skills, the app fetches courses and provides suggestions to improve the resume score.

## Tech Stack

### Frontend
- React (Vite)
- JavaScript (ES6+)
- Axios (for API requests)

### Backend
- Node.js
- Express
- Multer (for file uploads)
- pdf-parse (for PDF parsing)
- Google Generative AI API

## Project Structure

```bash
/my-project
  ├── /client       # React frontend using Vite
  ├── /server       # Node.js backend (Express)
  ├── /api          # (optional) if you have a separate API folder
  ├── package.json  # Backend package.json
  ├── vercel.json   # Vercel configuration file
  ├── README.md     # Project documentation

Prerequisites
Ensure you have the following installed on your machine:

Node.js (v14+)
npm (or yarn)
