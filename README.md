# drumhut

## Website

First of all you will need to install Node.js and Bower:

Node.js - https://nodejs.org/

When you install Node it will add a special command to your Terminal / CMD prompt called `npm`.
`npm` allows you to install various packages using the command line.

To open your command line go to the Start menu and search for 'cmd'. You might need to right-click it and choose 'Run as administrator' (not sure)

You will use `npm` to install Bower. Bower itself is similar to `npm`, it justs lets you install a different type of package.

Bower - http://bower.io/

Once Bower and Node are installed you can prepare the project.

    # change directory (cd) to the website folder
    $ cd website
    # ask npm to install the packages you need (might take a little while)
    $ npm install
    # now ask bower to install its packages
    $ bower install

Once that is all complete you can run the project

    $ grunt server

This should open up your default browser with the test page

