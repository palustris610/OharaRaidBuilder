async function askQuestion(questionText, privt, questionmsg, index){
	await questionmsg.edit({content: questionText, components: []});
	return await privt.awaitMessages({max: 1})
			.then(collected => {
				const result = collected.first();
				// const result = collected.first().content;
				console.log(collected.first().author.username + ' - ' + result.content);
				collected.first().delete(); //try deleting the answer so save space
				return result;
			});
}

module.exports = {askQuestion};