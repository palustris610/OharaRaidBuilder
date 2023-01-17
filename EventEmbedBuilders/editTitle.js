const {  ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
//const { time } = require('@discordjs/builders');
//const row = new ActionRowBuilder();

async function editTitle(message, newTitle){ //or embed directly?
    const modifiedEmbed = EmbedBuilder.from(message.embeds[0]);
    modifiedEmbed.setTitle(newTitle);
    await message.edit({embeds: [modifiedEmbed]})
    return 0;
}

module.exports = {editTitle};