const {  ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
//const { time } = require('@discordjs/builders');
//const row = new ActionRowBuilder();

async function editDescription(message, newDescription){ //or embed directly?
    const modifiedEmbed = EmbedBuilder.from(message.embeds[0]);
    const origDescript = message.embeds[0].description;
    const dateStuff = origDescript.substring(origDescript.indexOf('\nEvent time:'));
    modifiedEmbed.setDescription(newDescription + dateStuff);
    await message.edit({embeds: [modifiedEmbed]})
    return 0;
}

module.exports = {editDescription};