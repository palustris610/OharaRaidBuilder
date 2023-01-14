const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');
//const { raidtextbuilder } = require('../raidtextbuilder.js');
module.exports ={
    data: new ContextMenuCommandBuilder()
	.setName('Edit raid')
	.setType(ApplicationCommandType.Message),
    async execute (interaction) {
        const msg = interaction.targetMessage;
        const emb = EmbedBuilder.from(msg.embeds[0]).setTitle('EDITED');
        await interaction.targetMessage.edit({embeds: [emb]});
        await interaction.reply({content: 'edited', ephemeral: true});
    }
}