const { SlashCommandBuilder } = require('discord.js');
const utils = require('../utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify yourself as a trader'),
    async execute(interaction) {
        utils.verifyUser(interaction.user.id);
        await interaction.reply({ content: '✅ You are now verified!', ephemeral: true });
    }
};
