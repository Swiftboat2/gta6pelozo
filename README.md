# Alcancía de Horas GTA 6

Web app estática (un `index.html`, CSS/JS inline) + Firebase (Firestore + Auth anónima) para repartir el uso de una consola/PC entre dos hermanos. Login por PIN (1405 = Lautaro, 1005 = Francisco; se guarda solo el hash SHA-256).

## Reglas
- Cada día (00:00–24:00, hora Buenos Aires) cada uno tiene **12 h** de presupuesto = 24 bloques de 30 min.
- Reservar un bloque descuenta 0.5 h del saldo del día; **no suma horas jugadas**.
- **Cronómetro**: Iniciar / Pausar / Reanudar / Terminar. Solo cuentan los minutos reales (segmentos en `plays`). Solo uno puede estar "jugando" a la vez.
- **No-show**: si pasan 15 min del inicio de un bloque y el dueño no inició su sesión, el bloque se libera y el saldo vuelve.
- **Tradeos** (el otro debe Aceptar/Rechazar): intercambio de bloques (misma cantidad), regalo/cesión de saldo de un día, préstamo inter-día (se devuelve del presupuesto de otro día).
- Panel: saldo disponible del día de cada uno, horas reales acumuladas y diferencia neta.

## Firestore
`blocks/{día_idx}` · `plays` · `live/{lauty|fran}` · `trades`. Reglas en `firestore.rules` (`firebase deploy --only firestore:rules`).
El id del bloque (`2026-11-19_32`) hace imposible la doble reserva (se crea con transacción).

## Config / deploy
La config de Firebase NO está en el repo: en Vercel → Environment Variables cargar `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID` (se aceptan prefijos tipo `NEXT_PUBLIC_`/`VITE_`). `build.js` (ver `vercel.json`) genera `firebase-config.js` en cada deploy. Sin config corre en modo demo (localStorage).
En Firebase: habilitar Authentication → Anónimo y publicar las reglas.
