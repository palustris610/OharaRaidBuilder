const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dmtest')
		.setDescription('DM Test'),
	async execute(interaction) {
		const memberId = interaction.member.id;
		const filt = m => m.length > 0;
		await interaction.reply({ content: 'I will ask questions in DMs.', ephemeral: true });
		const msg = await interaction.user.send('Let\'s build the event.');
		msg.channel.send('Give me a title:')
			.then(collected => {
				msg.channel.awaitMessages({filter: filt, max: 1, time: 20_000})
					.then(() => {
						msg.channel.send('title: ' + collected.first().content);
					});
			});
		// Errors: ['time'] treats ending because of the time limit as an error
		// await msg.channel.awaitMessages({ filter: filt, max: 1, time: 20_000 })
		// 	.then(collected => console.log(collected));
		// await msg.channel.send('Give a description of the Event:');
		// await msg.channel.awaitMessages({ filter: filt,  max: 1, time: 20_000 })
		// 	.then(collected => console.log(collected));
	},
};