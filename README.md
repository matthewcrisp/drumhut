# drumhut

## Website

You will need Node.js and npm:

Node.js - https://nodejs.org/

Prepare the project from the repository root:

    # change directory (cd) to the website folder
    $ cd website
    # install the exact npm dependencies from package-lock.json
    $ npm ci
    # install the frontend dependencies from bower.json
    $ npx --yes bower install

To build the site:

    $ npx grunt build

To start the local development server:

    $ npx grunt server

The server should open the test page in your default browser. Dependencies are
ignored by Git; do not commit `node_modules`, `bower_components`, or `dist`.

### Deploying

From the `website` directory, build and publish the site with:

    $ npx grunt deploy

This builds `website/dist`, commits the generated files to the `gh-pages` branch,
and pushes that branch to GitHub Pages.
