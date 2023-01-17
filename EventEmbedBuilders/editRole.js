const {  ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
const { updateButtons } = require('./updateButtons');
//const { time } = require('@discordjs/builders');
//const row = new ActionRowBuilder();

async function editRole(message, newRole, index){ 
    const modifiedEmbed = EmbedBuilder.from(message.embeds[0]);
    const origFields = message.embeds[0].fields;
    const newFields = [];
    let updated = false;
    for (let i = 0; i < origFields.length; i++) {
        const field = origFields[i];
        if (i == index - 1) { //if already exists, update
            newFields.push({
                name: newRole,
                value: '\u200B',
                inline: true
            })
            updated = true;
        }
        else {
            newFields.push(field);
        }
    }
    if (!updated) {
        newFields.push({
            name: newRole,
            value: '\u200B',
            inline: true
        });
    }

    //update buttons -> generate a new button row
    const row = updateButtons(message, newFields, 'roles');
    modifiedEmbed.setFields(newFields);
    await message.edit({embeds: [modifiedEmbed], components: [row]});
    return ;
}

module.exports = {editRole};