const {  EmbedBuilder } = require('discord.js');
const { time } = require('@discordjs/builders');
const { askQuestion } = require('./askQuestion');
const questionText = 'Give me a Date and time:' + 
                    '\nNote the format: YYYY MM DD hh:mm, MM DD YYYY hh:mm, UTC+0 timezone accepted. For further information: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse>' + 
                    '\n```2077 05 07 14:32, 2045 jan 3 21:12 UTC+1, feb 11 2045 10:00 UTC-2```';

async function editTime(samplemsg, questionmsg, privt){ //or embed directly?
    const datetime = await askQuestion(questionText, privt, questionmsg);
    const newTime = new Date(Date.parse(datetime));
    if (newTime == NaN) {
        //error, invalid string input, could not parse to datetime
    }
    const modifiedEmbed = EmbedBuilder.from(samplemsg.embeds[0]);
    const origDescript = samplemsg.embeds[0].description;
    const descriptionStuff = origDescript.substring(0, origDescript.indexOf('\nEvent time:'));
    const timeString = '\nEvent time: ' + time(newTime) +
	'\nRelative time: ' + time(new Date(Date.parse(newTime)), 'R');
    modifiedEmbed.setDescription(descriptionStuff + timeString);
    await samplemsg.edit({embeds: [modifiedEmbed]})
    return 0;
}

module.exports = {editTime};