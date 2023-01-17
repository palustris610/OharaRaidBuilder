const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType, ThreadChannel } = require('discord.js');
const { editDescription } = require('../EventEmbedBuilders/editDescription.js');
const { editRole } = require('../EventEmbedBuilders/editRole.js');
const { editTargetChannel } = require('../EventEmbedBuilders/editTargetChannel.js');
const { editTime } = require('../EventEmbedBuilders/editTime.js');
const { editTitle } = require('../EventEmbedBuilders/editTitle.js');
const wait = require('node:timers/promises').setTimeout;
const ptb = require('../privthreadbuilder.js');

const raidtitle = {value: 'Title here'}, description = {value: 'Description here'}, creator = {value: ''}, datetime = {value: '2077-07-07T07:07:07'};
const roles = [{name: 'role1', value: '👻Ghosts'}], modifiers = [], imageurl = {value: undefined}, ping = {value: undefined};
module.exports = {
	data: new SlashCommandBuilder()
		.setName('privthread')
		.setDescription('Private Thread Test'),
	async execute(interaction) {
		const memberId = interaction.member.id;
		creator.value = interaction.member.displayName;
		
		const privt = await interaction.channel.threads.create({
			name: 'Event Building Test',
			type: ChannelType.PrivateThread,
			reason: 'Create your next Event'
			});
		await privt.join();
		await interaction.reply({content: 'Check the private thread!\n<#' + privt.id + '>', ephemeral: true});
		await privt.send('Hey there! Here\'s a the sample of your new event. Please answer the questions as they pop up, and i will modify the sample as we go along.');
		await wait(2000);
		const samplemsg = await privt.send(ptb.raidtextbuilder(raidtitle, description, creator, datetime, roles, modifiers, imageurl, ping));
		await wait(2000);
		const questionmsg = await privt.send('Here comes the questions!');
		await wait(2000);
		await askQuestionNew('Which Channel will be the Event posted to?', editTargetChannel, privt, questionmsg, samplemsg);
		await askQuestionNew('Give me a Title:', editTitle, privt, questionmsg, samplemsg);
		await askQuestionNew('Give me a Description:', editDescription, privt, questionmsg, samplemsg);
		await askQuestionNew('Give me a Date and time:   (Note the format: 2077-12-31T23:14:59)', editTime, privt, questionmsg, samplemsg);
		await questionmsg.edit('How many roles will be there? (1-5)');
		const roleCount = await privt.awaitMessages({max: 1})
			.then(collected => {
				const num = Number(collected.first().content);
				collected.first().delete();
				return num;
			});
		for (let index = 1; index <= roleCount; index++) {
			await askQuestionNew('What will be role' + index + '? Must include an emoji for the Button. Example: 👻Ghosts', editRole, privt, questionmsg, samplemsg, index)
		}
		
		//OPTIONAL STUFF
		//copy the roles for modifiers
		//how to image and thumbnail? 
		//how to do color (hex?)
		//ping

		//Show all optional stuff for full setup for the first time, or skip them and provide Edit options at the end

		await privt.send('OK BYE');
		//await wait(10_000);
		//await privt.delete();
		console.log('deleted thread');
	},
};

async function askQuestionNew(questionText, func, privt, questionmsg, samplemsg, index){
	await questionmsg.edit(questionText);
	await privt.awaitMessages({max: 1})
			.then(collected => {
				const exit = func(samplemsg, collected.first().content, index);
				collected.first().delete(); //try deleting the answer so save space
				return exit;
			});
}

