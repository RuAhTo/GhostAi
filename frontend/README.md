Backend Flow
Databas (MongoDB med Mongoose)

Player Model: Lagrar spelarinformation.
Story Model: Lagrar berättelser och alternativ.

API Endpoints

POST /api/auth/login: Autentisering av spelare med JWT.
POST /api/stories: Skapa en ny berättelse (innehåller AI-prompt).
GET /api/stories/:playerId: Hämta alla berättelser för en specifik spelare.
Validering (Joi eller Zod)

Validera inkommande data för berättelser och spelarinformation innan de sparas i databasen.

OpenAI

Används för att generera berättelser och alternativ baserat på spelardata.
Frontend Flow
Single-Page Application (SPA)

Vite: Byggverktyg för snabb utveckling.
React: För att skapa användargränssnitt.
React Router DOM: För navigering (även om det är en SPA).
Axios: För att hantera HTTP-anrop till backend.
SCSS: För styling av komponenter.
Huvudkomponenter

Login Component: Hanterar inloggning av spelare.
Story Component: Visar den aktuella berättelsen och ger spelaren alternativ.
Player Dashboard: Visar spelarinformation och tidigare berättelser.