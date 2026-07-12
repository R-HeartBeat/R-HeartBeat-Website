<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/46301d1f-11fc-4358-a57e-beef370f9100

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create a `.env.local` file from `.env.example` and set values for your environment.
3. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key.
4. Configure SMTP mail settings in `.env.local` for registration email notifications:
   - `SMTP_HOST=smtp.gmail.com`
   - `SMTP_PORT=587`
   - `SMTP_SECURE=false`
   - `SMTP_USER=your-email@gmail.com`
   - `SMTP_PASS=your-smtp-password-or-app-password`
   - `EMAIL_RECIPIENT=rheartbeat2026@gmail.com`
   - `EMAIL_FROM=no-reply@rheartbeat.com`
5. Run the API server:
   `npm run dev:api`
6. Run the app:
   `npm run dev`
