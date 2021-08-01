'use strict'

const Discord = require('discord.js');
const auth = require('./Auth/bot_token.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Bot loaded');
});

client.login(auth['token']);