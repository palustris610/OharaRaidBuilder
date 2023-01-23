const { ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const questionText = 'Are you sure you want to publish the event?\nThis will delete this thread, and post the sample to the targer channel.';
const row = new ActionRowBuilder().setComponents([
    new ButtonBuilder().setCustomId('yesPublish').setLabel('Yes').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('noPublish').setLabel('No').setStyle(ButtonStyle.Secondary)
]);

async function publishEvent(samplemsg, questionmsg, privt){
    const expectedIDs = ['yesPublish', 'noPublish']
    const filter = inter => expectedIDs.includes(inter.customId);
    await questionmsg.edit({content: questionText, components: [row]});
    const isPublish = await privt.awaitMessageComponent({filter, max: 1})
        .then(interaction => {
            interaction.deferUpdate();
            return interaction.customId;
        });
    
    if (isPublish == 'yesPublish') {
        //get target channel
        const origContent = samplemsg.content;
        const targetChannelId = origContent.substring(origContent.indexOf('<#') + 2, origContent.indexOf('>'));
        const targetChannel = await privt.guild.channels.fetch(targetChannelId);
        //get complete embed
        const origEmbed = samplemsg.embeds[0]
        //empty the field contents
        const newFields = [];
        origEmbed.fields.forEach(fld => {
            newFields.push({
                name: fld.name,
                value: '\u200B',
                inline: true
            });
        });
        const newEmbed = EmbedBuilder.from(samplemsg.embeds[0]).setFields(newFields);
        //get button rows
        const buttonRows = [];
        samplemsg.components.forEach(row =>{
            const newRow = new ActionRowBuilder();
            row.components.forEach(btn => {
                newRow.addComponents(new ButtonBuilder()
                    .setCustomId(btn.customId)
                    .setEmoji(btn.emoji)
                    .setStyle(btn.style)
                );
            });
            buttonRows.push(newRow);
        });
        //get mention
        let mention = origContent.substring(origContent.indexOf('mention:') + 8);
        console.log(mention);
        if (mention.length < 1) {
            mention = '\u200B';
        }
        //post the thing into the target channel
        const eventMessage = await targetChannel.send({content: mention, embeds: [newEmbed], components: buttonRows});
        return {answer: 'yesPublish', message: eventMessage};
    }
    else {
        return {answer: 'noPublish'};
    }
}

module.exports = {publishEvent};