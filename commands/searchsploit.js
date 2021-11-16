const execCommand = require('../utils/execCommand');
const { SEARCHSPLOIT_PATH } = require('../config');

module.exports = {
  name: 'searchsploit',
  description:
    'Searchable archive from The Exploit Database. https://www.exploit-db.com/',
  guildOnly: true,
  execRoleOnly: true,
  commandInjectionProtection: true,
  usage: `-h`,
  async execute(message, args) {
    args.push('--colour');
    await execCommand(message, args, this.name, SEARCHSPLOIT_PATH, {
      attachmentOnly: true,
    });
  },
};
