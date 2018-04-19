module.exports = {
  webpack: (config, options, webpack) => {
    use 'strict';
    config.entry.main = './server/index.js'
    return config
  }
}
