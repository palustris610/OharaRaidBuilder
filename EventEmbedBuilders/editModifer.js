const { askQuestion } = require('./askQuestion.js');
const { updateModifierButtons } = require('./updateModifierButtons.js');

async function editModifiers(samplemsg, questionmsg, privt){
    await questionmsg.edit({content: 'How many modifiers will there be? (0-5)', components: []});
    const modifCount = await privt.awaitMessages({max: 1})
        .then(collected => {
            const num = Number(collected.first().content);
            collected.first().delete();
            return num;
        });
    const origRoleRow = samplemsg.components[0]; //first ActionRow, roles
    await samplemsg.edit({components: [origRoleRow]});
    for (let index = 1; index <= modifCount; index++) {
        await editModifier(samplemsg, questionmsg, privt, index);
    }
}

async function editModifier(samplemsg, questionmsg, privt, index){ 
    let newModifier = await askQuestion('What will modifier' + index + ' be? Must be a single emoji. Example: 🤡', privt, questionmsg, index);
    newModifier = newModifier.content;
    const origRoleRow = samplemsg.components[0]; //first ActionRow, roles
    const origModRow = samplemsg.components[1]; //second ActionRow, modifiers
    const newModifiers = [];
    let updated = false;
    if (origModRow != undefined & origModRow != null) {
        origModRow.components.forEach((button,i) => {
            if (i == index) {
                updated = true;
                newModifiers.push(newModifier);
            }
            else {
                if (button.emoji.id != null | button.emoji.id != undefined) {
                    newModifiers.push(button.emoji.id)
                }
                else {
                    newModifiers.push(button.emoji.name);
                }
            }
        });
        if (!updated) {
            newModifiers.push(newModifier);
        }
    }
    else{
        newModifiers.push(newModifier);
    }
    console.log(newModifiers);
    const newRow = updateModifierButtons(newModifiers);
    const rows = [];
    rows.push(origRoleRow);
    rows.push(newRow);
    await samplemsg.edit({components: rows});
    return ;
}

module.exports = {editModifiers};