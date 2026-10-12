Smart Stock Analyst - Android install package
1. Upload ALL files in this folder to any HTTPS host (Netlify Drop, GitHub Pages, Cloudflare Pages, Firebase Hosting).
2. Open the link in Chrome on Android.
3. Tap the menu (three dots) > "Install app" (or "Add to Home screen").

Privacy & security features (v2)
- PIN app lock (PBKDF2-hashed, stored only on the phone) with lockout after 5 wrong tries
- Auto-lock on leaving the app and on idle; "Erase loaded data on lock"
- Blank cover in Android recent-apps view; mask account figures
- Offline-only mode (blocks all internet requests)
- Erase all app data (PIN, settings, caches)
- Content-Security-Policy and no-referrer headers; live price requests are never cached
