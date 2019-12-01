const fs = require('fs')
const path = require('path')
const argv = require('yargs').argv
const audioConfigFile  = path.join(__dirname, argv._[0])

if (!fs.existsSync(audioConfigFile)) {
    throw Error(`Audio config file not found, check your input: ${audioConfigFile}`)
}
const createAudio = require('./createAudioGoogle')
const concatAudio = require('./concatAudio')
const langConfig = require('./lang-config.json')

const audioConfig = JSON.parse(fs.readFileSync(argv._[0]))

const outputDir = "output"

audioConfig.forEach(item => {
    const pubId = item.id
    const pubTitle = item.title
    const pubDate = item.date
    const pubAbstract = item.abstract
    const pubLanguage = item.lang
    const langCfg = langConfig[pubLanguage]

    const intro = langCfg.intro.start.replace('${pubTitle}', pubTitle)
    const abstract = `<speak><prosody rate="90%" volume="+3dB">${pubAbstract}</prosody></speak>`
    const outro =  langCfg.intro.end
        .replace('${pubTitle}', pubTitle)
        .replace('${pubDate}', pubDate)

    // console.log(intro, abstract, outro)
    Promise.all([
        createAudio(intro, `${outputDir}/1-${pubId}.mp3`, "ssml", {
            languageCode: langCfg.languageCode,
            name: langCfg.intro.languageName,
            ssmlGender: langCfg.intro.ssmlGender
        }),
        createAudio(abstract, `${outputDir}/2-${pubId}.mp3`, "ssml", {
            languageCode: langCfg.languageCode, 
            name:  langCfg.abstract.languageName,
            ssmlGender: langCfg.abstract.ssmlGender
        }),
        createAudio(outro, `${outputDir}/3-${pubId}.mp3`, "ssml", {
            languageCode: langCfg.languageCode,
            name: langCfg.intro.languageName,
            ssmlGender: langCfg.intro.ssmlGender
        })
    ]).then(() => {
        concatAudio([`${outputDir}/1-${pubId}.mp3`, `${outputDir}/2-${pubId}.mp3`, `${outputDir}/3-${pubId}.mp3`], `${outputDir}/${pubId}.mp3`)
    })
})
