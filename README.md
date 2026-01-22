<div align="center">

# 🌐 LPU Wi-Fi Auto Connect

### Seamless Wi-Fi Authentication for Lovely Professional University

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br/>

**Tired of manually logging into LPU Wi-Fi every time?** This Chrome Extension automatically detects the captive portal and logs you in instantly — saving you time and hassle!

</div>

---

## ✨ Features

| Feature                  | Description                                                               |
| ------------------------ | ------------------------------------------------------------------------- |
| 🚀 **Auto-Login**        | Instantly fills username/password, checks "I Agree", and submits the form |
| ⚡ **Instant Detection** | Uses `MutationObserver` to detect the login form the moment it appears    |
| 🔒 **Secure Storage**    | Credentials stored locally using `chrome.storage.local`                   |
| 🌙 **Global Dark Mode**  | Apply a dark mode filter to **all websites** you visit                    |
| 🎨 **Modern UI**         | Clean, icon-based interface with smooth animations                        |
| 🔘 **Toggle Control**    | Easily enable/disable auto-connect with one click                         |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CHROME BROWSER                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────┐         ┌─────────────────────────────┐  │
│  │   Extension Popup    │         │      Content Scripts        │  │
│  │   ┌──────────────┐   │         │  ┌────────────────────────┐ │  │
│  │   │   App.tsx    │   │         │  │     index.ts           │ │  │
│  │   │  ┌────────┐  │   │         │  │  ┌──────────────────┐  │ │  │
│  │   │  │ React  │  │   │         │  │  │ MutationObserver │  │ │  │
│  │   │  │   UI   │  │   │         │  │  │   + Auto-Login   │  │ │  │
│  │   │  └────────┘  │   │         │  │  └──────────────────┘  │ │  │
│  │   └──────────────┘   │         │  └────────────────────────┘ │  │
│  │          │           │         │             │               │  │
│  │          │           │         │  ┌────────────────────────┐ │  │
│  │          │           │         │  │     theme.ts           │ │  │
│  │          │           │         │  │  ┌──────────────────┐  │ │  │
│  │          │           │         │  │  │ Global Dark Mode │  │ │  │
│  │          │           │         │  │  └──────────────────┘  │ │  │
│  │          │           │         │  └────────────────────────┘ │  │
│  └──────────┼───────────┘         └────────────┼────────────────┘  │
│             │                                  │                    │
│             └──────────┬───────────────────────┘                    │
│                        │                                            │
│             ┌──────────▼──────────┐                                 │
│             │  chrome.storage     │                                 │
│             │      .local         │                                 │
│             │  ┌───────────────┐  │                                 │
│             │  │ lpu_username  │  │                                 │
│             │  │ lpu_password  │  │                                 │
│             │  │ lpu_enabled   │  │                                 │
│             │  │ lpu_darkmode  │  │                                 │
│             │  └───────────────┘  │                                 │
│             └─────────────────────┘                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 How It Works

```
┌─────────────────────────────────────────────────────────────────────┐
│                        AUTO-LOGIN FLOW                              │
└─────────────────────────────────────────────────────────────────────┘

  ┌─────────────┐    ┌──────────────────┐    ┌─────────────────────┐
  │   User      │    │   Connect to     │    │  Captive Portal     │
  │  Connects   │───▶│   LPU Wi-Fi      │───▶│  Page Opens         │
  │  to Wi-Fi   │    │                  │    │  (10.10.0.1)        │
  └─────────────┘    └──────────────────┘    └──────────┬──────────┘
                                                        │
                                                        ▼
  ┌─────────────────────────────────────────────────────────────────┐
  │                    CONTENT SCRIPT ACTIVATES                     │
  │  ┌────────────────────────────────────────────────────────────┐ │
  │  │  MutationObserver monitors DOM for login form elements     │ │
  │  └────────────────────────────────────────────────────────────┘ │
  └─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
  ┌─────────────────────────────────────────────────────────────────┐
  │                    CREDENTIAL RETRIEVAL                         │
  │  ┌────────────────────────────────────────────────────────────┐ │
  │  │  chrome.storage.local.get() fetches saved credentials      │ │
  │  └────────────────────────────────────────────────────────────┘ │
  └─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
  ┌─────────────────────────────────────────────────────────────────┐
  │                    AUTO-FILL & SUBMIT                           │
  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────────┐   │
  │  │ Fill Username │─▶│ Fill Password │─▶│ Check Terms Box   │   │
  │  └───────────────┘  └───────────────┘  └─────────┬─────────┘   │
  │                                                   │             │
  │                                                   ▼             │
  │                                        ┌───────────────────┐   │
  │                                        │  Click Login Btn  │   │
  │                                        └───────────────────┘   │
  └─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
                      ┌─────────────────────┐
                      │   ✅ LOGGED IN!     │
                      │   Internet Access   │
                      │   Granted           │
                      └─────────────────────┘
```

---

