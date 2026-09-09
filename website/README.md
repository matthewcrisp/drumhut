# The Drum Hut website

The site uses Eleventy with the existing Handlebars templates and JSON data.

From this directory:

```sh
npm ci
npm run build
```

The build writes the static site to `dist`. Run `npm run server` for a local
development server, or `npm run lint` to check the JavaScript.

Build-time integrations read `SNIPCART_PUBLIC_API_KEY` and `GTM_CONTAINER_ID`
from the environment. A local `.env` file can be created from `.env.example`.
