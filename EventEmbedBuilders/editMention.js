const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

async function editMention(samplemsg, questionmsg, privt){ //or embed directly?
    let menu = new StringSelectMenuBuilder()
        .setCustomId('rolemention')
        .setPlaceholder('Please select the roles.');
    const origContent = samplemsg.content;
    let cutOrigContent = origContent.substring(origContent.indexOf('mention: ') + 9);
    cutOrigContent = cutOrigContent.substring(0, cutOrigContent.length - 1);
    const origRoleList = cutOrigContent.split('>, <@&');
    console.log(origRoleList);
    const roleList = await privt.guild.roles.fetch();
    roleList.forEach(role => {
        const isDefault = origRoleList.includes(role.id);
        menu.addOptions({
            label: role.name,
            description: role.name,
            value: role.id,
            default: isDefault
        });
    });
    menu.setMinValues(0);
    menu.setMaxValues(Number(roleList.size));
    const row = new ActionRowBuilder().setComponents(menu);
    await questionmsg.edit({content: 'Please select a mention option:', components: [row]});
    const filter = inter => inter.customId == 'rolemention';
    const newMentions = await privt.awaitMessageComponent({filter, max: 1})
        .then(interaction => {
            interaction.deferUpdate();
            return interaction.values;
        });
    const newMentionString = '<@&' + newMentions.join('>, <@&') + '>';

    
    const channelString = 'Target channel: ';
    const mentionString = '\nTarget mention: ';
    let newContent = '';

    if (!origContent.includes(channelString)) { 
        newContent = channelString;
    }
    else {
        newContent = origContent.substring(0, origContent.indexOf('\n')); //channel line saved, with channel mention, ignore old rolemention
    }
    newContent = newContent + mentionString + newMentionString;
    await samplemsg.edit({content: newContent, allowedMentions: {parse: []}});
    return 0;
}

module.exports = {editMention};