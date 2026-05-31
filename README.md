# WanderLog

WanderLog is a production-ready React travel bucket list app built with React 18, Vite, React Router DOM, Axios, Context API, and LocalStorage persistence.

## Project Overview

Users can register or log in with Reqres, browse countries from the Rest Countries API, search and filter by region, view details, and manage a bucket list of wishlist and visited countries.

## Features

- Register and login with Reqres API
- Protected routes with persistent sessions
- Explore all countries with search, region filters, and sorting
- Country detail pages with maps, currencies, languages, borders, area, and timezone data
- Add and remove countries from the bucket list
- Mark and unmark visited countries
- LocalStorage persistence for auth, wishlist, visited, and theme
- Dark mode toggle with persistence
- World coverage stats
- Responsive UI for desktop, tablet, and mobile
- Loading, retry, and error states

## Folder Structure

```text
src/
  api/
  components/
  context/
  hooks/
  pages/
  routes/
  App.jsx
  main.jsx
  App.css
  index.css
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Deployment on Vercel

The project includes a `vercel.json` rewrite so SPA routes work on refresh and direct navigation.

Deploy the repository to Vercel with the default build command:

```bash
npm run build
```

And the output directory:

```text
dist
```

## Test Credentials

Login:

```text
peter@klaven / cityslicka
```

Register:

```text
eve.holt@reqres.in / pistol
```

## Future Improvements

- Add country-level notes and tags
- Support multi-user profiles
- Add offline caching for country data
- Add unit and integration tests
- Add richer animations and map previews

## Assignment Notes

- This project was built to satisfy the React assignment. The app uses the public ReqRes demo API for auth and the Rest Countries API for country data.

## Known Limitations

- ReqRes change: Some ReqRes `/api/*` endpoints now require an `x-api-key`. When this occurs, the app falls back to a locally-generated demo token so reviewers can demo login/register flows. See `src/api/authApi.js` for details. This is a documented, intentional fallback to keep the assignment demoable.

UI behavior: When the app falls back to a local demo token during login or signup, the auth form will display a clear warning banner indicating the session is simulated (provider: `local-demo`). This ensures reviewers are informed that a demo fallback was used rather than a silent substitution.

## Deployment

- Build the project:

```bash
npm install
npm run build
```

- Deploy `dist/` to a static host such as Vercel or Netlify. `vercel.json` includes an SPA rewrite.

## Known Test Credentials

- Demo login (fixture): `peter@klaven` / `cityslicka` (works against ReqRes or local-demo fallback)
- Demo register example: `eve.holt@reqres.in` / `pistol`

## Contact / Submission

- If you review this assignment and need me to adjust styling or add minor clarifications, open an issue or contact me via the repository PR notes.
