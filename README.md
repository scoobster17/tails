Tails Story Planner App
=======================

Tails is an app designed to help you plan your stories - or 'tales' - being a
budding author that just wants somewhere to stash ideas and details. However we
prefer to call them 'tails'.

**Please be aware this app is still in development**

Installation
------------

This app uses a MEAN stack so it will require `node` (latest stable release,
tested with 4.4.4), `mongoDB`, and `bower` to be installed as well as following
these steps:

1. Install npm modules `npm install`
2. Install bower components `bower install`

You will also need to set up a database for this to work. Once you have mongo
installed, run ``` mongod ``` in one shell to set up your database
server, then in another shell session, run the following commands to open a database
connection and create the database in your local environment (this session can
be closed when the database has been created):

```
mongo
> use tails
```

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

Processes
---------

To compile the styles, there is a gulp task:

```gulp sass```

The following process compiles the styles when a file is changed:

```gulp watch```

*There is currently no JavaScript minification happening.*

To test the code there is a gulp task:

```
gulp test
gulp test -u
gulp test -e -r
gulp test -ur
```

You must add flags to the above command to determine the type of tests and open
an HTML report of the tests.

Use the ```-u``` flag for unit tests (using karma), and the ```-e``` flag for
end to end tests (using protractor);

Simply add the ```-r``` flag to open the report after the tests have been run
for either type.

You can chain these flags or use them separately: ``` -u -e -r ``` or ``` -uer ```

About
-----

This app was created to give me a chance to make a more complex AngularJS app. I
have not had much experience with Angular and thought this a perfect opportunity
to have a play.

If you do have any suggested improvements to this software / my AngularJS coding
please do let me know. I am always looking to improve my skills.