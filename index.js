const express = require('express');
const axios = require('axios');
const { downloadMedia } = require('./src/download');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Existing API Endpoint: GET /api/down?url=<media_link>
app.get('/api/down', async (req, res) => {
  const link = req.query.url;
  if (!link) {
    return res.status(400).json({ error: 'Vui lòng cung cấp link media!' });
  }
  try {
    const encodedUrl = encodeURIComponent(link);
    const encodedApikey = encodeURIComponent('gMIqr8G4z5n');
    const fullApiUrl = `https://api.zm.io.vn/v1/social/autolink?url=${encodedUrl}&apikey=${encodedApikey}`;
    const response = await axios.get(fullApiUrl);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi xử lý yêu cầu!' });
  }
});

// New Download Endpoint: GET /download?url=<media_link>
app.get('/download', async (req, res) => {
  const link = req.query.url;
  if (!link) {
    return res.status(400).json({ error: 'Vui lòng cung cấp link media!' });
  }
  try {
    const result = await downloadMedia(link);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi tải về!' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
