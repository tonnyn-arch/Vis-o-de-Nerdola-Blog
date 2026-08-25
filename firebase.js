import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Cole aqui o bloco "firebaseConfig" que você copiou no Console do Firebase
// (Configurações do projeto → Seus apps → ícone "</>").
// Essas chaves NÃO são secretas — é normal e seguro deixá-las no código do
// front-end. A segurança de verdade vem das Regras do Firestore (veja o
// arquivo firestore.rules) e do login por e-mail/senha.
const firebaseConfig = {
  apiKey: "COLE_AQUI_SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "COLE_AQUI",
  appId: "COLE_AQUI",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
