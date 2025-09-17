document.addEventListener('DOMContentLoaded', () => {
  const linkInput = document.getElementById('link');
  const submitBtn = document.getElementById('submit-btn');
  const loading = document.getElementById('loading');
  const resultContainer = document.getElementById('result-container');
  const errorDiv = document.getElementById('error');

  let mediaData = {};

  submitBtn.addEventListener('click', async () => {
    const link = linkInput.value.trim();
    if (!link) return;

    loading.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    errorDiv.classList.add('hidden');
    resultContainer.innerHTML = ''; // Clear previous frames

    try {
      const response = await fetch(`/download?url=${encodeURIComponent(link)}`);
      if (!response.ok) throw new Error((await response.json()).error || 'Lỗi không xác định');
      const data = await response.json();
      mediaData = data.data || {}; // Assuming { hd_no_watermark: 'url', sd_no_watermark: 'url', audio: 'url' }

      // Dynamically create frames only if data exists
      const types = [
        { id: 'hd', title: 'HD No Watermark', key: 'hd_no_watermark', ext: 'mp4' },
        { id: 'sd', title: 'SD No Watermark', key: 'sd_no_watermark', ext: 'mp4' },
        { id: 'audio', title: 'Audio Only', key: 'audio', ext: 'mp3' }
      ];

      types.forEach(type => {
        const url = mediaData[type.key];
        if (url) {
          const frame = document.createElement('div');
          frame.className = 'media-frame';
          frame.id = `${type.id}-frame`;
          frame.innerHTML = `
            <h3>${type.title}</h3>
            <button class="copy-btn">Copy Link</button>
            <button class="download-btn">Tải Về</button>
          `;
          resultContainer.appendChild(frame);

          // Add event listeners
          frame.querySelector('.copy-btn').addEventListener('click', () => {
            navigator.clipboard.writeText(url).then(() => alert('Đã sao chép link!'));
          });

          frame.querySelector('.download-btn').addEventListener('click', async () => {
            try {
              const res = await fetch(url);
              if (!res.ok) throw new Error('Failed to fetch media');
              const blob = await res.blob();
              const objectUrl = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = objectUrl;
              a.download = `${type.id}.${type.ext}`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(objectUrl);
            } catch (err) {
              alert('Lỗi tải về: ' + err.message);
            }
          });
        }
      });

      if (resultContainer.children.length > 0) {
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
});
