# 🎮 Publishing BACKBYTE on itch.io (HTML5 Playable in Browser)

This guide walks you through publishing **BACKBYTE** on **[itch.io](https://itch.io)** as an in-browser playable game using the generated `index.html` build.

---

## 📦 What Was Created for You

1. **`itch/index.html`**:
   The standalone, fully responsive HTML5 game client featuring:
   * **Developer Mode (Solo Practice):** Fix buggy functions (`sumArray`, `isPalindrome`, `factorial`, `twoSum`), run unit tests with live feedback, monitor AI teammate commits, call emergency meetings, and vote out the suspect.
   * **Impostor Mode (Solo Practice):** Sabotage the codebase using cooldown abilities (Inject Bug, Blur Screen, Fake AI Hint, Syntax Crash) and frame crewmates during emergency meetings.
   * **Online Multiplayer Mode:** Connects directly to your deployed BACKBYTE server (`https://backbyte.xyz` or your custom Vercel / Render deployment).
   * **8-bit Retro Synthesizer:** Built-in Web Audio API sound effects (no external audio files needed).
   * **Retro CRT Scanlines & Fullscreen:** Toggleable retro aesthetics with fullscreen support.

2. **`itch/backbyte-itch.zip`**:
   The pre-packaged zip archive containing `index.html` at the root, ready to upload directly to itch.io.

3. **`index.html` (at project root)**:
   A direct copy at the root of your workspace for local previewing.

4. **`scripts/package-itch.py`**:
   A Python packaging script to re-create `backbyte-itch.zip` anytime you make changes:
   ```bash
   python scripts/package-itch.py
   # or
   npm run package:itch
   ```

---

## 🚀 Step-by-Step itch.io Publishing Instructions

### 1. Log in to itch.io and Create a New Project
1. Go to [itch.io](https://itch.io) and log in to your account.
2. Click your profile avatar in the top right corner and click **Upload new project** (or go to [https://itch.io/game/new](https://itch.io/game/new)).

---

### 2. Configure Basic Game Information
* **Title:** `BACKBYTE` (or `BACKBYTE: Social Deduction Coding Game`)
* **Short description / Tagline:**
  `Collaborate on code in real-time, solve programming tasks, and hunt down the Impostor before your codebase gets destroyed!`
* **Classification:** **Games**
* **Kind of project:** Select **HTML**  
  *(Crucial: This enables the browser player for `index.html`)*

---

### 3. Upload Your HTML Game Archive
1. Scroll down to the **Uploads** section.
2. Click **Upload files**.
3. Select the file:
   ```
   c:\Users\ROHIT\Downloads\backbyte\itch\backbyte-itch.zip
   ```
4. Once uploaded, tick the checkbox:
   * **☑ This file will be played in the browser**

---

### 4. Configure Embed Options & Viewport
Under **Embed options**:
* **View mode:** **Embed in page** (recommended) or **Click to launch in fullscreen**
* **Viewport dimensions:**
  * Width: `1280`
  * Height: `720`  
  *(Or check **Automatically detect size** / responsive)*
* **Orientation:** **Landscape**
* **Fullscreen button:** **☑ Enable fullscreen button**
* **Mobile friendly:** Optional (the UI is responsive)

---

### 5. Details & Tags
* **Genre:** Strategy / Puzzle / Simulation
* **Tags:** `Multiplayer`, `Coding`, `Programmer`, `Social Deduction`, `Pixel Art`, `Retro`, `Browser`, `HTML5`
* **Visibility:**
  * Start with **Draft** or **Restricted** to test the game preview.
  * Once satisfied, switch to **Public**.

---

### 6. Save & View Page
1. Click **Save & view page** at the bottom.
2. Click **Run game** on your new itch.io page to verify that BACKBYTE loads and plays directly in the browser!

---

## 🌐 Connecting Live Multiplayer on itch.io

Because itch.io games run inside an HTTPS iframe (`https://html-classic.itch.zone/...`), the browser enforces secure network requests:
* **WebSocket server:** Must use `wss://` (secure WebSockets).
* **API server:** Must use `https://`.
* **CORS:** Ensure your backend (`BACKBYTE-server`) has `CLIENT_ORIGIN` set to include itch.io or `*` if public matchmaking is enabled.
* In the **MULTIPLAYER** tab of the itch game, players can enter any live server URL or use the "Open in New Tab" button for full external window play.

---

## 🛠️ Testing Locally Before Publishing

You can test the itch package on your machine right now:
* Simply double-click `c:\Users\ROHIT\Downloads\backbyte\itch\index.html` to open it in Chrome, Edge, or Firefox.
* Or run a local HTTP server:
  ```bash
  python -m http.server 8080 --directory itch
  ```
  Then open `http://localhost:8080` in your browser.
