import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Cole aqui o bloco "firebaseConfig" que você copiou no Console do Firebase
// (Configurações do projeto → Seus apps → ícone "</>").
// Essas chaves NÃO são secretas — é normal e seguro deixá-las no código do
// front-end. A segurança de verdade vem das Regras do Firestore (veja o
// arquivo firestore.rules) e do login por e-mail/senha.
const firebaseConfig = {
  apiKey: "AIzaSyC08ee8kIBLyEuREIfscIoQurU1gtUXjF8",
  authDomain: "visao-de-nerdola-blog.firebaseapp.com",
  projectId: "visao-de-nerdola-blog",
  storageBucket: "visao-de-nerdola-blog.firebasestorage.app",
  messagingSenderId: "916289368175",
  appId: "1:916289368175:web:d7639be414c12cf8e2dd9a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
