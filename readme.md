# Embedit Electronics Landing Page

This is the landing website for the Embedit Electronics company and specificly made to showcase their debut product, the RPiSoc.

## Dependancies

- Git
- Ruby
- Node.js
- Ruby SASS

## Installation & Setup

### Take care of the project dependancies:

#### [Install Git](http://git-scm.com/book/en/Getting-Started-Installing-Git)

#### [Install Ruby](https://www.ruby-lang.org/en/installation/) (For linux and OSX I recommend using RVM. For Windows use the RailsInstaller)

#### [Install Node.js](http://nodejs.org/)

#### Install Ruby SASS

NOTE: You must have installed Ruby already

To install Ruby SASS just run the following command in the command prompt/terminal:

    gem install sass

If you get an error message (on a Unix OS) then it's likely you need to use the `sudo` command to install the gem.

    sudo gem install sass

### Setup the source code

Navigate to the folder where you want to place the source code of the site in the command prompt/terminal and run the following command:

    git clone https://github.com/vincentriemer/embedit-site.git && cd $

Once inside the source code folder run the following command to take care of all the npm dependancies:

    npm install

Before you run any further commands it's probably a good idea to run this command so you don't encounter any initial errors:

    gulp clean

### Compiling the website

In order to compile the development source code just run the following command and everything should be taken care of for you:
 
    gulp

The compiled code ready for deployment should then be put in `dist` folder.

## Development

All the development source code is located in the `src` folder.

In order to make development a little easier I created a gulp command to automatically locally host the development code and reload the page to any changes made to the source code:

    gulp serve

To ensure you get the automatic page reloading functionaly make sure you have the LiveReload extension install for your favorite browser.
