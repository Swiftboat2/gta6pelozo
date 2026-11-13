// Genera firebase-config.js a partir de variables de entorno de Vercel (no se commitea).
const fs = require('fs');
const pre = ['', 'NEXT_PUBLIC_', 'VITE_', 'REACT_APP_'];
const get = n => { for (const p of pre) if (process.env[p + n]) return process.env[p + n]; return ''; };
const cfg = {
  apiKey: get('FIREBASE_API_KEY'), authDomain: get('FIREBASE_AUTH_DOMAIN'), projectId: get('FIREBASE_PROJECT_ID'),
  storageBucket: get('FIREBASE_STORAGE_BUCKET'), messagingSenderId: get('FIREBASE_MESSAGING_SENDER_ID'),
  appId: get('FIREBASE_APP_ID'), measurementId: get('FIREBASE_MEASUREMENT_ID')
};
if (!cfg.apiKey) console.warn('⚠ FIREBASE_API_KEY no definida: la app va a correr en modo DEMO.');
fs.writeFileSync('firebase-config.js', 'var firebaseConfig = ' + JSON.stringify(cfg, null, 2) + ';\n');
console.log('firebase-config.js generado (' + (cfg.projectId || 'sin projectId') + ')');
