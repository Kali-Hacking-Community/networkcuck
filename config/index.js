require('dotenv').config();

exports.MODERATOR_LOG_CHANNEL_ID = '908719010546339890';
exports.ALLOW_EXEC_COMMAND_ROLES = ['Moderator', 'Administrator', 'Exec'];
exports.STAFF_ROLES = ['Moderator', 'Administrator'];
exports.NMAP_PATH = '/usr/bin/nmap';

exports.BOT_TOKEN = process.env.BOT_TOKEN;
exports.PREFIX = process.env.PREFIX || 'test!';
