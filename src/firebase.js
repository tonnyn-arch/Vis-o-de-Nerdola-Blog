import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC08ee8kIBLyEuREIfscIoQurU1gtUXjF8",
  authDomain: "visao-de-nerdola-blog.firebaseapp.com",
  projectId: "visao-de-nerdola-blog",
  storageBucket: "visao-de-nerdola-blog.firebasestorage.app",
  messagingSenderId: "916289368175",
  appId: "1:916289368175:web:d7639be414c12cf8e2dd9a",
};

const app = initializeApp(firebaseConfig);

// Força o modo de conexão "long polling" em vez de deixar o Firestore
// detectar sozinho. Isso evita conexões que ficam penduradas pra sempre
// (sem erro nenhum) em certas redes/provedores que bloqueiam o modo de
// streaming padrão.
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export const auth = getAuth(app);
