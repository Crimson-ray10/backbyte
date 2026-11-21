# BACKBYTE

> **The Social Deception Game Built for Developers**  
> Collaborate on code in real-time, solve programming tasks, and hunt down the Impostor before your codebase gets destroyed!

---

## About BACKBYTE

**BACKBYTE** is an online multiplayer social deception coding game inspired by *Among Us*. 

Players are split into two teams:
* **Developers:** Must work together in a real-time collaborative code editor to complete assigned coding tasks, fix bugs, and achieve 100% completion before time runs out.
* **Impostors:** Must covertly sabotage the code, inject subtle bugs, blur teammates' editors, send fake hints, and eliminate developers without getting caught.

When suspicious activity is detected, players can call **Emergency Meetings** to discuss, accuse, and vote off suspected Impostors!

---

## Key Features

* **Real-Time Collaborative Editor:** Powered by **Monaco Editor** and **Yjs CRDTs**, allowing seamless multi-cursor real-time code editing and live synchronization.
* **Impostor Sabotage System:** Impostors can trigger special cooldown abilities:
  * Injected Syntax/Logic Bugs
  * Screen / Editor Blurs
  * Fake AI Hints & Distractions
* **Emergency Meetings & Voting:** Real-time text chat, discussion phases, and secret/public voting system to eliminate suspects.
* **Customizable Lobbies & Game Settings:** Host private or public rooms with custom game duration, player limits (4–8 players), meeting timers, and sabotage cooldowns.
* **Authentication & Profiles:** Secure authentication powered by NextAuth.js, JWT, and MongoDB user profiles.

---

## Tech Stack

### **Frontend (`BACKBYTE-client`)**
* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **UI & Styling:** Tailwind CSS, Framer Motion, Radix UI, Lucide Icons
* **Code Editor:** Monaco Editor (`@monaco-editor/react`)
* **Real-time & CRDTs:** Socket.io Client, Yjs (`yjs`, `y-monaco`, `y-protocols`)
* **State Management:** Zustand
* **Authentication:** NextAuth.js

### **Backend (`BACKBYTE-server`)**
* **Runtime:** Node.js (>= 22.0.0)
* **Framework:** Express 5
* **Language:** TypeScript
* **WebSockets:** Socket.io (with `@socket.io/redis-adapter` for scaling)
* **Database:** MongoDB (Mongoose)
* **Cache & Pub/Sub:** Redis (ioredis)
* **Validation & Security:** Zod, Helmet, Express Rate Limit, JWT, CORS, Winston Logger

---

## 🕹️ itch.io Release (Playable HTML5)

BACKBYTE includes a standalone HTML5 browser build packaged specifically for **[itch.io](https://itch.io)**:

* **Zip file ready to upload:** [`itch/backbyte-itch.zip`](./itch/backbyte-itch.zip) (contains `index.html` at the zip root).
* **Direct HTML client:** [`itch/index.html`](./itch/index.html) or [`index.html`](./index.html).
* **Step-by-step instructions:** See [ITCH_PUBLISHING_GUIDE.md](./ITCH_PUBLISHING_GUIDE.md).
* **Repackage anytime:** `npm run package:itch` or `python scripts/package-itch.py`.

