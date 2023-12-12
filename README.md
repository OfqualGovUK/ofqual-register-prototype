# Prototype for Ofqual's Register of Regulated Qualifications

This prototype is to test user-centred design solutions relating to the redevelopment of Ofqual's Register of Regulated Qualifications. Key priorities are to:

* redesign the interface using the GOV.UK design standard
* place the needs of service users first
* improve the overall accessibility of the user interface

## Installation

This is a NodeJS Express app based on the GOV.UK Prototype Kit. Install and run the prototype with the following commands:

1. Clone the repository, ```git clone https://github.com/OfqualGovUK/ofqual-register-prototype.git``` or create a fork on Github
1. In the cloned folder, run the command ```npm install``` to install any missing dependencies
1. Run the prototype in development mode, ```npm run dev```
1. The prototype is available at [http://localhost:3000](http://localhost:3000)

## Hosted prototype

There is a password-protected [prototype available on Heroku](https://ofqual-register.herokuapp.com/). For access, please contact anyone in Ofqual's User Centred Design team.

## Developing the prototype

This prototype uses the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk/docs/create-new-prototype), but modified to allow for versioning.

The following instructions assume that you are creating a new version called 'delta'. Replace any instance of 'delta' in the steps below with your own version name.

To create a new prototype version:

1. Create a folder, ```app/views/delta```
1. Create a new file, ```app/routes/routes-delta.js```
1. Edit ```app/routes.js``` to add a line at the end of the file, ```require('./routes/routes-delta.js')(router)```

### Edit your new routing file

Edit your new routing file, in the example above it is ```app/routes/routes-delta.js```, and add the following code:

    require('./routes/routes-alpha01.js')(router);
    module.exports = function (router) {
      const version = 'delta';
      // Place your routing rules here
      router.all('/' + version + '/start', function (req, res) {
        res.render('/' + version + '/start', { 'version': version });
      })
    }

### Changes to make to account for versioning

You will now develop your prototype inside the folder ```app/views/delta``` and add your routing rules and conditional code to ```app/routes/delta.js```.

For **every page you create you need to add an entry to your routing Javascript file** (```/app/routes/delta.js``` in the example above). This is essential so that you can pass the prototype version string through to the page that is being rendered. If you did not do this, you would need to hard-code the version string into any form actions or links within your prototype.

In the previous section, you can see an example of the modified routing rule that will capture requests for the page ```/delta/start```. The essential changes are that the matching URL that is caught by the router uses the variable ```version```, set earlier in the file, rather than hard-coding the version string into the URL. The page being rendered also uses the ```version``` variable, but it also passes the variable through to the page being rendered. The variable can be accessed in the page by using the code ```{{ version }}```.

When writing URLs or form actions in your pages, you will need to remember that you are writing versioned pages, and so you will need to include the version number at the start of any links to pages or form actions. For example, your links will need to link to something like, ```/delta/search-results```. In order to do so, in your code you will need to use one fo the following patterns:

#### Use the variable directly

    <form action="/{{ version }}/search-results" method="post" novalidate="novalidate">

#### Compose a new page variable with the version included

For example, when you need to use the URL in a Nunjucks component.

    {% set versionedURL = "/" + version + "/search-results" %}

    {{ govukButton({
      text: "Save and continue",
      href: versionedURL
    }) }}

#### Using within include statements

Any includes of HTML fragments from other files will also need to take this into account, for example:  

    {% include "/" + version + "/components/scope-of-recognition.html" %}

#### Use within your routing Javascript and in any other scripts you include

You will need to take care to remember to use the version variable in any URLs within your routes or other javascript.
