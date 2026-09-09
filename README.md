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

    $ npx grunt build

Optional integrations are injected at build time. For local builds, copy
`website/.env.example` to `website/.env` and fill in `SNIPCART_PUBLIC_API_KEY` and
`GTM_CONTAINER_ID`. The `.env` file is ignored by Git. Shell/CI variables with the
same names take precedence; unset values disable the corresponding integration.
Do not put Snipcart secret API keys in this static site.

To start the local development server:

    $ npx grunt server

The server should open the test page in your default browser.

### Deploying

From the `website` directory, build and publish the site with:

    $ npx grunt deploy

This builds `website/dist`, commits the generated files to the `gh-pages` branch,
and pushes that branch to GitHub Pages.
