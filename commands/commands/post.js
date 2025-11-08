const { SlashCommandBuilder } = require('discord.js');
const utils = require('../utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('post')
        .setDescription('Post a new trade')
        .addStringOption(option => option.setName('item').setDescription('Item name').setRequired(true))
        .addStringOption(option => option.setName('details').setDescription('Details').setRequired(false))
        .addStringOption(option => option.setName('price').setDescription('Price').setRequired(false)),
    async execute(interaction) {
        const item = interaction.options.getString('item');
        const details = interaction.options.getString('details') || '';
        const price = interaction.options.getString('price') || '';
        utils.createTrade(interaction.user.id, interaction.user.username, item, details, price);
        await interaction.reply({ content: `Trade posted: ${item}`, ephemeral: true });
    }
};
