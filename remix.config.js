/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  server: process.env.NODE_ENV === 'development' ? undefined : './server.ts',
  ignoredRouteFiles: ['**/.*'],
  future: {
    v2_routeConvention: true,
  },
}
