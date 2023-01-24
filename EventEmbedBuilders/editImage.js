const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { askQuestion } = require('./askQuestion');
let https = require(`https`);
let fs = require(`fs`);

async function download(url){
    const request = https.get(url, (response) => {
        const file = fs.createWriteStream("file.png");
        response.pipe(file);
    
       // after download completed close filestream
        file.on("finish", () => {
            file.close();
            console.log("Download Completed");
        });
    });
}

async function editImage(samplemsg, questionmsg, privt){ //or embed directly?
    let newImage = await askQuestion('Send a link to an image, which will be the main image.', privt, questionmsg);
    const modifiedEmbed = EmbedBuilder.from(samplemsg.embeds[0]);

    

    if (newImage.content == '') {
        if (newImage.attachments.first().filename === 'png') {
            await download(newImage.attachments.first().url);
        }



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