## 📁 Project Structure

```
lpu-automate/
├── 📄 manifest.json          # Chrome Extension manifest (v3)
├── 📄 package.json           # Dependencies & scripts
├── 📄 vite.config.ts         # Vite + CRXJS configuration
├── 📄 tsconfig.json          # TypeScript configuration
├── 📄 index.html             # Extension popup HTML entry
│
├── 📂 src/
│   ├── 📄 main.tsx           # React entry point
│   ├── 📄 App.tsx            # Main popup UI component
│   ├── 📄 App.css            # Component styles
│   ├── 📄 index.css          # Global styles (Tailwind)
│   │
│   ├── 📂 content/
│   │   ├── 📄 index.ts       # Auto-login content script
│   │   │                      # → Runs on: 10.10.0.1, internet.lpu.in
│   │   │
│   │   └── 📄 theme.ts       # Global dark mode content script
│   │                          # → Runs on: All websites
│   │
│   └── 📂 assets/            # Static assets
│
└── 📂 public/                # Public static files
    └── vite.svg
```

---

## 🛠️ Tech Stack

<div align="center">

|                                                     Technology                                                      |         Purpose         | Version |
| :-----------------------------------------------------------------------------------------------------------------: | :---------------------: | :-----: |
|          ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)          |      UI Framework       |  19.2   |
|  ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)   |       Type Safety       |   5.9   |
|           ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)            |       Build Tool        |   7.2   |
| ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white) |         Styling         |   4.1   |
|                       ![CRXJS](https://img.shields.io/badge/-CRXJS-orange?style=flat-square)                        | Chrome Extension Plugin |   2.2   |
|                   ![Tabler](https://img.shields.io/badge/-Tabler_Icons-228BE6?style=flat-square)                    |       Iconography       |  3.35   |

</div>

---

## 📦 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- Google Chrome browser

### Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/lpu-automate.git
cd lpu-automate

# Install dependencies
npm install
```

### Step 2: Build the Extension

```bash
# Development build (with hot reload)
npm run dev

# Production build
npm run build
```

### Step 3: Load in Chrome

```
┌─────────────────────────────────────────────────────────────────────┐
│                    LOADING EXTENSION IN CHROME                      │
└─────────────────────────────────────────────────────────────────────┘

  1️⃣  Open Chrome → Navigate to: chrome://extensions
      ┌──────────────────────────────────────────────────────────┐
      │  🌐 chrome://extensions                                   │
      └──────────────────────────────────────────────────────────┘
                                  │
                                  ▼
  2️⃣  Enable "Developer mode" (toggle in top-right corner)
      ┌──────────────────────────────────────────────────────────┐
      │  [ Developer mode  🔘 ON ]                               │
      └──────────────────────────────────────────────────────────┘
                                  │
                                  ▼
  3️⃣  Click "Load unpacked" button
      ┌──────────────────────────────────────────────────────────┐
      │  [ 📁 Load unpacked ]  [ 📦 Pack extension ]             │
      └──────────────────────────────────────────────────────────┘
                                  │
                                  ▼
  4️⃣  Select the "dist" folder from your project directory
      ┌──────────────────────────────────────────────────────────┐
      │  📂 lpu-automate/                                        │
      │     └── 📂 dist/  ← SELECT THIS FOLDER                   │
      └──────────────────────────────────────────────────────────┘
                                  │
                                  ▼
  5️⃣  Extension installed! Pin it to toolbar for easy access 📌
      ┌──────────────────────────────────────────────────────────┐
      │  🧩 Extensions → 📌 Pin "LPU Wi-Fi Auto Connect"         │
      └──────────────────────────────────────────────────────────┘
```

---

## 🚀 Usage

### Initial Setup

<table>
<tr>
<td width="50%">

**1. Open Extension Popup**

Click the extension icon in your browser toolbar to open the settings popup.

</td>
<td width="50%">

```
┌────────────────────────────┐
│  🌙     LPU Auto Connect  ⚡│
├────────────────────────────┤
│  👤 ┌────────────────────┐ │
│     │ Reg No / UID       │ │
│     └────────────────────┘ │
│  🔒 ┌────────────────────┐ │
│     │ Password           │ │
│     └────────────────────┘ │
│  ┌────────────────────────┐│
│  │     💾 Update         ││
│  └────────────────────────┘│
└────────────────────────────┘
```

</td>
</tr>
</table>

### Enter Credentials

| Field               | Description                  | Example    |
| ------------------- | ---------------------------- | ---------- |
| 👤 **Reg No / UID** | Your LPU registration number | `12345678` |
| 🔒 **Password**     | Your Wi-Fi/UMS password      | `********` |

### Save & You're Done!

Click the **💾 Update** button to save your credentials. That's it!

---

## 🎮 Controls

|  Icon   | Action           | Description                                         |
| :-----: | ---------------- | --------------------------------------------------- |
|   ⚡    | **Power Toggle** | Enable/Disable auto-connect (Green = ON, Red = OFF) |
| 🌙 / ☀️ | **Theme Toggle** | Toggle global dark mode for all websites            |
|   💾    | **Save Button**  | Save your credentials to local storage              |

---

## 🌙 Global Dark Mode

The extension includes a **Global Dark Mode** feature that applies a dark theme filter to ALL websites you visit.

```
┌─────────────────────────────────────────────────────────────────────┐
│                     DARK MODE TOGGLE FLOW                           │
└─────────────────────────────────────────────────────────────────────┘

     ┌─────────────────┐          ┌─────────────────────────────────┐
     │  Click 🌙 Icon  │─────────▶│  chrome.storage.local           │
     │  in Popup       │          │  lpu_global_dark_mode = true    │
     └─────────────────┘          └─────────────┬───────────────────┘
                                                │
                                                ▼
                                  ┌─────────────────────────────────┐
                                  │  theme.ts Content Script        │
                                  │  Detects storage change         │
                                  └─────────────┬───────────────────┘
                                                │
                                                ▼
                                  ┌─────────────────────────────────┐
                                  │  Injects CSS Filter             │
                                  │  filter: invert(1)              │
                                  │  hue-rotate(180deg)             │
                                  └─────────────────────────────────┘
                                                │
                                                ▼
                                  ┌─────────────────────────────────┐
                                  │  🌙 All Websites Now Dark!       │
                                  └─────────────────────────────────┘
```

---

## 🔧 Development

### Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build production-ready extension         |
| `npm run lint`    | Run ESLint to check code quality         |
| `npm run preview` | Preview production build locally         |

### Development Workflow

```bash
# Start development mode
npm run dev

# Make changes to src/ files
# Extension auto-reloads in Chrome!

# When ready for production
npm run build
```

---

## 🔐 Security

| Aspect           | Implementation                                                     |
| ---------------- | ------------------------------------------------------------------ |
| **Storage**      | Credentials stored in `chrome.storage.local` (encrypted by Chrome) |
| **Scope**        | Data never leaves your browser                                     |
| **Permissions**  | Minimal permissions required (storage + specific URLs)             |
| **No Telemetry** | Zero data collection or external API calls                         |

---

## 🐛 Troubleshooting

<details>
<summary><b>Extension not auto-logging in?</b></summary>

1. Make sure the extension is **enabled** (green power icon)
2. Verify credentials are saved (click Update after entering)
3. Check that you're on `10.10.0.1` or `internet.lpu.in`
4. Try refreshing the captive portal page

</details>

<details>
<summary><b>Dark mode not applying?</b></summary>

1. Refresh the page after enabling dark mode
2. Some websites may override the filter
3. Check browser console for any errors

</details>

<details>
<summary><b>Build failing?</b></summary>

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Try with a fresh build
rm -rf dist
npm run build
```

</details>

---

## 📝 Manifest Permissions

```json
{
  "permissions": ["storage"],
  "host_permissions": ["<all_urls>"],
  "content_scripts": [
    {
      "matches": ["*://10.10.0.1/*", "*://internet.lpu.in/*"],
      "js": ["src/content/index.ts"] // Auto-login script
    },
    {
      "matches": ["<all_urls>"],
      "js": ["src/content/theme.ts"] // Dark mode script
    }
  ]
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

### Made with ❤️ for LPU Students

**⭐ Star this repo if it helped you!**

</div>
    - **Note**: If a site looks broken, you can quickly toggle this off.

4.  **Disable Extension**:
    - Click the **Power** button (Green = On, Red = Off) to temporarily disable auto-login.

## Development

If you want to contribute or modify the extension:

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd LPU-Wifi-auto-connect
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run in development mode**:
    ```bash
    npm run dev
    ```
    This will watch for changes and rebuild automatically.

## Permissions Explained

- `storage`: Required to securely save your username, password, and settings locally on your device.
- `host_permissions` (`<all_urls>`): Required for **Global Dark Mode** to inject the dark theme into any website you visit.
  - _Note_: The extension only modifies the page style (CSS) and does not read or transmit any personal data from visited sites.

## Privacy

- **Local Storage**: Your credentials (Registration Number and Password) are stored **only** in your browser's local storage (`chrome.storage.local`).
- **No Tracking**: This extension does not track your browsing history or send data to any external servers.

## Browser Support

- **Google Chrome**: Fully supported.
- **Microsoft Edge**: Supported (Load unpacked extension).
- **Brave**: Supported.
- **Other Chromium-based browsers**: Likely supported.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Troubleshooting

- **Extension Disabled?**: If Chrome disables the extension due to permission changes (e.g., adding Global Dark Mode), go to `chrome://extensions` and re-enable it.
- **Not Working?**: Ensure you are on the correct login URL (`10.10.0.1`).
- **Dark Mode Glitches?**: Some complex websites might not look perfect with the global filter. You can easily toggle it off for those specific moments.
