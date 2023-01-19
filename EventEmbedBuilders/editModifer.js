const { EmbedBuilder } = require('discord.js');
const { updateModifierButtons } = require('./updateModifierButtons.js');

async function editRole(message, newModifier, index){ 
    const origRoleRow = message.components[0]; //first ActionRow, roles
    const origModRow = message.components[1]; //second ActionRow, modifiers
    const newModifiers = [];
    let updated = false;
    origModRow.components.forEach((button,i) => {
        if (i == index) {
            updated = true;
            newModifiers.push(newModifier);
        }
        else {
            newModifiers.push(button.emoji);
        }
    });
    if (!updated) {
        newModifiers.push(newModifier);
    }

    //update buttons -> generate a new button row
    const newRow = updateModifierButtons(newModifiers);
    await message.edit({components: [origRoleRow, newRow]});
    return ;
}

module.exports = {editRole};