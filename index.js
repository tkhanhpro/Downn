const express = require('express');
const axios = require('axios');
const { supportedPlatforms } = require('./src/url-support');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies (if needed for future expansions)
app.use(express.json());
app.use(express.static('public')); // Serve static files from public folder

// API Endpoint: GET /api/down?url=<media_link>
app.get('/api/down', async (req, res) => {
  const link = req.query.url;
  if (!link) {
    return res.status(400).json({ error: 'Vui lòng cung cấp link media!' });
  }

  // Check if link is supported
  const isSupported = supportedPlatforms.some(platform => platform.regex.test(link));
  if (!isSupported) {
    return res.status(400).json({ error: 'Link không được hỗ trợ hoặc không phải từ nền tảng hợp lệ!' });
  }

  const apikey = 'gMIqr8G4z5n';
  const apiUrl = 'https://api.zm.io.vn/v1/social/autolink';

  try {
    const encodedUrl = encodeURIComponent(link);
    const encodedApikey = encodeURIComponent(apikey);
    const fullApiUrl = `${apiUrl}?url=${encodedUrl}&apikey=${encodedApikey}`;

    const response = await axios.get(fullApiUrl);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    let errorMsg = 'Đã xảy ra lỗi khi xử lý yêu cầu!';
    if (error.response) {
      errorMsg += `\nStatus: ${error.response.status}\nData: ${JSON.stringify(error.response.data)}`;
    }
    res.status(500).json({ error: errorMsg });
  }
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
