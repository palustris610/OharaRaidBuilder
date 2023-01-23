const { EmbedBuilder } = require('discord.js');
const { askQuestion } = require("./askQuestion")
const questionText = 'Please specify a color.' + 
                    '\nCan be a string (Red, DarkAqua, LuminousVividPink, case sensitive!), hex code (0x1DF4C2), or RGB array ([0, 127, 255]).' + 
                    '\nFor further information: <https://discord.js.org/#/docs/main/main/typedef/ColorResolvable>'

async function editColor(samplemsg, questionmsg, privt){
    let newColor = await askQuestion(questionText, privt, questionmsg);
    newColor = newColor.content;
    if (newColor.includes('[')) {
        let temp = newColor.substring(1);
        newColor = [];
        temp = temp.substring(0, temp.length - 1);
        temp = temp.split(',');
        temp.forEach(color => {
            newColor.push(Number(color.trim()));
        });
    }
    const modifiedEmbed = EmbedBuilder.from(samplemsg.embeds[0]);
    modifiedEmbed.setColor(newColor);
    await samplemsg.edit({embeds: [modifiedEmbed]})
    return 0;
}

module.exports = {editColor}