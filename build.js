// Genera firebase-config.js a partir de variables de entorno de Vercel (no se commitea).
// Tolerante con los nombres: acepta cualquier variable que contenga FIREBASE y termine en la clave
// (ej. FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_API_KEY, VITE_FIREBASE_API_KEY...).
const fs = require('fs');
const env = process.env;
const find = suffixes => {
  const names = Object.keys(env).filter(k => /FIREBASE/i.test(k));
  for (const s of suffixes) { const k = names.find(n => n.toUpperCase().endsWith(s)); if (k && env[k]) return env[k]; }
  return '';
};
const cfg = {
  apiKey: find(['API_KEY', 'APIKEY']), authDomain: find(['AUTH_DOMAIN', 'AUTHDOMAIN']), projectId: find(['PROJECT_ID', 'PROJECTID']),
  storageBucket: find(['STORAGE_BUCKET', 'STORAGEBUCKET']), messagingSenderId: find(['MESSAGING_SENDER_ID', 'SENDER_ID']),
  appId: find(['APP_ID', 'APPID']), measurementId: find(['MEASUREMENT_ID'])
};
if (!cfg.apiKey) console.warn('⚠ No hay variable *FIREBASE*API_KEY: la app va a correr en modo DEMO.');
fs.writeFileSync('firebase-config.js', 'var firebaseConfig = ' + JSON.stringify(cfg, null, 2) + ';\n');
console.log('firebase-config.js generado (' + (cfg.projectId || 'sin projectId') + ')');
