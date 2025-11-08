const { SlashCommandBuilder } = require('discord.js');
const utils = require('../utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report a trade')
        .addIntegerOption(option => option.setName('tradeid').setDescription('Trade ID to report').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for reporting').setRequired(true)),
    async execute(interaction) {
        const tradeId = interaction.options.getInteger('tradeid');
        const reason = interaction.options.getString('reason');
        utils.reportTrade(tradeId, interaction.user.id, reason);
        await interaction.reply({ content: `✅ Trade #${tradeId} reported.`, ephemeral: true });
    }
};
