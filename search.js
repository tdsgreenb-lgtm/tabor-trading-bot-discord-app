const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const utils = require('../utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Search trades by term')
        .addStringOption(option => option.setName('term').setDescription('Search term').setRequired(true)),
    async execute(interaction) {
        const term = interaction.options.getString('term');
        const trades = utils.searchTrades(term, 10);
        if (!trades.length) return interaction.reply({ content: 'No trades found.', ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle(`Search results for "${term}"`)
            .setColor('Blue');

        trades.forEach(t => {
            embed.addFields({ name: t.item, value: `Posted by: ${t.username}\nDetails: ${t.details || 'N/A'}\nPrice: ${t.price || 'N/A'}` });
        });

        await interaction.reply({ embeds: [embed] });
    }
};
