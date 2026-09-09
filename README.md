# drumhut

## Website

You will need Node.js and npm:

Node.js - https://nodejs.org/

Prepare the project from the repository root:

    # change directory (cd) to the website folder
    $ cd website
    # install the exact npm dependencies from package-lock.json
    $ npm ci

To build the site:

    $ npm run build

Optional integrations are injected at build time. For local builds, copy
`website/.env.example` to `website/.env` and fill in `SNIPCART_PUBLIC_API_KEY` and
`GTM_CONTAINER_ID`.

To start the local development server:

    $ npm run server

The server should open the test page in your default browser.

### Deploying

From the `website` directory, build the deployable site with:

    $ npm run deploy

This builds `website/dist`. Publishing the generated directory is handled by the
deployment environment.
