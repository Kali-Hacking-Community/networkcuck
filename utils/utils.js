const axios = require('axios');
const { BOT_TOKEN, ALLOW_EXEC_COMMAND_ROLES } = require('../config');

const getGuildMember = async (discordID, guildID) => {
  try {
    const res = await axios({
      method: 'get',
      url: `https://discordapp.com/api/guilds/${guildID}/members/${discordID}`,
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    return { error };
  }
};

const checkIfStaff = async (discordID, guildID) => {
  try {
    const guildMember = await getGuildMember(discordID, guildID);

    if (guildMember.error) {
      return false;
    }

    const res = await axios({
      method: 'get',
      url: `https://discordapp.com/api/guilds/${guildID}/roles`,
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
      },
    });

    const guildRoles = res.data;
    const staffRoles = guildRoles.filter((role) =>
      STAFF_ROLES.includes(role.name)
    );
    const staff = staffRoles.some((r) => {
      return guildMember.roles.includes(r.id);
    });

    if (!staff) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const checkIfExecRole = async (discordID, guildID) => {
  try {
    const guildMember = await getGuildMember(discordID, guildID);

    if (guildMember.error) {
      return false;
    }

    const res = await axios({
      method: 'get',
      url: `https://discordapp.com/api/guilds/${guildID}/roles`,
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
      },
    });

    const guildRoles = res.data;
    const execRoles = guildRoles.filter((role) =>
      ALLOW_EXEC_COMMAND_ROLES.includes(role.name)
    );
    const authorized = execRoles.some((r) => {
      return guildMember.roles.includes(r.id);
    });

    if (!authorized) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

exports.checkIfStaff = checkIfStaff;
exports.checkIfExecRole = checkIfExecRole;
