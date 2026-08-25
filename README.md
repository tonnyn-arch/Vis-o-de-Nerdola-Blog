# Visão de Nerdola — blog

Blog em React + Vite, com posts salvos no Firebase (Firestore) e login de
admin via Firebase Authentication.

## 1. Configurar o Firebase

1. Crie um projeto em https://console.firebase.google.com
2. Ative **Firestore Database** (modo produção).
3. Ative **Authentication → Sign-in method → E-mail/senha**.
4. Em **Authentication → Users**, cadastre um e-mail/senha para cada pessoa
   que poderá publicar. É assim que você define quem é admin.
5. Em **Configurações do projeto → Seus apps**, registre um app Web e copie
   o objeto `firebaseConfig`.
6. Cole esse objeto em `src/firebase.js`, substituindo os valores de
   exemplo.
7. Em **Firestore Database → Regras**, cole o conteúdo do arquivo
   `firestore.rules` deste projeto e publique.

## 2. Rodar localmente (opcional, para testar antes de publicar)

Precisa ter o [Node.js](https://nodejs.org) instalado.

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## 3. Colocar no ar (deploy)

O jeito mais simples é pela [Vercel](https://vercel.com):

1. Crie uma conta na Vercel (dá pra entrar direto com o GitHub).
2. Clique em **Add New → Project**.
3. Escolha o repositório deste blog no GitHub.
4. A Vercel detecta sozinha que é um projeto Vite — não precisa mudar nada
   nas configurações de build.
5. Clique em **Deploy** e espere terminar (leva menos de um minuto).
6. Você recebe uma URL do tipo `visao-de-nerdola.vercel.app` — esse já é o
   link real e público do blog.

Toda vez que você der `git push` pra branch principal do repositório, a
Vercel publica a atualização sozinha.

## 4. Publicando matérias

Acesse o site publicado, clique em **Área do admin** no topo, entre com o
e-mail/senha que você cadastrou no Firebase, e use o botão **+ Nova
postagem**. Se o blog estiver vazio, aparece um botão para publicar 5 posts
de exemplo — só visível quando você está logado.

## Observações

- As imagens de capa dos posts **não são geradas por IA** — o formulário só
  aceita um link de imagem que você mesmo hospedou e cola manualmente.
- O bloco "ACOMPANHE O VISÃO DE NERDOLA NO YOUTUBE" aparece na barra
  lateral, no fim de cada matéria e no rodapé.
- Os espaços de anúncio (`Publicidade`) estão reservados no banner do topo,
  na lateral e no rodapé — quando você tiver um provedor de anúncios (ex:
  Google AdSense), é só substituir o componente `AdSlot` pelo script deles.
