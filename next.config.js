module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['127.0.0.1', 'api.hotlarva.com']
  },
  env: {
    BACKEND_DOMAIN: process.env.BACKEND_DOMAIN,
  }
}
