const {  ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
//const { time } = require('@discordjs/builders');
//const row = new ActionRowBuilder();

async function editTargetChannel(message, newChannel){ //or embed directly?
    const origContent = message.content;
    const channelString = 'Your event will be posted into channel: ';
    let newContent = '';

    if (!origContent.includes(channelString)) {
        newContent = origContent + channelString;
    }
    else {
        newContent = origContent.substring(0, origContent.indexOf(': ') + 2);
    }
    newContent = newContent + newChannel;
    await message.edit({content: newContent})
    return 0;
}

module.exports = {editTargetChannel};