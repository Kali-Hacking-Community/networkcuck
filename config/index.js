// Bot specific variables
// Set these with .env file
exports.BOT_TOKEN = process.env.BOT_TOKEN;
exports.PREFIX = process.env.PREFIX || 'test!';

// KHC Discord specific variables
exports.MODERATOR_LOG_CHANNEL_ID = '908719010546339890';
exports.ALLOW_EXEC_COMMAND_ROLES = ['Moderator', 'Administrator', 'Exec'];
exports.STAFF_ROLES = ['Moderator', 'Administrator'];

// Path variables
exports.NMAP_PATH = '/usr/bin/nmap';
exports.SEARCHSPLOIT_PATH = '/usr/bin/searchsploit';
