# Embedit Electronics Landing Page

This is the landing website for the Embedit Electronics company and specifically made to showcase their debut product, the RPiSoc.

## Dependancies

- Git
- Ruby
- Ruby SASS
- Python 2.7.8
- Node.js
- Gulp

## Installation & Setup

### Take care of the project dependancies:

#### [Install Git](http://git-scm.com/book/en/Getting-Started-Installing-Git)

#### [Install Ruby](https://www.ruby-lang.org/en/installation/)

For linux and OSX I recommend using RVM. For Windows use the RailsInstaller.

#### Install Ruby SASS

NOTE: You must have installed Ruby already

To install Ruby SASS just run the following command in the command prompt/terminal:

    gem install sass

If you get an error message (on a Unix OS) then it's likely you need to use the `sudo` command to install the gem.

    sudo gem install sass

#### [Install Python](https://www.python.org/downloads/)

Ensure you add python to the PATH variable (and that you install version 2.7.8).

#### [Install Node.js](http://nodejs.org/)

**Windows Users:** due to an issue with Windows and Node.js you may have to manually create the `npm` folder here:

    C:\Users\[Current User]\AppData\Roaming\npm

#### Install Gulp

Run the following command in the command prompt/terminal:

    npm install --global gulp

A local version of gulp for the project is already included in the dev dependencies.


### Setup the source code

Navigate to the folder where you want to place the source code of the site in the command prompt/terminal and run the following command:

    git clone https://github.com/vincentriemer/embedit-site.git && cd embedit-site

Once inside the source code folder run the following command to take care of all the npm dependencies:

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

To ensure you get the automatic page reloading functionality make sure you have the LiveReload extension install for your favorite browser.
