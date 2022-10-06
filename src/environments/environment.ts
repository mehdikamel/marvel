// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const now = Date.now();

export const environment = {
  production: false,
  apiUrl: 'https://gateway.marvel.com:443/v1/public/',
  apiKey:
    'ts=1&apikey=c648f6bb478c51123f6e486359d4c070&hash=72d183cb7bd5023b7379223b356d248d',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
