const {  ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
const { askQuestion } = require('./askQuestion');
//const { time } = require('@discordjs/builders');
//const row = new ActionRowBuilder();

async function editTargetChannel(samplemsg, questionmsg, privt){ //or embed directly?
    const newChannel = await askQuestion('Which Channel will be the Event posted to? Mention the channel using #channelname', privt, questionmsg);
    const origContent = samplemsg.content;
    const channelString = 'Your event will be posted into channel: ';
    let newContent = '';

    if (!origContent.includes(channelString)) {
        newContent = origContent + channelString;
    }
    else {
        newContent = origContent.substring(0, origContent.indexOf(': ') + 2);
    }
    newContent = newContent + newChannel;
    await samplemsg.edit({content: newContent})
    return 0;
}

module.exports = {editTargetChannel};