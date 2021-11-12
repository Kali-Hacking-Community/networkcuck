const { execFile } = require('child_process');
const { NMAP_PATH, MODERATOR_LOG_CHANNEL_ID } = require('../config');

module.exports = {
  name: 'nmap',
  description: 'Perform basic port scan of IP / hostname',
  guildOnly: true,
  usage: `<ip address|hostname>`,
  async execute(message, args) {
    const command = NMAP_PATH;
    const cmdArgs = args;
    const forbidden = [';', '&', '&&'];
    let forbiddenWordDetected = false;

    cmdArgs.forEach((arg) => {
      if (forbidden.some((c) => arg.includes(c))) {
        forbiddenWordDetected = true;
      }
    });

    if (forbiddenWordDetected) {
      try {
        const channel = await message.client.channels.fetch(
          MODERATOR_LOG_CHANNEL_ID
        );

        return channel.send({
          embeds: [
            {
              color: 'FFFF00',
              title: `\:warning: Possible command injection attempt \:warning:`,
              fields: [
                {
                  name: 'Offending User',
                  value: message.author.tag,
                },
                {
                  name: 'Command Arguments Given',
                  value: args.join(),
                },
              ],
              timestamp: new Date(),
            },
          ],
        });
      } catch (error) {
        console.error(error);
        return message.reply('Command failed: ', error);
      }
    }

    execFile(command, cmdArgs, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return message.channel.send({
          embeds: [
            {
              color: 'FF0000',
              title: 'Nmap Results',
              description: `Error executing nmap ${cmdArgs}`,
              fields: [
                {
                  name: 'Output',
                  value: `\`\`\`${error}\`\`\``,
                },
              ],
              timestamp: new Date(),
            },
          ],
        });
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return message.channel.send({
          embeds: [
            {
              color: 'FF0000',
              title: 'Nmap Results',
              description: `Error executing nmap ${cmdArgs}`,
              fields: [
                {
                  name: 'Output',
                  value: `\`\`\`${stderr}\`\`\``,
                },
              ],
              timestamp: new Date(),
            },
          ],
        });
      }
      console.log(`stdout: ${stdout}`);
      message.channel.send({
        embeds: [
          {
            color: 3447003,
            title: 'Nmap Results',
            description: `Nmap results for ${args[0]}`,
            fields: [
              {
                name: 'Output',
                value: `\`\`\`${stdout}\`\`\``,
              },
            ],
            timestamp: new Date(),
          },
        ],
      });
    });
  },
};
