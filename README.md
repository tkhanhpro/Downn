# Media Downloader API

This project provides a Node.js API to fetch JSON data from supported media links using an external downloader service. It includes a professional frontend interface for easy interaction.

## Features
- Backend API endpoint: `/api/down?url=<media_link>`
- Supports 25+ platforms (e.g., Facebook, Instagram, YouTube, etc.)
- Link validation before API calls
- Professional HTML UI with input form, loading spinner, result display, and dark/light mode toggle
- Responsive design for mobile and desktop

## Installation
1. Clone the repo: `git clone <repo_url>`
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Access the UI at `http://localhost:3000`

## Usage
- Enter a media link in the input field and click "Download Data".
- The API will return JSON data if successful.
- Supported platforms are listed in `url-support.js`.

## API Details
- **GET /api/down?url=<encoded_url>**
  - Returns: JSON data from the downloader API or error message.
  - Example: `http://localhost:3000/api/down?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dexample`

## Dependencies
- Express.js for API server
- Axios for HTTP requests

Note: The API key is hardcoded for demo purposes. In production, use environment variables for security.
