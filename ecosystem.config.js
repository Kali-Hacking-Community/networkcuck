const { BOT_TOKEN, PREFIX } = require('./config');

module.exports = {
  apps: [
    {
      name: 'networkcuck',
      script: './bot.js',
      env: {
        NODE_ENV: 'production',
      },
      env_production: {
        NODE_ENV: 'production',
        BOT_TOKEN: BOT_TOKEN,
        PREFIX: PREFIX,
      },
    },
  ],
};
