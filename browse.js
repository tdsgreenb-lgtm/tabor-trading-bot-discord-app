const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const utils = require('../utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('browse')
        .setDescription('Browse recent trades'),
    async execute(interaction) {
        const trades = utils.getTrades(10);
        if (!trades.length) return interaction.reply({ content: 'No trades found.', ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle('Recent Trades')
            .setColor('Green');

        trades.forEach(t => {
            embed.addFields({ name: t.item, value: `Posted by: ${t.username}\nDetails: ${t.details || 'N/A'}\nPrice: ${t.price || 'N/A'}` });
        });

        await interaction.reply({ embeds: [embed] });
    }
};
