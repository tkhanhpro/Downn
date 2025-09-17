const axios = require('axios');
const { supportedPlatforms } = require('./url-support');

async function downloadMedia(link) {
  if (!link) throw new Error('Vui lòng cung cấp link media!');
  const isSupported = supportedPlatforms.some(platform => platform.regex.test(link));
  if (!isSupported) throw new Error('Link không được hỗ trợ!');

  const apikey = 'gMIqr8G4z5n';
  const apiUrl = 'https://api.zm.io.vn/v1/social/autolink';

  try {
    const encodedUrl = encodeURIComponent(link);
    const encodedApikey = encodeURIComponent(apikey);
    const fullApiUrl = `${apiUrl}?url=${encodedUrl}&apikey=${encodedApikey}`;

    const response = await axios.get(fullApiUrl);
    const data = response.data;

    // Simulate download options based on API response
    const downloadOptions = {
      mp4: { url: data.video_url || '', type: 'MP4 Video' },
      mp3: { url: data.audio_url || '', type: 'Audio Only (MP3)' }
    };

    return {
      success: true,
      data: downloadOptions,
      message: 'Tải về thành công!'
    };
  } catch (error) {
    console.error(error);
    throw new Error('Đã xảy ra lỗi khi tải về!');
  }
}

module.exports = { downloadMedia };
