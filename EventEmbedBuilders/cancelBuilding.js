const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { ButtonStyle } = require("discord.js");
const questionText = 'Are you sure you want to cancel, and delete this thread?\n**This is permanent!**';
const row = new ActionRowBuilder().setComponents([
    new ButtonBuilder().setCustomId('yesCancel').setLabel('Yes').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('noCancel').setLabel('No').setStyle(ButtonStyle.Primary)
]);

async function cancelBuilding(samplemsg, questionmsg, privt){
    const expectedIDs = ['yesCancel', 'noCancel']
    const filter = inter => expectedIDs.includes(inter.customId);
    await questionmsg.edit({content: questionText, components: [row]});
    const answer = await privt.awaitMessageComponent({filter, max: 1})
        .then(interaction => {
            interaction.deferUpdate();
            return interaction.customId;
        });
    return answer;
}

module.exports = {cancelBuilding};