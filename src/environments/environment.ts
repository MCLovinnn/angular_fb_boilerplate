
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    domain: "dev-zud0vau8n0mr82bj.us.auth0.com",
    clientId: "AZLzubWCAkwMYLIjck5Az0UHt6kVbvRp",
    audience: "https://mail.nifag349.mywhc.ca",
    apiUrl: "https://api.mail.nifag349.mywhc.ca",
    organization: "org_rgwTUCY9YkKXwZ83",
    redirectUri: window.location.origin
  },
  dev: {
    apiUrl: "/api",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
