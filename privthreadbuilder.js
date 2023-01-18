const {  ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
const { time } = require('@discordjs/builders');
let row = new ActionRowBuilder();

function raidtextbuilder(raidtitle, description, creator, datetime, roles, modifiers, imageurl, ping) {
	// console.log('Dynamic builder sent by ' + creator.value + ' at ' + new Date().toLocaleString('hu-HU', { timeZone: 'UTC' }));
	// console.log('Strings: ' + raidtitle.value + ';' + description.value + ';' + datetime.value + ';' + imageurl.value + ';' + ping.value);
	// console.log('Roles:');
	// console.log(roles);
	// console.log('Modifiers:');
	// console.log(modifiers);
	let ping_text = '\u200B';
	if (ping.value != null & ping.value != undefined) {
		ping_text = ping_text + ping.value.toString();
	}
	let additional_description = '\nEvent time: ' + time(new Date(datetime.value)) +
	'\nRelative time: ' + time(new Date(datetime.value), 'R');
	
	let embed = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle(raidtitle.value)
		.setDescription(description.value + additional_description)
		//.setTimestamp(new Date(datetime.value))
		.setFooter({text:'Event by ' + creator.value});
	let counter = 1;
	row = new ActionRowBuilder();
	roles.forEach(element => {
		const roleText = element.value;
		let emojiId = '';
		if (roleText.includes('<:')) {
			emojiId = roleText.substring(roleText.indexOf(':',3) + 1,roleText.indexOf('>'));
		}
		else {
			emojiId = roleText.match(/\p{Emoji}+/gu).pop();
		}
		row.addComponents( //Button
			new ButtonBuilder()
				.setCustomId('role'+counter)
				.setStyle(ButtonStyle.Secondary)
				.setEmoji(emojiId)
		);
		embed.addFields( //Embed field
			{
				name: roleText,
				value: '\u200B',
				inline: true
			}
		);
		counter++;
	});
	counter = 1;
	if (modifiers.length > 0) {
		modifiers.forEach(element => {
			const modifierText = element.value;
			let emojiId = '';
			if (modifierText.includes('<:')) {
				emojiId = modifierText.substring(modifierText.indexOf(':',3) + 1, modifierText.indexOf('>'));
			}
			else{
				emojiId = modifierText;
			}
			row.addComponents(new ButtonBuilder()
				.setCustomId('modifier'+counter)
				.setStyle(ButtonStyle.Secondary)
				.setEmoji(emojiId));
			counter++;
		});
	}
	
	if (imageurl.value != null & imageurl.value != undefined) {
		embed = embed.setThumbnail(imageurl.value);
	}
	return { content: ping_text, embeds: [embed], components: [row] };
}


module.exports = { raidtextbuilder };