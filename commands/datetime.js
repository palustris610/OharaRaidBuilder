const { SlashCommandBuilder } = require('@discordjs/builders');
const { time } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('datetime')
		.setDescription('Enter a datetime value with format: 2011-05-24T23:12:00')
		.addStringOption(option =>
			option.setName('datetime')
				.setDescription('Date and time. Format: 2011-12-30T20:48:00')
				.setRequired(true)),
	async execute(interaction) {
		const datetime = interaction.options.getString('datetime');
		const text = 'Your datetime: ' + time(new Date(datetime)) +
		'\nRelative time: ' + time(new Date(datetime), 'R');
		return interaction.reply(text);
	},
};