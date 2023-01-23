const { EmbedBuilder } = require('discord.js');
const { askQuestion } = require('./askQuestion');

async function editThumbnail(samplemsg, questionmsg, privt){ //or embed directly?
    const newThumbnail = await askQuestion('Send a link to an image, which will be the Thumbnail image.', privt, questionmsg);
    const modifiedEmbed = EmbedBuilder.from(samplemsg.embeds[0]);
    if (newThumbnail.content == '') {
        modifiedEmbed.setThumbnail(newThumbnail.attachments.first().url);
        await samplemsg.edit({embeds: [modifiedEmbed]});
    }
    else {
        modifiedEmbed.setThumbnail(newThumbnail.content);
        await samplemsg.edit({embeds: [modifiedEmbed]});
    }
    return 0;
}

module.exports = {editThumbnail};