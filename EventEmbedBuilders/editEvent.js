const { SlashCommandBuilder } = require('discord.js');
const { ChannelType, ThreadChannel, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { cancelBuilding } = require('../EventEmbedBuilders/cancelBuilding.js');
const { editColor } = require('../EventEmbedBuilders/editColor.js');
const { editDescription } = require('../EventEmbedBuilders/editDescription.js');
const { editImage } = require('../EventEmbedBuilders/editImage.js');
const { editMention } = require('../EventEmbedBuilders/editMention.js');
const { editModifiers } = require('../EventEmbedBuilders/editModifer.js');
const { editRoles } = require('../EventEmbedBuilders/editRole.js');
const { editTargetChannel } = require('../EventEmbedBuilders/editTargetChannel.js');
const { editThumbnail } = require('../EventEmbedBuilders/editThumbnail.js');
const { editTime } = require('../EventEmbedBuilders/editTime.js');
const { editTitle } = require('../EventEmbedBuilders/editTitle.js');
const { publishEvent } = require('../EventEmbedBuilders/publishEvent.js');
const wait = require('node:timers/promises').setTimeout;
const ptb = require('../privthreadbuilder.js');

const raidtitle = {value: 'Title here'}, description = {value: 'Description here'}, creator = {value: ''}, datetime = {value: '2077-07-07T07:07:07'};
const roles = [{name: 'role1', value: '👻Ghosts'}], modifiers = [], imageurl = {value: undefined}, ping = {value: undefined};

const editRows = [new ActionRowBuilder()
					.setComponents([new ButtonBuilder().setCustomId('channel').setLabel('TargetChannel').setStyle(ButtonStyle.Primary),
									new ButtonBuilder().setCustomId('title').setLabel('Title').setStyle(ButtonStyle.Primary),
									new ButtonBuilder().setCustomId('description').setLabel('Description').setStyle(ButtonStyle.Primary),
									new ButtonBuilder().setCustomId('datetime').setLabel('Date&Time').setStyle(ButtonStyle.Primary),
									new ButtonBuilder().setCustomId('roles').setLabel('Roles').setStyle(ButtonStyle.Primary)]),
					new ActionRowBuilder()
					.setComponents([new ButtonBuilder().setCustomId('modifiers').setLabel('Modifiers').setStyle(ButtonStyle.Secondary),
									new ButtonBuilder().setCustomId('image').setLabel('Image').setStyle(ButtonStyle.Secondary),
									new ButtonBuilder().setCustomId('thumbnail').setLabel('Thumbnail').setStyle(ButtonStyle.Secondary),
									new ButtonBuilder().setCustomId('mention').setLabel('Mention').setStyle(ButtonStyle.Secondary),
									new ButtonBuilder().setCustomId('color').setLabel('Color').setStyle(ButtonStyle.Secondary)]),
					new ActionRowBuilder()
					.setComponents([new ButtonBuilder().setCustomId('publish').setLabel('Publish').setStyle(ButtonStyle.Success),
									new ButtonBuilder().setCustomId('cancel').setLabel('Cancel').setStyle(ButtonStyle.Danger)])
];


async function editEvent(samplemsg) {
    const privt = samplemsg.channel;
    const questionmsgQuery = await samplemsg.channel.messages.fetch({limit: 1, after: samplemsg.id});
    const questionmsg = questionmsgQuery.first();
    console.log(samplemsg);
    console.log(questionmsg);
    console.log(privt);

    //Check thread, if not thread, create one and copy there, add questionmsg -> at the end, edit the original, or post as new? could be question
    
    let notFinished = true;
    let eventLink = '';
    const expectedIDs = ['channel', 'title', 'description', 'datetime', 'roles', 'modifiers', 'image', 'thumbnail', 'color', 'mention', 'publish', 'cancel'];
    const filter = inter => expectedIDs.includes(inter.customId);
    while (notFinished) {
        await questionmsg.edit({content: 'Would you like to edit any of the properties, or post the Event?', components: editRows});
        let selection = await privt.awaitMessageComponent({filter, max: 1})
            .then(interaction => {
                interaction.deferUpdate();
                return interaction.customId;
            });
        switch (selection) {
            case 'channel': await editTargetChannel(samplemsg, questionmsg, privt); break;
            case 'title': await editTitle(samplemsg, questionmsg, privt); break;
            case 'description': await editDescription(samplemsg, questionmsg, privt); break;
            case 'datetime': await editTime(samplemsg, questionmsg, privt); break;
            case 'roles': await editRoles(samplemsg, questionmsg, privt); break;
            case 'modifiers': await editModifiers(samplemsg, questionmsg, privt); break;
            case 'image': await  editImage(samplemsg, questionmsg, privt); break;
            case 'thumbnail': await  editThumbnail(samplemsg, questionmsg, privt); break;
            case 'color': await  editColor(samplemsg, questionmsg, privt); break;
            case 'mention': await  editMention(samplemsg, questionmsg, privt); break;
            case 'publish': 
                const publishResult = await  publishEvent(samplemsg, questionmsg, privt);
                console.log(publishResult);
                if (publishResult.answer == 'yesPublish') {
                    notFinished = false;
                    eventLink = publishResult.message.url;
                }
                break;
            case 'cancel': 
                const isCancelled = await cancelBuilding(samplemsg, questionmsg, privt);
                console.log(isCancelled);
                if (isCancelled == 'yesCancel') {
                    notFinished = false;
                }
                break;
            default:
                //should be impossible because of filters
                break;
        }
    }

    await questionmsg.edit({content: 'Okay, we\'re finished. This thread will be deleted in 30 seconds. Bye!', components: []});
    if (eventLink != '') {
        await privt.send('You can find your event here: ' + eventLink);
    }
    await wait(30_000);
    await privt.delete();
    console.log('deleted thread');
}


module.exports = {editEvent};

