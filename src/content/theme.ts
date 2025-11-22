console.log('LPU Wi-Fi Auto Connect: Theme script loaded');

const applyTheme = () => {
  chrome.storage.local.get(['lpu_global_dark_mode'], (result) => {
    const isDarkMode = result.lpu_global_dark_mode;
    
    if (isDarkMode) {
      // Simple but effective global dark mode filter
      const style = document.createElement('style');
      style.id = 'lpu-global-dark-mode';
      style.textContent = `
        html { 
          filter: invert(1) hue-rotate(180deg) !important; 
          background-color: #111 !important;
        }
        img, video, iframe, canvas, svg { 
          filter: invert(1) hue-rotate(180deg) !important; 
        }
      `;
      if (!document.getElementById('lpu-global-dark-mode')) {
        document.head.appendChild(style);
      }
    } else {
      const style = document.getElementById('lpu-global-dark-mode');
      if (style) style.remove();
    }
  });
};

// Listen for changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.lpu_global_dark_mode) {
    applyTheme();
  }
});

// Apply on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTheme);
} else {
    applyTheme();
}
