'use strict'

const fs = require('fs');

// Discord modules
const Discord = require('discord.js');
const { token, prefix } = require('./Auth/config.json');

// Load bot and commands
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Set commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
});

// Output when bot is ready
client.on('ready', () => {
    console.log('Bot loaded');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);