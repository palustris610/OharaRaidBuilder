const { ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { ButtonStyle } = require("discord.js");
const questionText = 'Are you sure you want to publish the event?\nThis will delete this thread, and post the sample to the targer channel.';
const row = new ActionRowBuilder().setComponents([
    new ButtonBuilder().setCustomId('yesPublish').setLabel('Yes').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('noPublish').setLabel('No').setStyle(ButtonStyle.Secondary)
]);

async function publishEvent(samplemsg, questionmsg, privt){
    const filter = inter => {inter.setCustomId == 'yesPublish' | inter.setCustomId == 'noPublish'};
    await questionmsg.edit({content: questionText, components: [row]});
    const isPublish = await privt.awaitMessageComponent({filter, max: 1})
        .then(collected => {
            const answer = collected.first().content == 'yes';
            return answer; //true or false
        });
    
    if (isPublish) {
        //get target channel id
        //get complete embed
        //empty the field contents
        //post the embed into the channel
        privt.delete();
    }
    else {
        return;
    }
}

module.exports = {publishEvent};