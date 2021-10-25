# AngularFormbuilder

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.

## Requirements:
Nodejs Version 14
angular CLI Version 12

## Set Up

To start the Application run:
`npm install`

Run
`npm start`
to serve the main Application

Run 
`npm startFB`
to start the Formbuilder UI

NOTE:
For the Formbuilder UI to work you need to start the express server with:

`DEBUG=express:* node ./projects/server/app.js`

Optional:
You can run and build all projects with their names after the ng command: ng serve formbuilderui (formbuilder | formbuilderui| formbuilderapp)



## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

To start the generating server run `DEBUG=express:* node ./server/app.js`

Included in this Repo are:
Project: FormbuilderApp, FormbuilderUi
Libraries: Angular Formbuilder

## Code scaffolding

Run `ng generate component component-name` in 'src/app/' to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
