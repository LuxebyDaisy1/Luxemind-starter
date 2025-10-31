# LuxeMind Starter (Vercel + OpenAI)

Minimal, deploy-ready starter for your LuxeMind AI Coach.
- Static UI in `/public`
- Serverless function in `/api/chat.js`
- Uses `OPENAI_API_KEY` (set on Vercel)
- No frameworks required

## 1) Download & Upload to GitHub
- Download the ZIP from your ChatGPT session
- Unzip, then create a new GitHub repo
- Commit & push the files

## 2) Deploy on Vercel
- Go to https://vercel.com/import and select your repo
- When asked for Environment Variables, add:
    - `OPENAI_API_KEY` = your key from https://platform.openai.com/
- Click Deploy

## 3) Test
- Open your Vercel URL (e.g., https://your-project.vercel.app)
- Type a message and click Send
- You should see LuxeMind's reply

## Customize
- Edit `/api/chat.js` system prompt and model
- Style `/public/index.html`
- Replace routes in `vercel.json` if you add a framework later
