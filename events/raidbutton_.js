const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isButton()) return;
		const expected_ids = [ 'tank', 'healer', 'dps' ];
		if (!expected_ids.includes(interaction.customId)) {
			return;
		}
		const msg = interaction.message;
		const emb = msg.embeds[0];
		const flds = emb.fields;
		const new_flds = [];
		const nick = '<@' + interaction.member.id + '>';
		const moneybag = '💰';
		const gitgut = '<:ariagitgut:752675425905541120>';
		let first_timer = false;
		let loot_need = false;
		for (let i = 0; i < flds.length; i++) {
			const fld = flds[i];
			const lines = fld.value.split('\n');
			lines.forEach(element => {
				if (element.includes(nick)) {
					if (element.includes(gitgut)) {
						first_timer = true;
					}
					if (element.includes(moneybag)) {
						loot_need = true;
					}
				}
			});
		}
		for (let i = 0; i < flds.length; i++) {
			const fld = flds[i];
			if (fld.name.includes(interaction.customId)) {
				const value = fld.value.split('\n');
				const new_lines = [];
				let present_role = false;
				if (value.length > 0) {
					value.forEach(element2 => {
						if (!element2.includes(nick) && element2.length > 3) {
							new_lines.push(element2);
						}
						else if (element2.includes(nick)) {
							present_role = true;
						}
					});
				}
				if (!present_role) {
					let new_element = nick;
					if (first_timer) {
						new_element = new_element + gitgut;
					}
					if (loot_need) {
						new_element = new_element + moneybag;
					}
					new_lines.push(new_element);
				}
				let text = '\u200B';
				if (new_lines.length > 0) {
					text = new_lines.join('\n');
				}
				new_flds.push({ name: fld.name, value: text, inline: fld.inline });
			}
			else {
				new_flds.push(fld);
			}
		}
		const new_embed = new MessageEmbed(emb)
			.setFields(new_flds);

		interaction.update({ content: msg.content, embeds: [new_embed], components: msg.components });
		// console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};
