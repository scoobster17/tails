Tails Story Planner App
=======================

Tails is an app designed to help you plan your stories - or 'tales' - being a
budding author that just wants somewhere to stash ideas and details. However we
prefer to call them 'tails'.

**Please be aware this app is still in development**

Installation
------------

This app uses a MEAN stack so it will require `node` and `bower` to be installed
as well as following these steps:

1. Install npm modules `npm install`
2. Install bower components `bower install`

There is one other hack to make the bootstrap glyphicons work (wasn't able to find a real solution in the short time I tried investigating). This needs to be done by you because this is a bower component that is not stored in this repo.

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

You will be faced with a normal web app featuring pages that list and detail
your tails, for both the stories themselves and the components of the story
such as 'characters' or 'scenes'.

There are also some pages for you to jot down things about the author (yourself)
or make notes or a to-do list to keep track of your tasks.

About
-----

This app was created to give me a chance to make a more complex AngularJS app. I
have not had much experience with Angular and thought this a perfect opportunity
to have a play.

If you do have any suggested improvements to this software / my AngularJS coding
please do let me know. I am always looking to improve my skills.