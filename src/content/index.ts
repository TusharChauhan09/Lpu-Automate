console.log('LPU Wi-Fi Auto Connect: Content script loaded');

let observer: MutationObserver | null = null;
let isProcessing = false;

const attemptLogin = () => {
  if (isProcessing) return;
  
  chrome.storage.local.get(['lpu_username', 'lpu_password', 'lpu_auto_connect_enabled'], (result: { lpu_username?: string; lpu_password?: string; lpu_auto_connect_enabled?: boolean }) => {
    const { lpu_username, lpu_password, lpu_auto_connect_enabled } = result;

    // Default to enabled if undefined
    if (lpu_auto_connect_enabled === false) {
        console.log('LPU Wi-Fi Auto Connect: Disabled by user.');
        return;
    }

    if (!lpu_username || !lpu_password) {
      console.log('LPU Wi-Fi Auto Connect: No credentials found.');
      return;
    }

    // Helper to find element by multiple selectors
    const findElement = (selectors: string[]) => {
      for (const selector of selectors) {
        const el = document.querySelector(selector);
        if (el) return el as HTMLElement;
      }
      return null;
    };

    // Username
    const usernameInput = findElement([
      'input[name="username"]',
      'input[name="user"]',
      'input[placeholder*="User Name"]',
      'input[type="text"]'
    ]) as HTMLInputElement;

    // Password
    const passwordInput = findElement([
      'input[name="password"]',
      'input[type="password"]'
    ]) as HTMLInputElement;

    if (usernameInput && passwordInput) {
      isProcessing = true; // Prevent multiple attempts
      console.log('LPU Wi-Fi Auto Connect: Found inputs, filling...');

      usernameInput.value = lpu_username;
      usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
      usernameInput.dispatchEvent(new Event('change', { bubbles: true }));

      passwordInput.value = lpu_password;
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
      passwordInput.dispatchEvent(new Event('change', { bubbles: true }));

      // Checkbox (Terms)
      const checkbox = findElement([
        'input[type="checkbox"]',
        '.terms-checkbox'
      ]) as HTMLInputElement;

      if (checkbox && !checkbox.checked) {
        checkbox.click();
        if (!checkbox.checked) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }

      // Login Button
      const loginButton = findElement([
        'button[type="submit"]',
        'input[type="submit"]',
        'button.btn-login'
      ]);

      let targetButton = loginButton;
      if (!targetButton) {
          const buttons = Array.from(document.querySelectorAll('button, a.btn'));
          targetButton = buttons.find(b => b.textContent?.toLowerCase().includes('login')) as HTMLElement;
      }

      if (targetButton) {
        console.log('LPU Wi-Fi Auto Connect: Clicking login...');
        targetButton.click();
        
        // Disconnect observer after successful click to avoid loops
        if (observer) observer.disconnect();
      } else {
        console.log('LPU Wi-Fi Auto Connect: Login button not found.');
        isProcessing = false; // Retry allowed if button not found yet
      }
    }
  });
};

// Use MutationObserver for instant reaction
const startObserver = () => {
    const body = document.body;
    if (!body) return;

    observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                attemptLogin();
            }
        }
    });

    observer.observe(body, {
        childList: true,
        subtree: true
    });
    
    // Also try immediately
    attemptLogin();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserver);
} else {
    startObserver();
}
