const {  ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const { askQuestion } = require('./askQuestion');
//const { time } = require('@discordjs/builders');


async function editMention(samplemsg, questionmsg, privt){ //or embed directly?
    let menu = new StringSelectMenuBuilder().setCustomId('rolemention').setPlaceholder('Select a role');
    const roleList = privt.guild.roles.fetch();
    console.log(roleList);
    roleList.forEach(role => {
        console.log(role);
        // menu.addOptions({
        //     label: ''
        // });
    });
    const newChannel = await askQuestion('Please select a mention option:', privt, questionmsg);
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

module.exports = {editMention};