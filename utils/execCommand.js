const { execFile } = require('child_process');
const { capitalizeFirstLetter } = require('./utils');

module.exports = async function (message, args, commandName, binaryPath) {
  const fullCommand = `${commandName} ${args.join(' ')}`;
  commandName = capitalizeFirstLetter(commandName);

  const m = await message.channel.send(
    `Executing command: \`${fullCommand}\`...`
  );

  execFile(binaryPath, args, async (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      try {
        return await m.edit({
          content: `${commandName} Results`,
          embeds: [
            {
              color: 'FF0000',
              title: 'Nmap Results',
              description: `Error executing \`${fullCommand}\``,
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
          content: `${commandName} Results`,
          embeds: [
            {
              color: 'FF0000',
              title: 'Nmap Results',
              description: `Error executing \`${fullCommand}\``,
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
        content: `${commandName} Results`,
        embeds: [
          {
            color: 3447003,
            title: `${commandName} Results`,
            description: `Results for \`${fullCommand}\``,
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
          content: `${commandName} Results`,
          embeds: [
            {
              color: 3447003,
              title: `${commandName} Results`,
              description: `Results too large to display in embed. Command output for \`${fullCommand}\` is attached.`,
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
};
