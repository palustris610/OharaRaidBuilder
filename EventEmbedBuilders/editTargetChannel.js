const { askQuestion } = require('./askQuestion');
const questionText = 'Which Channel will be the Event posted to? Mention the channel using #channelname';

async function editTargetChannel(samplemsg, questionmsg, privt){ //or embed directly?
    let newChannel = await askQuestion(questionText, privt, questionmsg);
    newChannel = newChannel.content;
    const origContent = samplemsg.content;
    const channelString = 'Target channel: ';
    const mentionString = '\nTarget mention: ';
    let newContent = '';
    let origMention = '';
    if (origContent.includes(channelString)) {
        newContent = origContent.substring(0, origContent.indexOf(': ') + 2);
    }
    else {
        newContent = channelString;
    }
    if (origContent.includes(mentionString)) {
        origMention = origContent.substring(origContent.indexOf('\n'));
    }
    else {
        origMention = mentionString;
    }
    newContent = newContent + newChannel + origMention;
    await samplemsg.edit({content: newContent, allowedMentions: {parse: []}});
    return 0;
}

module.exports = {editTargetChannel};