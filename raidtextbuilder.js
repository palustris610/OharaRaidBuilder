const {  ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
const { time } = require('@discordjs/builders');
const text_tanks = '\n<:tank:1063529804432949378>Tanks\n';
const text_healers = '\n<:healer:1063529792462409759>Healers\n';
const text_dpss = '\n<:dps:1063529776385642616>DPS\n';
const text_first_timers = '\nFirst timers are marked with <:ariagitgut:752675425905541120>';
const text_loot_need = '\nLoot needers are marked with 💰';
const row = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('tank')
			.setStyle(ButtonStyle.Secondary)
			.setEmoji('459085521931468800'),
		new ButtonBuilder()
			.setCustomId('healer')
			.setStyle(ButtonStyle.Secondary)
			.setEmoji('459085474481438730'),
		new ButtonBuilder()
			.setCustomId('dps')
			.setStyle(ButtonStyle.Secondary)
			.setEmoji('459085595667595274'),
	);

function raidtextbuilder(raidtitle, description, creator, datetime, imageurl, ping, first_timers, loot_need) {
	let ping_text = '\u200B';
	if (ping != null) {
		ping_text = ping_text + ping.toString();
	}
	let additional_description = '\nEvent time: ' + time(new Date(datetime)) +
	'\nRelative time: ' + time(new Date(datetime), 'R');
	if (first_timers) {
		additional_description = additional_description + text_first_timers;
		row.addComponents(new ButtonBuilder()
			.setCustomId('first_timer')
			.setStyle(ButtonStyle.Secondary)
			.setEmoji('752675425905541120'));
	}
	if (loot_need) {
		additional_description = additional_description + text_loot_need;
		row.addComponents(new ButtonBuilder()
			.setCustomId('loot_need')
			.setStyle(ButtonStyle.Secondary)
			.setEmoji('💰'));
	}
	let embed = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle(raidtitle)
		.setDescription(description + additional_description)
		.setTimestamp(new Date(datetime))
		.setFooter({text:'Event by ' + creator})
		.addFields(
			{
				name: text_tanks,
				value: '\u200B',
				inline: true,
			},
			{
				name: text_healers,
				value: '\u200B',
				inline: true,
			},
			{
				name: text_dpss,
				value: '\u200B',
				inline: true,
			},
		);
	if (imageurl != null) {
		embed = embed.setThumbnail(imageurl);
	}
	return { content: ping_text, embeds: [embed], components: [row] };
}


module.exports = { raidtextbuilder };