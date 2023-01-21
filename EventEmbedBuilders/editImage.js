const { EmbedBuilder } = require('discord.js');
const { askQuestion } = require('./askQuestion');

async function editImage(samplemsg, questionmsg, privt){ //or embed directly?
    const newImage = await askQuestion('Send a link to an image, which will be the main image.', privt, questionmsg);
    const modifiedEmbed = EmbedBuilder.from(samplemsg.embeds[0]);
    modifiedEmbed.setImage(newImage);
    await samplemsg.edit({embeds: [modifiedEmbed]})
    return 0;
}

module.exports = {editImage};