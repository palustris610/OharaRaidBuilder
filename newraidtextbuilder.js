const {  ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
const { time } = require('@discordjs/builders');
const row = new ActionRowBuilder();

function raidtextbuilder(raidtitle, description, creator, datetime, roles, modifiers, imageurl, ping) {
	console.log('Dynamic builder sent by: ' + creator);
	console.log('Strings: ' + raidtitle + ';' + description + ';' + datetime + ';' + imageurl + ';' + ping);
	console.log('Roles:');
	console.log(roles);
	console.log('Modifiers:');
	console.log(modifiers);
	let ping_text = '\u200B';
	if (ping != null) {
		ping_text = ping_text + ping.toString();
	}
	let additional_description = '\nEvent time: ' + time(new Date(datetime)) +
	'\nRelative time: ' + time(new Date(datetime), 'R');
	
	let embed = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle(raidtitle)
		.setDescription(description + additional_description)
		.setTimestamp(new Date(datetime))
		.setFooter({text:'Event by ' + creator});
	let counter = 1;
	roles.forEach(element => {
		const roleText = element.value;
		let emojiId = '';
		if (roleText.includes('<:')) {
			emojiId = roleText.substring(roleText.indexOf(':',3) + 1,roleText.indexOf('>'));
		}
		else {
			emojiId = roleText.match(/\p{Emoji}+/gu).pop();
			console.log(roleText);
			console.log(emojiId);
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
	
	if (imageurl != null) {
		embed = embed.setThumbnail(imageurl);
	}
	return { content: ping_text, embeds: [embed], components: [row] };
}


module.exports = { raidtextbuilder };