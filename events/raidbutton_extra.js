const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isButton()) return;
		const expected_ids = [ 'first_timer', 'loot_need' ];
		if (!expected_ids.includes(interaction.customId)) {
			return;
		}
		const moneybag = '💰';
		const gitgut = '<:ariagitgut:752675425905541120>';

		const nick = '<@' + interaction.member.id + '>';
		let first_timer = false;
		let loot_need = false;
		let present = false;
		const msg = interaction.message;
		const emb = msg.embeds[0];
		const flds = emb.fields;

		// Step1: search the player in all fields -> if not present, return error!
		// > <@123><gitgut><moneybag>
		for (let i = 0; i < flds.length; i++) {
			const fld = flds[i];
			// search field for player
			const lines = fld.value.split('\n');
			lines.forEach(element => {
				// Step2: if present, get previous state of first_timer and loot_need
				if (element.includes(nick)) {
					present = true;
					if (element.includes(gitgut)) {
						first_timer = true;
					}
					if (element.includes(moneybag)) {
						loot_need = true;
					}
				}
			});
		}
		if (!present) {
			// reply with error (ephemeral warning?)
			return;
		}
		// Step3: insert or delete the appropriate emoji, dont touch the rest
		const new_flds = [];
		for (let i = 0; i < flds.length; i++) {
			const fld = flds[i];
			// search field for player
			if (fld.value.includes(nick)) {
				const lines = fld.value.split('\n');
				const new_lines = [];
				lines.forEach(element => {
				// Step2: if present, get previous state of first_timer and loot_need -> same code, make search criteria dynamic
					if (element.includes(nick)) {
						let new_element = nick;
						// let new_element = '> ' + nick;
						if ((!first_timer && interaction.customId == 'first_timer') || (first_timer && interaction.customId != 'first_timer')) {
							new_element = new_element + gitgut;
						}
						if ((!loot_need && interaction.customId == 'loot_need') || (loot_need && interaction.customId != 'loot_need')) {
							new_element = new_element + moneybag;
						}
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
		}
		const new_embed = new EmbedBuilder(emb)
			.setFields(new_flds);

		interaction.update({ content: msg.content, embeds: [new_embed], components: msg.components });
		// console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};
