// Apply the preference before the page paints, including on article pages.
(() => {
  const root = document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  try {
    preference = localStorage.getItem('emerald-theme');
  } catch (_) { /* The toggle also works when browser storage is unavailable. */ }
  if (preference !== 'light' && preference !== 'dark') preference = null;

  function applyTheme(theme) {
    root.dataset.theme = theme;
    document.querySelectorAll('.theme-toggle').forEach(button => {
      const dark = theme === 'dark';
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    });
  }

  applyTheme(preference || (systemTheme.matches ? 'dark' : 'light'));
  systemTheme.addEventListener('change', event => {
    if (!preference) applyTheme(event.matches ? 'dark' : 'light');
  });
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(root.dataset.theme);
    document.querySelectorAll('.theme-toggle').forEach(button => {
      button.addEventListener('click', () => {
        preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(preference);
        try { localStorage.setItem('emerald-theme', preference); } catch (_) { /* Optional persistence. */ }
      });
    });
  });
})();
