const { execFile } = require('child_process');
const { NMAP_PATH, MODERATOR_LOG_CHANNEL_ID } = require('../config');

module.exports = {
  name: 'nmap',
  description: 'Perform basic port scan of IP / hostname',
  guildOnly: true,
  execRoleOnly: true,
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
                  value: args.join(''),
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

    execFile(command, cmdArgs, async (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        try {
          return await message.channel.send({
            embeds: [
              {
                color: 'FF0000',
                title: 'Nmap Results',
                description: `Error executing nmap \`${args.join('')}\``,
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
        } catch (error) {
          console.error(error);
          return message.reply('Command failed: ', error);
        }
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        try {
          return await message.channel.send({
            embeds: [
              {
                color: 'FF0000',
                title: 'Nmap Results',
                description: `Error executing nmap \`${args.join('')}\``,
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
        } catch (error) {
          console.error(error);
          return message.reply('Command failed: ', error);
        }
      }
      console.log(`stdout: ${stdout}`);
      try {
        await message.channel.send({
          embeds: [
            {
              color: 3447003,
              title: 'Nmap Results',
              description: `Nmap results for \`${args.join('')}\``,
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
      } catch (error) {
        console.error(error);
        const buffer = Buffer.from(stdout);

        try {
          await message.channel.send({
            embeds: [
              {
                color: 3447003,
                title: 'Nmap Results',
                description: `Results too large to display in embed. Command output for ${args.join(
                  ''
                )} is attached.`,
                timestamp: new Date(),
              },
            ],
            files: [{ attachment: buffer, name: 'output.txt' }],
          });
        } catch (error) {
          console.error(error);
          return message.reply('Command failed: ', error);
        }
      }
    });
  },
};
