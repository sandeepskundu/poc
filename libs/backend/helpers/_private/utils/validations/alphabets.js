
const utils = process.aioBeLibs('helpers/_private/utils');

module.exports = {
    'key':{
        message: {
            error: {
                checks: {
                    regex:utils.regex.alphabets.key.message,
                    required:utils.regex.alphabets.key.message
                }
            }
        },
        checks:{
            regex:{
                value:utils.regex.alphabets.key.value,
            },
            required:{
                value:'required'
            }
        }
    }
}