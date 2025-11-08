const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show all available commands'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('TaborTrades Commands')
            .setColor('Purple')
            .addFields(
                { name: '/post', value: 'Post a new trade' },
                { name: '/browse', value: 'Browse recent trades' },
                { name: '/search', value: 'Search trades by keyword' },
                { name: '/mytrades', value: 'Show your trades' },
                { name: '/report', value: 'Report a trade' },
                { name: '/verify', value: 'Verify yourself' },
                { name: '/help', value: 'Show this help message' }
            );

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};
