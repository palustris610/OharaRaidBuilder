function EmojiSearch(input){
    if (input.includes('<:')) {
        return input.substring(input.indexOf(':',3) + 1,input.indexOf('>'));
    }
    else {
        const results = input.match(/\p{Emoji}+/gu);
        if (results != null) {
            return results.pop();
        }
        else {
            console.log('No emoji found!');
            return '❓';
        }
    }
};

module.exports = {EmojiSearch};