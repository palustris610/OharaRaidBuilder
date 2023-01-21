const {  ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
const { askQuestion } = require('./askQuestion');
//const { time } = require('@discordjs/builders');
//const row = new ActionRowBuilder();

async function editDescription(samplemsg, questionmsg, privt){ //or embed directly?
    const newDescription = await askQuestion('Give me a Description:', privt, questionmsg);
    const modifiedEmbed = EmbedBuilder.from(samplemsg.embeds[0]);
    const origDescript = samplemsg.embeds[0].description;
    const dateStuff = origDescript.substring(origDescript.indexOf('\nEvent time:'));
    modifiedEmbed.setDescription(newDescription + dateStuff);
    await samplemsg.edit({embeds: [modifiedEmbed]})
    return 0;
}

module.exports = {editDescription};