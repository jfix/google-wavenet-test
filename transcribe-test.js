const speech = require('@google-cloud/speech');
const fs = require('fs')
const client = new speech.SpeechClient();

const config = {
    encoding: 'FLAC',
    sampleRateHertz: 16000,
    languageCode: 'en'
};
const audioBytes = fs.readFileSync('test.flac').toString('base64');

const request = {
    config: config,
    audio: {
        content: audioBytes
    }
};

client
    .recognize(request)
    .then( response => {
        const transcription = response.results 
        console.log("Textual transcription: ", JSON.stringify(response, {}, 2));
    })
    .catch((err) => {
        console.log("Transcription ERROR : ", err);
    })
