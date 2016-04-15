Tails Story Planner App
=======================

Tails is an app designed to help you plan your stories - or 'tales' - being a
budding author that just wants somewhere to stash ideas and details.

**Please be aware this app is still in development**

Installation
------------

This app uses a MEAN stack so it will require `node` and `bower` to be installed
as well as following these steps:

1. Install npm modules `npm install`
2. Install bower components `bower install`

There is one other hack to make the glyphicons work (wasn't able to find a real solution in the short time I tried investigating). This needs to be done by you because this is a bower component that is not stored in this repo.

In the file:

``` /bower_components/bootstrap-sass/assets/stylesheets/bootstrap/variables.scss ```

Change this line:

``` $icon-font-path: if($bootstrap-sass-asset-helper, "bootstrap/", "../fonts/bootstrap/") !default; ```

To:

``` $icon-font-path: if($bootstrap-sass-asset-helper, "bootstrap/", "../bower_components/bootstrap-sass/assets/fonts/bootstrap/") !default; ```

Usage
-----

Hopefully it is pretty self-explanatory for the most part. But this app does run
on a node server so you will need to open a terminal and type the following to
make the site available:

``` node server.js ```

Once the server is up and running, the site runs from port `7411`, so you can
access the site from this url:

``` http://localhost:7411 ```