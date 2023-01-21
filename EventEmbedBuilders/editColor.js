const { EmbedBuilder } = require('discord.js');
const { askQuestion } = require("./askQuestion")
const questionText = 'Please specify a color.\nCan be a string (Red, DarkAqua, LuminousVividPink, case sensitive!), hex code (0x1DF4C2), or RGB array ([0, 127, 255]).\nhttps://discord.js.org/#/docs/main/main/typedef/ColorResolvable'

async function editColor(samplemsg, questionmsg, privt){
    const newColor = await askQuestion(questionText, privt, questionmsg);
    const modifiedEmbed = EmbedBuilder.from(samplemsg.embeds[0]);
    modifiedEmbed.setColor(newColor);
    await samplemsg.edit({embeds: [modifiedEmbed]})
    return 0;
}

module.exports = {editColor}