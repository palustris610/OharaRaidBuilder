const { SlashCommandBuilder } = require('@discordjs/builders');
const nrtb = require('../newraidtextbuilder.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('dynamicbuilder')
		.setDescription('Event builder.')
        .addStringOption(option =>
			option.setName('title')
				.setDescription('Title of the Raid')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('description')
				.setDescription('Description of the Raid')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('datetime')
				.setDescription('Date and time of the Raid. Format: 2011-12-30T20:48:00')
				.setRequired(true))
        .addStringOption(option =>
            option.setName('role1')
                .setDescription('First role, required, format: <:tank:1063529804432949378>Tanks')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('role2')
                .setDescription('Additional role, optional, format: <:healer:1063529792462409759>Healers')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('role3')
                .setDescription('Additional role, optional, format: <:dps:1063529776385642616>DPS')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('role4')
                .setDescription('Additional role, optional, format: 👸Queens')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('role5')
                .setDescription('Additional role, optional, format: 🤴Kings')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('modifier1')
                .setDescription('Modifier emoji for participants, optional, format: 👻')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('modifier2')
                .setDescription('Modifier emoji for participants, optional, format: 🤡')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('modifier3')
                .setDescription('Modifier emoji for participants, optional, format: 💩')
                .setRequired(false))
        .addStringOption(option =>
			option.setName('imageurl')
				.setDescription('Thumbnail image.')
				.setRequired(false)
				.addChoices({name:'FFXIV Logo', value:'http://fanfest2.finalfantasyxiv.com/thumbs/1200x675c/2018-07/simplified.png'})
				.addChoices({name:'A Realm Reborn', value:'https://img.finalfantasyxiv.com/lds/promo/h/r/l6eq3BOhy145X-sULOMDJFWUmg.png'})
				.addChoices({name:'Heavensward', value:'https://img.finalfantasyxiv.com/lds/promo/h/N/2MK2uMX-m4uPXbeNPGvH_TnwOE.png'})
				.addChoices({name:'Stormblood', value:'https://img.finalfantasyxiv.com/lds/promo/h/n/fs9-H58JXdcSL44DFZimt9-3-8.png'})
				.addChoices({name:'Shadowbringers', value:'https://img.finalfantasyxiv.com/lds/promo/h/M/jmK4Q5CcFnBD1FfV90aw1zeUG8.png'})
				.addChoices({name:'Endwalker', value:'https://img.finalfantasyxiv.com/lds/promo/h/A/eqkthVf5uqxgBzUv66zhucFFh4.png'}))
		.addRoleOption(option =>
			option.setName('ping')
				.setDescription('Which Role to ping?')
				.setRequired(false)),
	async execute(interaction) {
        const roles = [];
        const modifiers = [];
        interaction.options.data.forEach(element => {
            if (element.name.includes('role')) {
                roles.push(element);
            }
        });
        interaction.options.data.forEach(element => {
            if (element.name.includes('modifier')) {
                modifiers.push(element);
            }
        });
		return interaction.reply(nrtb.raidtextbuilder(
            interaction.options.getString('title'),
            interaction.options.getString('description'),
            interaction.member.displayName,
            interaction.options.getString('datetime'),
            roles,
            modifiers,
            interaction.options.getString('imageurl'),
            interaction.options.getRole('ping'),));
	},
};