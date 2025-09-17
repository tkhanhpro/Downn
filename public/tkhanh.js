document.addEventListener('DOMContentLoaded', () => {
  const linkInput = document.getElementById('link');
  const submitBtn = document.getElementById('submit-btn');
  const loading = document.getElementById('loading');
  const resultContainer = document.getElementById('result-container');
  const errorDiv = document.getElementById('error');

  const hdFrame = document.getElementById('hd-frame');
  const sdFrame = document.getElementById('sd-frame');
  const audioFrame = document.getElementById('audio-frame');

  let mediaData = {};

  submitBtn.addEventListener('click', async () => {
    const link = linkInput.value.trim();
    if (!link) return;

    loading.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    errorDiv.classList.add('hidden');

    try {
      const response = await fetch(`/download?url=${encodeURIComponent(link)}`);
      if (!response.ok) throw new Error((await response.json()).error || 'Lỗi không xác định');
      const data = await response.json();
      mediaData = data.data || {}; // Assuming { hd_no_watermark: 'url', sd_no_watermark: 'url', audio: 'url' }

      // Show frames if data exists
      if (mediaData.hd_no_watermark || mediaData.sd_no_watermark || mediaData.audio) {
        resultContainer.classList.remove('hidden');
      } else {
        throw new Error('Không tìm thấy dữ liệu media!');
      }
    } catch (error) {
      errorDiv.textContent = error.message;
      errorDiv.classList.remove('hidden');
    } finally {
      loading.classList.add('hidden');
    }
  });

  // Copy and Download Buttons (Dynamic Event Listeners)
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = e.target.closest('.media-frame').id.split('-')[0];
      const url = mediaData[`${type}_no_watermark`] || mediaData[type]; // hd_no_watermark, sd_no_watermark, audio
      if (url) {
        navigator.clipboard.writeText(url).then(() => alert('Đã sao chép link!'));
      }
    });
  });

  document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = e.target.closest('.media-frame').id.split('-')[0];
      const url = mediaData[`${type}_no_watermark`] || mediaData[type];
      if (url) {
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}.${type === 'audio' ? 'mp3' : 'mp4'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    });
  });
});
