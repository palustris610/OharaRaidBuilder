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
				.setDescription('Date and time of the Raid. Format: 2011-12-30T20:48:00')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('imageurl')
				.setDescription('URL of a custom imagem, or choose one from the options.')
				.setRequired(false)
				.addChoice('FFXIV Logo', 'http://fanfest2.finalfantasyxiv.com/thumbs/1200x675c/2018-07/simplified.png')
				.addChoice('A Realm Reborn', 'https://img.finalfantasyxiv.com/lds/promo/h/r/l6eq3BOhy145X-sULOMDJFWUmg.png')
				.addChoice('Heavensward', 'https://img.finalfantasyxiv.com/lds/promo/h/N/2MK2uMX-m4uPXbeNPGvH_TnwOE.png')
				.addChoice('Stormblood', 'https://img.finalfantasyxiv.com/lds/promo/h/n/fs9-H58JXdcSL44DFZimt9-3-8.png')
				.addChoice('Shadowbringers', 'https://img.finalfantasyxiv.com/lds/promo/h/M/jmK4Q5CcFnBD1FfV90aw1zeUG8.png')
				.addChoice('Endwalker', 'https://img.finalfantasyxiv.com/lds/promo/h/A/eqkthVf5uqxgBzUv66zhucFFh4.png'))
		.addRoleOption(option =>
			option.setName('ping')
				.setDescription('Which Role to ping?')
				.setRequired(false))
		.addBooleanOption(option =>
			option.setName('first_timers')
				.setDescription('First timer marks, if needed. Default: False')
				.setRequired(false))
		.addBooleanOption(option =>
			option.setName('loot_need')
				.setDescription('Loot need, if needed. Default: False')
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
