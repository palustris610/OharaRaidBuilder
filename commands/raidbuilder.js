const { SlashCommandBuilder } = require('@discordjs/builders');
// const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const rtb = require('../raidtextbuilder.js');
// const row = new MessageActionRow()
// 	.addComponents(
// 		new MessageButton()
// 			.setCustomId('Tank')
// 			.setStyle('SECONDARY')
// 			.setEmoji('459085521931468800'),
// 		new MessageButton()
// 			.setCustomId('Healer')
// 			.setStyle('SECONDARY')
// 			.setEmoji('459085474481438730'),
// 		new MessageButton()
// 			.setCustomId('DPS')
// 			.setStyle('SECONDARY')
// 			.setEmoji('459085595667595274'),
// 	);

// .setTitle('New Raid!')
// .setURL('https://discord.js.org')
// .setDescription(text);
module.exports = {
	data: new SlashCommandBuilder()
		.setName('raidbuilder')
		.setDescription('Builds a Raid invitation form')
		.addStringOption(option =>
			option.setName('title')
				.setDescription('Title of the Raid')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('description')
				.setDescription('Description of the Raid')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('datetime')
				.setDescription('Date and time of the Raid. Format: 2011-10-10T14:48:00')
				.setRequired(true))
		.addRoleOption(option =>
			option.setName('ping')
				.setDescription('Which role to mention?')
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('first_timers')
				.setDescription('First timer marks, if needed')
				.setRequired(false))
		.addBooleanOption(option =>
			option.setName('loot_need')
				.setDescription('Loot need, if needed')
				.setRequired(false)),
	async execute(interaction) {
		return interaction.reply(rtb.raidtextbuilder(interaction.options.getString('title'),
			interaction.options.getString('description'),
			interaction.member.displayName,
			interaction.options.getString('datetime'),
			interaction.options.getRole('ping'),
			interaction.options.getBoolean('first_timers'),
			interaction.options.getBoolean('loot_need')));
		// return interaction.reply({ content: interaction.options.getRole('ping'), embeds: [embed], components: [row] });
	},
};
