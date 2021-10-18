const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const text = 'We are going to fight X raid boss at Monday. Preapre for trouble! And make it double!\n**Participants:**' +
'\n<:tank:459085521931468800>Tanks\n' +
'\n<:healer:459085474481438730>Healers\n' +
'\n<:dps:459085595667595274>DPSs\n' +
'\nPlease look forward to it! :)';
const row = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('tank')
			// .setLabel('Tank')
			.setStyle('SECONDARY')
			.setEmoji('459085521931468800'),
		new MessageButton()
			.setCustomId('healer')
			// .setLabel('Healer')
			.setStyle('SECONDARY')
			.setEmoji('459085474481438730'),
		new MessageButton()
			.setCustomId('dps')
			// .setLabel('DPS')
			.setStyle('SECONDARY')
			.setEmoji('459085595667595274'),
	);
const embed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('New Raid!')
	// .setURL('https://discord.js.org')
	.setDescription(text);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buttontest')
		.setDescription('Testing Buttons and Embeds in replies!'),
	async execute(interaction) {
		return interaction.reply({ content: 'PING HERE', components: [row], embeds: [embed] });
	},
};