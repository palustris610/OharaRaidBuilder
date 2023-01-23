const fs = require('fs');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { token } = require('./config.json');
const rtb = require('./raidtextbuilder.js')
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName === 'ping') return;
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		const daddy = await client.users.fetch('259088626883756033');
		daddy.send({content: 'An exception has occured!\n' + error.toString()});
		return;
		//return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		
	}
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		// Create the modal
		const modal = new ModalBuilder()
			.setCustomId('eventModal')
			.setTitle('New Event');

		// Add components to modal

		// Create the text input components
		const eventName = new TextInputBuilder()
			.setCustomId('eventNameInput')
		    // The label is the prompt the user sees for this input
			.setLabel("Event name:")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);

		const eventDate = new TextInputBuilder()
			.setCustomId('eventDateInput')
		    // The label is the prompt the user sees for this input
			.setLabel("Event date: (Format: 2011-12-31T21:10:05)")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);

		const eventDescription = new TextInputBuilder()
			.setCustomId('eventDescriptionInput')
			.setLabel("Event describtion:")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(eventName);
		const secondActionRow = new ActionRowBuilder().addComponents(eventDate);
		const thirdActionRow = new ActionRowBuilder().addComponents(eventDescription)

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow,thirdActionRow);

		// Show the modal to the user
		await interaction.showModal(modal);
	}
});
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isModalSubmit()) return;

	// Get the data entered by the user
	const eventName = interaction.fields.getTextInputValue('eventNameInput');
	const eventDate = interaction.fields.getTextInputValue('eventDateInput');
	const eventDescription = interaction.fields.getTextInputValue('eventDescriptionInput');
	console.log({ eventName, eventDate, eventDescription });
	await interaction.reply(rtb.raidtextbuilder(eventName,eventDescription, interaction.member.displayName, eventDate));
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


client.login(token);