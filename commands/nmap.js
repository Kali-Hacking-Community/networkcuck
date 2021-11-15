const execCommand = require('../utils/execCommand');
const { NMAP_PATH } = require('../config');

module.exports = {
  name: 'nmap',
  description: 'Perform basic port scan of IP / hostname',
  guildOnly: true,
  execRoleOnly: true,
  commandInjectionProtection: true,
  usage: `-h`,
  async execute(message, args) {
    await execCommand(message, args, this.name, NMAP_PATH);
  },
};
