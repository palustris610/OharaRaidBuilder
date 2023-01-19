const {  EmbedBuilder, TimestampStyles } = require('discord.js');
const { time } = require('@discordjs/builders');
//const row = new ActionRowBuilder();

async function editTime(message, datetime){ //or embed directly?
    const newTime = new Date(Date.parse(datetime));
    if (newTime == NaN) {
        //error, invalid string input, could not parse to datetime
    }
    const modifiedEmbed = EmbedBuilder.from(message.embeds[0]);
    const origDescript = message.embeds[0].description;
    const descriptionStuff = origDescript.substring(0, origDescript.indexOf('\nEvent time:'));
    const timeString = '\nEvent time: ' + time(newTime) +
	'\nRelative time: ' + time(new Date(Date.parse(newTime)), 'R');
    modifiedEmbed.setDescription(descriptionStuff + timeString);
    await message.edit({embeds: [modifiedEmbed]})
    return 0;
}

module.exports = {editTime};