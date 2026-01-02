# React + Firebase QR Scanner
Starter project implementing Google Sign-In (Firebase) and a camera QR scanner
(react-zxing).
## Features
- Google OAuth sign-in via Firebase
- Protected dashboard route
- Camera-based QR scanning (mobile + desktop)
- Send scan results to backend (example placeholder)
- Simple UI using Tailwind (optional)
## Setup
1. Clone or copy files.
2. Run `npm install`.
3. Create a Firebase project and enable Authentication -> Google.
4. Fill `.env.local` with your Firebase config (see `.env.example`).
5. Run `npm start`.
## Notes
- This template uses React Router v6, Firebase v10 modular SDK, and react-zxing
for scanning.
- Replace the backend endpoint in `src/services/apiService.js` with your API.