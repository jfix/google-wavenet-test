const fs = require('fs')
const createAudio = require('./createAudioGoogle')

const birthdayChild = 'Fred'
const config = { languageCode: 'en-GB', name: 'en-GB-Wavenet-A', ssmlGender: 'FEMALE' }

// eval is evil ...
function eval_template(s, params) {
    return Function(...Object.keys(params), "return " + s)
        (...Object.values(params));
}

const res = fs.readFile('happy-birthday.ssml', 'utf8', function(err, data) {
    if (err) throw err;
    const ssml = eval_template(`${data}`, {birthdayChild})
    // console.log(ssml)
    createAudio(ssml, `hb.mp3`, "ssml", config)
})
