const {  ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
const { askQuestion } = require('./askQuestion');
//const { time } = require('@discordjs/builders');
//const row = new ActionRowBuilder();

async function editTitle(samplemsg, questionmsg, privt){ //or embed directly?
    const newTitle = await askQuestion('Give me a Title:', privt, questionmsg);
    const modifiedEmbed = EmbedBuilder.from(samplemsg.embeds[0]);
    modifiedEmbed.setTitle(newTitle);
    await samplemsg.edit({embeds: [modifiedEmbed]})
    return 0;
}

module.exports = {editTitle};