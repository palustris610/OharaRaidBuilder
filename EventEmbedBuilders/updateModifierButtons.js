const {  ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EmojiSearch } = require('./emojiSearch');

function updateModifierButtons(newModifiers){ 
    let row = new ActionRowBuilder();
    row.setComponents([]);
    if (newModifiers.length > 0) {
        newModifiers.forEach((modif, index) => {
            row.addComponents(new ButtonBuilder()
                .setCustomId('modifier' + (index + 1))
                .setEmoji(EmojiSearch(modif))
                .setStyle(ButtonStyle.Secondary));
        });
    }
    console.log(row);
    return row;
}

module.exports = {updateModifierButtons};