/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  server: process.env.NODE_ENV === 'development' ? undefined : './server.ts',
  ignoredRouteFiles: ['**/.*'],
  serverDependenciesToBundle: [
    /^rehype.*/,
    /^remark.*/,
    /^react-markdown$/,
    /^mermaid.*/,
    /^khroma*/,
    /^d3*/,
    /^lodash-es*/,
    /^dagre-d3-es.*/,
    /^robust-predicates*/,
    /^internmap.*/,
  ],
  future: {
    v2_routeConvention: true,
    unstable_postcss: true,
  },
}
