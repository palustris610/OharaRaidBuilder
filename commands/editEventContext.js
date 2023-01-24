const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');
const { editEvent } = require('../EventEmbedBuilders/editEvent');
//const { raidtextbuilder } = require('../raidtextbuilder.js');
module.exports ={
    data: new ContextMenuCommandBuilder()
	.setName('Edit Event')
	.setType(ApplicationCommandType.Message),
    async execute (interaction) {
        const msg = interaction.targetMessage;
        editEvent(msg);
        await interaction.reply({content: 'Editing should be available now.', ephemeral: true});
    }
}