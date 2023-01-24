const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isButton()) return;
		if (!interaction.customId.includes('role') | interaction.customId.includes('roles')) {
			return;
		}
		let emojiId = '';
		const idNumber = Number(interaction.customId.substring(interaction.customId.length - 1));
		if (interaction.component.emoji.id != null) {
			emojiId = interaction.component.emoji.id;
		}
		else {
			emojiId = interaction.component.emoji.name;
		}
		let nick = '<@' + interaction.member.id + '>'; //@nickname
		console.log(nick + interaction.member.displayName + ' pushed button: ' + emojiId + ' at ' + new Date().toLocaleString('hu-HU', { timeZone: 'UTC' }) + ' UTC');
		nick = nick + '\u200B';
		const msg = interaction.message;
		//const emb = EmbedBuilder.from(msg.embeds[0]);
		const emb = msg.embeds[0];
		//const flds = emb.fields;
		const new_flds = [];
		let occurrence = '';
		emb.fields.forEach(fld => { //check if exists, copy if yes
			const lines = fld.value.split('\n');
			lines.forEach(element => {
				if (element.includes(nick)) {
					occurrence = element; //new system, copy whole line. should be the same everywhere
				}
			});
		});
		if (occurrence == '') {
			occurrence = nick;
		}
		for (let index = 0; index < emb.fields.length; index++) {
			const fld = emb.fields[index];
			if (index == (idNumber - 1)) {
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
					let new_element = occurrence;
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
		const new_embed = EmbedBuilder.from(msg.embeds[0]);
		new_embed.setFields(new_flds);
		// emb.setFields(new_flds);
		interaction.update({ content: msg.content, embeds: [new_embed], components: msg.components });
	},
};
function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
  }