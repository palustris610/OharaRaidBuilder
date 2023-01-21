const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isButton()) return;
		if (!interaction.customId.includes('modifier') | interaction.customId.includes('modifiers')) {
			return;
		}
		let emojiId = '';
		if (interaction.component.emoji.id != null) {
			emojiId = '<:' + interaction.component.emoji.name + ':' +interaction.component.emoji.id + '>';
		}
		else {
			emojiId = interaction.component.emoji.name;
		}
		const nick = '<@' + interaction.member.id + '>';
		console.log(nick + interaction.member.displayName + ' pushed button: ' + emojiId + ' at ' + new Date().toLocaleString('hu-HU', { timeZone: 'UTC' }) + ' UTC')
		let present = false;
		const msg = interaction.message;
		const emb = msg.embeds[0];
		// const flds = emb.fields;
		let occurrence = '';
		// Step1: search the player in all fields -> if not present, return error!
		// > <@123><gitgut><moneybag>
		emb.fields.forEach(fld =>{
			const lines = fld.value.split('\n');
			lines.forEach(element => {
				// Step2: if present, get previous state of modifiers
				if (element.includes(nick)) {
					present = true;
					occurrence = element;
				}
			});
		});
		if (!present) {
			// reply with error (ephemeral warning?)
			interaction.reply({content: 'Select a Role first!', ephemeral: true}); //TESTING
			return;
		}
		const modifs = occurrence.split('\u200B');
		if (modifs.includes(emojiId)) {
			for( var i = 0; i < modifs.length; i++){ 
	
				if ( modifs[i] === emojiId) { 
			
					modifs.splice(i, 1); 
				}
			}
		}
		else {
			modifs.push(emojiId);
		}
		occurrence = modifs.join('\u200B');
		
		// Step3: insert or delete the appropriate emoji, dont touch the rest
		const new_flds = [];
		emb.fields.forEach(fld => {
			//search for player
			if (fld.value.includes(nick)) {
				const lines = fld.value.split('\n');
				const new_lines = [];
				lines.forEach(element => {
				// Step2: if present, get previous state of first_timer and loot_need -> same code, make search criteria dynamic
					if (element.includes(nick)) {
						let new_element = occurrence;
						new_lines.push(new_element);
					}
					else {
						new_lines.push(element);
					}
				});
				// reassign field value with newlines
				const text = new_lines.join('\n');
				new_flds.push({ name: fld.name, value: text, inline: fld.inline });
			}
			else {
				// keep the old one if not in list
				new_flds.push(fld);
			}
		});

		const new_embed = new EmbedBuilder(emb)
			.setFields(new_flds);

		interaction.update({ content: msg.content, embeds: [new_embed], components: msg.components });
		// console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};
