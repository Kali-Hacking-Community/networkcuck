const { execFile } = require('child_process');
const { NMAP_PATH } = require('../config');

module.exports = {
  name: 'nmap',
  description: 'Perform basic port scan of IP / hostname',
  guildOnly: true,
  execRoleOnly: true,
  commandInjectionProtection: true,
  usage: `<ip address|hostname>`,
  async execute(message, args) {
    const command = NMAP_PATH;

    const m = await message.channel.send(
      `Executing command: \`nmap ${args.join(' ')}\`...`
    );

    execFile(command, args, async (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        try {
          return await m.edit({
            content: 'Results Below',
            embeds: [
              {
                color: 'FF0000',
                title: 'Nmap Results',
                description: `Error executing nmap \`${args.join(' ')}\``,
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
          return await m.edit({
            content: 'Results Below',
            embeds: [
              {
                color: 'FF0000',
                title: 'Nmap Results',
                description: `Error executing nmap \`${args.join(' ')}\``,
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
        await m.edit({
          content: 'Nmap Results Below',
          embeds: [
            {
              color: 3447003,
              title: 'Nmap Results',
              description: `Nmap results for \`${args.join(' ')}\``,
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
          await m.edit({
            content: 'Results Below',
            embeds: [
              {
                color: 3447003,
                title: 'Nmap Results',
                description: `Results too large to display in embed. Command output for ${args.join(
                  ' '
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
