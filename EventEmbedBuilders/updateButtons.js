const {  ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
const rolebutton = require('../events/rolebutton');
//const { time } = require('@discordjs/builders');
const row = new ActionRowBuilder();

function updateButtons(message, newCollection, type){ 
    
    const origRow = message.components[0]; //First ActionRow
    let roleButtons = [];
    let modifButtons = [];
    origRow.components.forEach(btn => {
        if (btn.data.custom_id.includes('role')) {
            roleButtons.push(btn);
        }
        else{
            modifButtons.push(btn);
        }
    });
    if (type.includes('role')) {
        roleButtons.length = 0;
        newCollection.forEach((field, index) => {
            roleButtons.push(new ButtonBuilder()
                .setCustomId('role' + (index + 1))
                .setEmoji(EmojiSearch(field.name))
                .setStyle(ButtonStyle.Secondary));
        });
    }
    else {
        modifButtons = [];
        newCollection.forEach((field, index) => {
            modifButtons.push(new ButtonBuilder()
                .setCustomId('modifier' + (index + 1))
                .setEmoji(EmojiSearch(field.name))
                .setStyle(ButtonStyle.Secondary));
        });
    }
    console.log(roleButtons);
    console.log(modifButtons);
    console.log(row);
    // roleButtons.forEach(element => {
    //     row.addComponents(element);
    //     console.log(row);
    // });
    row.setComponents(roleButtons);
    if (modifButtons.length > 0) {
        modifButtons.forEach(element => {
            row.addComponents(element);
        });
    }
    console.log(row);
    return row;
}

function EmojiSearch(input){
    if (input.includes('<:')) {
        return input.substring(input.indexOf(':',3) + 1,input.indexOf('>'));
    }
    else {
        return input.match(/\p{Emoji}+/gu).pop();
    }
}

module.exports = {updateButtons};