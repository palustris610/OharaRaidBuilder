const { EmbedBuilder } = require('discord.js');
const { askQuestion } = require('./askQuestion.js');
const { updateRoleButtons } = require('./updateRoleButtons.js');

async function editRoles(samplemsg, questionmsg, privt){
    await questionmsg.edit({content: 'How many roles will there be? (1-5)', components: []});
    const roleCount = await privt.awaitMessages({max: 1})
        .then(collected => {
            const num = Number(collected.first().content);
            collected.first().delete();
            return num;
        });
    const modifiedEmbed = EmbedBuilder.from(samplemsg.embeds[0]);
    modifiedEmbed.setFields([]);
    await samplemsg.edit({embeds: [modifiedEmbed]});
    for (let index = 1; index <= roleCount; index++) {
        await editRole(samplemsg, questionmsg, privt, index);
    }
}

async function editRole(samplemsg, questionmsg, privt, index){ 
    let newRole = await askQuestion('What will role' + index + ' be? Must include an emoji for the Button. Example: 👻Ghosts', privt, questionmsg, index);
    newRole = newRole.content;
    const modifiedEmbed = EmbedBuilder.from(samplemsg.embeds[0]);
    const origFields = samplemsg.embeds[0].fields;
    let origModRow = samplemsg.components[1]; //second ActionRow, modifiers

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

    const row = [];
    row.push(newRow);
    if (origModRow != undefined & origModRow != null) {
        row.push(origModRow);
    }
    await samplemsg.edit({embeds: [modifiedEmbed], components: row});
    return ;
}

module.exports = {editRoles};