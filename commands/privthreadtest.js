const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType, ThreadChannel } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('privthread')
		.setDescription('Private Thread Test'),
	async execute(interaction) {
		const memberId = interaction.member.id;
		await interaction.reply({content: 'Check the private thread!', ephemeral: true});
		const privt = await interaction.channel.threads.create({
			name: 'Event Building Test',
			type: ChannelType.PrivateThread,
			reason: 'Create your next Event'
			});
		await privt.join();
		await privt.send('Hey <@' + memberId + '>!');
		//or thread.members.add()
		await privt.send('Give me a title:');
		await privt.awaitMessages({max: 1, time: 60_000, errors: ['time']})
			.then(collected => {
				console.log(collected);
				//privt.send(collected.first().content);
			})
			.catch(something => {
				console.log(something);
				privt.send('Y U NO RESPOND');
			})
		//do more questions

		await privt.send('OK BYE');
		await wait(10_000);
		await privt.delete();
		console.log('deleted thread');
	},
};