const {  ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EmojiSearch } = require('./emojiSearch');

function updateRoleButtons(newRoles){ 
    let row = new ActionRowBuilder();
    row.setComponents([]);
    newRoles.forEach((field, index) => {
        row.addComponents(new ButtonBuilder()
            .setCustomId('role' + (index + 1))
            .setEmoji(EmojiSearch(field.name))
            .setStyle(ButtonStyle.Secondary));
    });
    console.log(row);
    return row;
}

module.exports = {updateRoleButtons};