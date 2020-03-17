const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  cssModules: true,
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000, // check changes every second
      aggregateTimeout: 300, // rebuild after 300ms
    }
    return config
  },
  env: {
    SERVER_URL: 'https://nexma.now.sh/graphql'
  },
})
