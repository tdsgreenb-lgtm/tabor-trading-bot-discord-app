index.js
db.js
utils.js
deploy-commands.js
package.json
commands/ (folder with all command files)
migrations/ (optional)
require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const fs = require('fs');
const path = require('path');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const COOLDOWN = Number(process.env.COOLDOWN_SECONDS || 10);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.cooldowns = new Collection();

// Load command files
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(f => f.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.data.name) || new Collection();
    client.cooldowns.set(command.data.name, timestamps);
    const userId = interaction.user.id;

    if (!timestamps.has(userId)) {
        timestamps.set(userId, now);
        setTimeout(() => timestamps.delete(userId), COOLDOWN * 1000);
    } else {
        const expirationTime = timestamps.get(userId) + COOLDOWN * 1000;
        if (now < expirationTime) {
            const timeLeft = Math.ceil((expirationTime - now) / 1000);
            return interaction.reply({ content: `Please wait ${timeLeft}s before using this command again.`, ephemeral: true });
        }
        timestamps.set(userId, now);
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            interaction.followUp({ content: 'There was an error executing this command!', ephemeral: true });
        } else {
            interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
        }
    }
});

client.login(DISCORD_TOKEN);
