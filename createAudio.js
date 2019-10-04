// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');

async function createAudio(uttering, filename, type = "text", voiceConfig = {languageCode: 'en-US', ssmlGender: 'NEUTRAL'}) {
  // Creates a client
  const client = new textToSpeech.TextToSpeechClient();

  // Construct the request
  const request = {
    input: {[type]: uttering},
    // Select the language and SSML Voice Gender (optional)
    voice: voiceConfig,
    // Select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // console.log(JSON.stringify(request, null, 2))
  // Performs the Text-to-Speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(filename, response.audioContent, 'binary');
  console.log(`Audio content written to file: ${filename}`);
}

module.exports = createAudio
