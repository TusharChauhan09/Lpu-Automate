# LPU Wi-Fi Auto Connect Extension

A Chrome Extension designed to automate the login process for Lovely Professional University (LPU) Wi-Fi. It securely saves your credentials and automatically logs you in whenever the captive portal page is detected, saving you time and hassle.

## Features

-   **Auto-Login**: Instantly fills username/password, checks "I Agree", and submits the form on `10.10.0.1` or `internet.lpu.in`.
-   **Instant Reaction**: Uses `MutationObserver` to detect the login form the moment it appears in the DOM.
-   **Secure Storage**: Saves credentials locally using `chrome.storage.local`.
-   **Global Dark Mode**: Includes a toggle to apply a dark mode filter to **all websites** you visit.
-   **Modern UI**: Clean, icon-based interface built with React and Tailwind CSS.
-   **Toggle Switch**: Easily enable or disable the auto-connect feature.

## Tech Stack

-   **React**: UI Framework.
-   **Vite**: Build tool.
-   **CRXJS**: Vite plugin for Chrome Extension development.
-   **Tailwind CSS**: Styling.
-   **Tabler Icons**: Iconography.
-   **TypeScript**: Type safety.

## Installation

1.  **Build the Project**:
    Ensure you have Node.js installed, then run:
    ```bash
    npm install
    npm run build
    ```

2.  **Load in Chrome**:
    - Open Chrome and navigate to `chrome://extensions`.
    - Enable **Developer mode** (toggle in the top right).
    - Click **Load unpacked**.
    - Select the `dist` folder located in your project directory.

## Usage

1.  **Setup Credentials**:
    - Click the extension icon in your browser toolbar.
    - Enter your **Registration Number** (User Icon) and **Password** (Lock Icon).
    - Click the **Update** button (Floppy Disk Icon).

2.  **Auto-Connect**:
    - Connect to the LPU Wi-Fi network.
    - When the login page opens, the extension will automatically log you in.

3.  **Global Dark Mode**:
    - Click the **Moon/Sun** icon in the extension popup to toggle dark mode for all websites.
    - **Note**: If a site looks broken, you can quickly toggle this off.

4.  **Disable Extension**:
    - Click the **Power** button (Green = On, Red = Off) to temporarily disable auto-login.

## Troubleshooting

-   **Extension Disabled?**: If Chrome disables the extension due to permission changes (e.g., adding Global Dark Mode), go to `chrome://extensions` and re-enable it.
-   **Not Working?**: Ensure you are on the correct login URL (`10.10.0.1`).
