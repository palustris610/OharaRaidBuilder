const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { askQuestion } = require('./askQuestion');

async function editImage(samplemsg, questionmsg, privt){ //or embed directly?
    let newImage = await askQuestion('Send a link to an image, which will be the main image.', privt, questionmsg);
    const modifiedEmbed = EmbedBuilder.from(samplemsg.embeds[0]);
    if (newImage.content == '') {
        modifiedEmbed.setImage(newImage.attachments.first().url);
        await samplemsg.edit({embeds: [modifiedEmbed]});
    }
    else {
        modifiedEmbed.setImage(newImage.content);
        await samplemsg.edit({embeds: [modifiedEmbed]});
    }
    return 0;
}

module.exports = {editImage};