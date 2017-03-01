const env = process.env

module.exports = {
  mongodbUri: {
    default: 'mongodb://localhost/muber',
    test: 'mongodb://localhost/muber_test'
  },
  port: env.PORT || 3050,
  host: env.HOST || '0.0.0.0',
  NODE_ENV: env.NODE_ENV || 'development',
  get serverUrl () {
    return `http://${this.host}:${this.port}`
  }
}
