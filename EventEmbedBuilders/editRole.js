const { EmbedBuilder } = require('discord.js');
const { updateRoleButtons } = require('./updateRoleButtons.js');

async function editRole(message, newRole, index){ 
    const modifiedEmbed = EmbedBuilder.from(message.embeds[0]);
    const origFields = message.embeds[0].fields;
    const origModRow = message.components[1]; //second ActionRow, modifiers
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
    const newRow = updateRoleButtons(newFields);
    modifiedEmbed.setFields(newFields);
    await message.edit({embeds: [modifiedEmbed], components: [newRow, origModRow]});
    return ;
}

module.exports = {editRole};