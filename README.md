# LinkAuth Portal — Backend

Node.js + Express backend that handles LinkedIn OAuth 2.0 authentication.

## Tech Stack

- **Node.js** with ES Modules (`"type": "module"`)
- **Express 5**
- **Axios** — HTTP requests to LinkedIn API
- **dotenv** — Environment variable management
- **CORS** — Cross-origin requests from frontend

## Project Structure

```
backend/
├── src/
│   ├── app.js                  # Express app setup, CORS, routes
│   ├── controller/
│   │   └── linkedinController.js  # Handles redirect + callback logic
│   ├── routes/
│   │   └── linkedinRoutes.js   # Route definitions
│   └── services/
│       └── linkedinService.js  # LinkedIn API calls (token + userinfo)
├── .env                        # Environment variables (not committed)
├── server.js                   # Entry point — starts the server
└── package.json
```

## Setup

```bash
npm install
```

Create a `.env` file in the root:

```env
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:5001/auth/linkedin/callback
FRONTEND_URL=http://localhost:3000
PORT=5001
```

## Run

```bash
# Development (auto-restart on file change)
npm run dev

# Production
npm start
```

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Health check — returns `Server is running 🚀` |
| GET | `/auth/linkedin` | Redirects user to LinkedIn OAuth login page |
| GET | `/auth/linkedin/callback` | LinkedIn redirects here with `?code=...`, exchanges for token, fetches user, redirects to frontend |

## Auth Flow

```
1. Frontend hits /auth/linkedin
2. Backend redirects to LinkedIn OAuth URL
3. User logs in on LinkedIn
4. LinkedIn redirects to /auth/linkedin/callback?code=...
5. Backend exchanges code for access token
6. Backend fetches user info from LinkedIn /v2/userinfo
7. Backend redirects to FRONTEND_URL/auth-success?user=<encoded-json>
```

## LinkedIn User Data Returned

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "picture": "https://media.linkedin.com/..."
}
```

## Deployment (Render)

- **Runtime:** Node
- **Build Command:** `npm install`
- **Start Command:** `node server.js`
- **Environment Variables:** Set all `.env` values in Render dashboard

Live URL: `https://linkauth-portal-backend.onrender.com`
