require('dotenv').config();
module.exports = {
  webpack: (config, options) => {
    // Fix a weird error from dotenv ("Module not found: Can't resolve 'fs'")
    // https://github.com/zeit/next.js/issues/7755
    if (!options.isServer) {
      config.node = {
        fs: 'empty'
      };
    }
    return config;
  }
};
