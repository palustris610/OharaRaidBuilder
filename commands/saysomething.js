const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('saysomething')
		.setDescription('Says Something!'),
	async execute(interaction) {
		await interaction.reply('pog');
		await interaction.deleteReply();
		return interaction.channel.send('Something!');
	},
};