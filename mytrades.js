const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const utils = require('../utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mytrades')
        .setDescription('Show your trades'),
    async execute(interaction) {
        const trades = utils.getUserTrades(interaction.user.id);
        if (!trades.length) return interaction.reply({ content: 'You have no trades.', ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle(`${interaction.user.username}'s Trades`)
            .setColor('Yellow');

        trades.forEach(t => {
            embed.addFields({ name: t.item, value: `Details: ${t.details || 'N/A'}\nPrice: ${t.price || 'N/A'}` });
        });

        await interaction.reply({ embeds: [embed] });
    }
};
