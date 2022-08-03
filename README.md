# "Confirm your identity" - A Made Tech academy project by spacecats 🌙 🐈 🐈 🐈 🐈 

This is the alpha version of the "Confirm your identity" project. It  follows the prototype that was built during discovery/alpha together with the UCD Academy.

The prototype was built using the [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/docs) and can be found here: https://project-luna-protoype-1.herokuapp.com/

## How to run this project

* Start server with `npm run serverstart`
* Run Cypress tests in terminal with `npm run cypress:run`
* Run Cypress in browser with `npm run cypress:open`

## Project set up

### Dependencies and what they are used for

The project was generated using the [Express application generator](https://expressjs.com/en/starter/generator.html), which creates a project skeleton with the following dependencies:

    - express: our server
    - cookie-parser: Parse cookie header and populate req.cookies
    - debug
    - http-errors
    - morgan: HTTP request logger
    - jade: uninstalled (templating engine, not needed in this project)

Note: ^finish exploring what they all do and if they are all needed

The following dependencies were installed as well: 

    - cypress: our testing library for e2e tests
    - nodemon: watches files and restarts the server when it detects changes
    - govuk-frontend: the [GOV.UK design system](https://design-system.service.gov.uk/)
    - sass: preprocessor for CSS
    - nunjucks: allows us to use nunjuck templates from the govuk-frontend
    - chokidar
    - eslint: code formatter

