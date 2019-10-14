const createAudio = require('./createAudioGoogle')
const concatAudio = require('./concatAudio')

const pubId = "abc123"
const pubTitle = "OECD Economic Surveys: Colombia 2019"
const pubDate = "2019-10-24"
const pubAbstract = `Colombia has made good economic and social progress over the last two decades. Macroeconomic policies are solid and have sustained growth and smooth adjustments to shocks over the years. Maintaining and strengthening the policy framework is key to sustainable macroeconomic policies and setting the basis for higher productivity and inclusiveness. Putting Colombia on a path to stronger and more inclusive growth, and reducing dependence on natural resources, requires boosting productivity by adopting structural reforms in competition, regulations, trade policy, infrastructure, innovation, and skills. Reducing informality and boosting job-quality would extend the benefits of growth to all Colombians, underpinning economic and political support for reform. SPECIAL FEATURES: BOOSTING EXPORTS AND INTEGRATION INTO THE WORLD ECONOMY; FOSTERING HIGH-QUALITY JOBS FOR ALL`

const text1 = `<speak><emphasis level="moderate">Hello!</emphasis> <break time="800ms"/> The following is an audio abstract for "${pubTitle}"<break time="1s"/></speak>`
const text2 = `<speak><prosody volume="+3dB">${pubAbstract}</prosody></speak>`
const text3 =  `<speak><break time="1s"/>You've been listening to an audio abstract of "${pubTitle}" which you can read in its entirety on OECD i-Library as of <say-as interpret-as="date" format="yyyy-mm-dd" detail="1">${pubDate}</say-as>. <break time="1s"/> If you don't mind, we'd like you to tell us what you think of this new audio abstract service. <break time="1s"/>You find the link to a short survey in the track description. <break time="1s"/><emphasis level="moderate">Thank you!</emphasis></speak>`;

Promise.all([
createAudio(text1, `1-${pubId}.mp3`, "ssml", {languageCode: 'en-GB', name: 'en-GB-Wavenet-A', ssmlGender: 'FEMALE'}),
createAudio(text2, `2-${pubId}.mp3`, "ssml", {languageCode: 'en-GB', name:  'en-GB-Wavenet-B', ssmlGender: 'MALE'}),
createAudio(text3, `3-${pubId}.mp3`, "ssml", {languageCode: 'en-GB', name: 'en-GB-Wavenet-A', ssmlGender: 'FEMALE'})
]).then(() => {
    concatAudio([`1-${pubId}.mp3`, `2-${pubId}.mp3`, `3-${pubId}.mp3`], `0-${pubId}.mp3`)
})
