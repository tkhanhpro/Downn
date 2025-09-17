document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('down-form');
  const loading = document.getElementById('loading');
  const result = document.getElementById('result');
  const errorDiv = document.getElementById('error');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Theme Toggle
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.textContent = body.classList.contains('dark-mode') ? 'Toggle Light Mode' : 'Toggle Dark Mode';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const link = document.getElementById('link').value.trim();
    if (!link) return;

    loading.classList.remove('hidden');
    result.classList.add('hidden');
    errorDiv.classList.add('hidden');

    try {
      const response = await fetch(`/api/down?url=${encodeURIComponent(link)}`);
      if (!response.ok) {
        throw new Error(await response.json().error);
      }
      const data = await response.json();
      result.textContent = JSON.stringify(data, null, 2);
      result.classList.remove('hidden');
    } catch (error) {
      errorDiv.textContent = error.message || 'Đã xảy ra lỗi!';
      errorDiv.classList.remove('hidden');
    } finally {
      loading.classList.add('hidden');
    }
  });
});
