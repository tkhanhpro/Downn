document.addEventListener('DOMContentLoaded', () => {
  const linkInput = document.getElementById('link');
  const submitBtn = document.getElementById('submit-btn');
  const mp4Btn = document.querySelector('.mp4');
  const mp3Btn = document.querySelector('.mp3');
  const loading = document.getElementById('loading');
  const result = document.getElementById('result');
  const errorDiv = document.getElementById('error');

  submitBtn.addEventListener('click', async () => {
    const link = linkInput.value.trim();
    if (!link) return;

    loading.classList.remove('hidden');
    result.classList.add('hidden');
    errorDiv.classList.add('hidden');

    try {
      const response = await fetch(`/download?url=${encodeURIComponent(link)}`);
      if (!response.ok) throw new Error(await response.json().error);
      const data = await response.json();
      result.textContent = `Download: ${data.data.mp4.type} or ${data.data.mp3.type}`;
      result.classList.remove('hidden');
    } catch (error) {
      errorDiv.textContent = error.message;
      errorDiv.classList.remove('hidden');
    } finally {
      loading.classList.add('hidden');
    }
  });

  mp4Btn.addEventListener('click', () => {
    const link = linkInput.value.trim();
    if (link) window.location.href = `/download?url=${encodeURIComponent(link)}&format=mp4`;
  });

  mp3Btn.addEventListener('click', () => {
    const link = linkInput.value.trim();
    if (link) window.location.href = `/download?url=${encodeURIComponent(link)}&format=mp3`;
  });
});
