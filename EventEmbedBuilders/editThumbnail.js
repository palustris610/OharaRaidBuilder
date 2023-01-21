const { EmbedBuilder } = require('discord.js');
const { askQuestion } = require('./askQuestion');

async function editThumbnail(samplemsg, questionmsg, privt){ //or embed directly?
    const newThumbnail = await askQuestion('Send a link to an image, which will be the Thumbnail image.', privt, questionmsg);
    const modifiedEmbed = EmbedBuilder.from(samplemsg.embeds[0]);
    modifiedEmbed.setThumbnail(newThumbnail);
    await samplemsg.edit({embeds: [modifiedEmbed]})
    return 0;
}

module.exports = {editThumbnail};