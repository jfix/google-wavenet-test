const AWS = require('aws-sdk');
const polly = new AWS.Polly({apiVersion: '2016-06-10', region: 'eu-west-1'});

// Import other required libraries
const fs = require('fs');
const util = require('util');

function createAudio(uttering, filename, type = "text", voiceConfig = {languageCode: 'en-US', ssmlGender: 'NEUTRAL'}) {
  
  // Construct the request
  const params = {
    TextType: type,
    Text: uttering,
    Engine: 'neural',
    LanguageCode: 'en-GB',
    OutputFormat: 'mp3',
    SampleRate: '24000',
    VoiceId: 'Amy'
  };
  polly.synthesizeSpeech(params, (err, data) => {
    if (err) console.log(`Error TTS: ${err}`)
    else {
      const { AudioStream } = data
      const writeFile = util.promisify(fs.writeFile);
      writeFile(filename, AudioStream, 'binary')
      .then(() => {
        console.log(`Audio content written to file: ${filename}`);
      })
      .catch((e) => {
        console.log(`Error writing file ${e}`)
      })
    }
  })
}

module.exports = createAudio
