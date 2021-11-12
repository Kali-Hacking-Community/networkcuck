require('dotenv').config();

exports.GUILD_ID = '908484354647392266';
exports.MODERATOR_LOG_CHANNEL_ID = '908719010546339890';
exports.STAFF_ROLES = ['Moderator', 'Administrator'];
exports.NMAP_PATH = '/usr/bin/nmap';

exports.BOT_TOKEN = process.env.BOT_TOKEN;
exports.PREFIX = process.env.PREFIX || 'test!';
