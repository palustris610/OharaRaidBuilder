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

module.exports = {
	data: new SlashCommandBuilder()
		.setName('privthread')
		.setDescription('Private Thread Test'),
	async execute(interaction) {
		const memberId = interaction.member.id;
		creator.value = interaction.member.displayName;
		console.log(memberId + ' ' + creator.value + ' invoked command privthread.');
		const privt = await interaction.channel.threads.create({
			name: 'Event Building Test',
			type: ChannelType.PrivateThread,
			reason: 'Create your next Event'
			});
		await privt.join();
		await interaction.reply({content: 'Check the private thread!\n<#' + privt.id + '>', ephemeral: true});
		await privt.send('Hey there <@' + memberId + '>! Here\'s a the sample of your new event. Please answer the questions as they pop up, and i will modify the sample as we go along.');
		await wait(2000);
		const samplemsg = await privt.send(ptb.raidtextbuilder(raidtitle, description, creator, datetime, roles, modifiers, imageurl, ping));
		await wait(2000);
		const questionmsg = await privt.send('Here comes the questions!');
		await wait(2000);
		//Mandatory questions
		await editTargetChannel(samplemsg, questionmsg, privt);
		await editTitle(samplemsg, questionmsg, privt);
		await editDescription(samplemsg, questionmsg, privt);
		await editTime(samplemsg, questionmsg, privt);
		await editRoles(samplemsg, questionmsg, privt);	
		
		let notFinished = true;
		const expectedIDs = ['channel', 'title', 'description', 'datetime', 'roles', 'modifiers', 'image', 'thumbnail', 'color', 'mention', 'publish', 'cancel'];
		const filter = inter => expectedIDs.includes(inter.customId);
		while (notFinished) {
			await questionmsg.edit({content: 'The mandatory questions are done. Would you like to use the optional features, edit any of the properties, or post the Event?', components: editRows});
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
					const isPublished = await  publishEvent(samplemsg, questionmsg, privt);
					console.log(isPublished);
					if (isPublished == 'yesPublish') {
						notFinished = false;
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
		//Input validations:
		//-wrap all methods in trycatch, give feedback for errors
		//-channel must be a channel mention
		//-title, description is just text
		//-datetime must be a valid date
		//-roles and modifiers must have emojis
		//-ping must be a mention of a role or everyone, etc
		//-image must be a hyperlink? or maybe attachment?

		await privt.send('Okay, we\'re finished. Bye!');
		await wait(5_000);
		await privt.delete();
		console.log('deleted thread');
	},
};



async function askQuestionWithButtons(questionText, func, privt, questionmsg, samplemsg, index){
	await questionmsg.edit(questionText);
	await privt.awaitMessages({max: 1})
			.then(collected => {
				const exit = func(samplemsg, collected.first().content, index);
				collected.first().delete(); //try deleting the answer so save space
				return exit;
			});
}