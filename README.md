# Alcancía de Horas GTA 6

Web app estática (un solo `index.html`, CSS/JS inline) + Firebase (Firestore + Auth anónima). Reparte el tiempo de una PS5 compartida entre Lautaro y Francisco. Lanzamiento: jueves 19/11/2026 00:00 (America/Buenos_Aires, UTC-3 fijo).

## Firebase
1. Crear proyecto → Firestore (modo producción) → Authentication → habilitar **Anónimo**.
2. Configuración del proyecto → app web → copiar `firebaseConfig` y pegarlo en el `<script>` de arriba de `index.html`.
   Si `apiKey` queda vacío la app corre en **modo demo** (localStorage).
3. Publicar reglas: `firebase deploy --only firestore:rules` (usa `firebase.json` + `firestore.rules`).

## Vercel
Framework **Other**, sin build command, output directory = raíz. Conectar el proyecto existente a este repo (rama `main`).

## Reglas de negocio
- PIN 1405 = Lautaro, 1005 = Francisco (se guarda el hash SHA-256, no el PIN).
- Franjas de 15 min: **compartida** (ambos libres) / **exclusiva de X** / **nadie**.
- Depósito diario a cada uno = mitad de los minutos compartidos del día, desde el 19/11.
- Costo: compartida 100 %, exclusiva propia = `exclusiveFactor` (0/25/50/100, default 0), resto 100 %. Cada sesión guarda `{minutes, minutesShared, minutesExclusive, cost}` y no se recalcula.
- Saldo = depósitos − Σ cost ± trades aceptados.
- Antes del 19/11 jugar es gratis (todavía no hay depósitos).
- Feriado (lun 23/11): no corren mañana, sueño ni clases de Francisco; la ocupación de Lautaro 17–22 sí.
- Horarios en `baseBusy()` / `FRAN_WEEK` / `HOLIDAYS` dentro de `index.html`.

## Casos de prueba verificados
Fran mar 24 18–20 → cuesta 0 · Fran mié 25 18–20 → 2 h · lun 23 10–12 → compartida · vie 20 03:00 → nadie · sáb 21 03:00 → compartida.
