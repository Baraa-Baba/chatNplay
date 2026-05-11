# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend (root)
```bash
node server.js          # Run the signaling server
npm install             # Install backend dependencies
```

### Frontend (client/)
```bash
cd client
npm start               # React dev server (localhost:3000)
npm run build           # Production build → client/build/
npm test                # Run tests (react-scripts)
npm test -- --testPathPattern=<file>  # Run a single test file
```

### Keep-alive
```bash
node bot.js             # Pings server every 5s to prevent sleep (free hosting)
```

## Architecture

**ChatAndPlay** is a stranger-matching platform combining WebRTC video chat with real-time games (Chess, TicTacToe). It uses a dual package structure: a Node.js/Express backend at the root and a Create React App frontend in `client/`.

### Communication Stack
- **Socket.io** (server ↔ client) handles signaling, partner matching, chat messages, and game moves
- **Simple Peer** (WebRTC) handles direct peer-to-peer audio/video after match — the server is not in the media path

### Partner Matching (server.js)
The server maintains a `users` array and a `queue`. When a user requests a partner, the server filters the queue by:
1. Desired game mode (chess, tictactoe, or chat-only)
2. Auth type compatibility (anonymous, email, phone)
3. Gender/country preferences

Once matched, WebRTC offer/answer/ICE candidate messages are relayed through the server to establish a direct peer connection.

### Frontend State (client/src/App.js)
`App.js` is the central state hub (~100+ state variables). It owns:
- Socket.io connection lifecycle
- WebRTC stream and peer management
- All game state (chess board, TicTacToe grid)
- Filter/preference state (country, gender, auth type)
- Screen sharing and mute/video toggle state

Child components receive handlers and state as props. This is a known architecture debt — the component is large and handles multiple concerns.

### Authentication & Data (Firebase)
- Firebase Auth provides email, Google, and phone (reCAPTCHA) login
- Auth state is shared app-wide via `client/src/context/Auth.js` (React Context)
- Firestore stores user profiles and friend relationships
- Firebase config is in `client/src/firebase.js` (project: `gamemate-5d2e1`)

### Routing (client/src/Main.js)
React Router v6 with four routes:
- `/` — main chat/video/game UI (App.js, requires socket connection)
- `/signUp` — authentication page
- `/dashboard` — user dashboard (protected, requires auth)
- `/Terms`, `/Credits` — static pages

### Key Files
| File | Purpose |
|------|---------|
| `server.js` | Express + Socket.io server, all signaling and matching logic |
| `client/src/App.js` | Main UI state machine — WebRTC, socket events, game logic |
| `client/src/Main.js` | React Router setup |
| `client/src/context/Auth.js` | Firebase auth context provider |
| `client/src/firebase.js` | Firebase SDK initialization |
| `client/src/Components/ControlBar/` | Media control buttons (mic, video, screen share, fullscreen, filter toggle) using react-icons/fa |
| `client/src/Components/FilterCarousel/` | Face filter picker carousel (AliceCarousel + filter thumbnails) |
| `client/src/Components/filters/Filters2.jsx` | Lazy-loaded component that creates `#jeeFaceFilterCanvas` and bootstraps JeelizFaceFilter scripts |
| `client/src/Components/LazyFilters/` | React.lazy wrapper for Filters2 |
| `client/src/Components/Games/` | Chess (react-chessboard + chess.js) and TicTacToe components |
| `client/src/Components/Chat/` | Chat message UI |
| `client/public/threedostuffoldpublic/` | JeelizFaceFilter library, Three.js, GLB/GLTF mask models, and filter preview images |
| `client/public/assets/` | Filter preview thumbnail images |
| `bot.js` | Keep-alive pinger for free-tier hosting (Render, etc.) |

### Face Filter Architecture
The 3D face filter system uses JeelizFaceFilter (WebGL + ML face detection):
1. `Filters2.jsx` (lazy-loaded) creates `#jeeFaceFilterCanvas` and loads: `three.min.js` → `jeelizFaceFilter.js` → `JeelizThreeHelper.js` → `filterMain.js` (module)
2. `filterMain.js` fetches the neural net JSON, initializes JEELIZFACEFILTER on the canvas, and listens for `#chooseFilter` click events
3. App.js sets `#filterValue` DOM input value and clicks `#chooseFilter` when filter state changes
4. For 3D filters: the canvas stream (via `canvas.captureStream(15)`) replaces the video track sent to the WebRTC peer
5. GLB models are lazy-loaded per-filter inside `filterMain.js` — they're only fetched when that filter is first selected
