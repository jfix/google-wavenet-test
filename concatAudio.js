var SoxCommand = require('sox-audio');

var util = require('util');
var fs = require('fs');
var Stream = require('stream');
var TimeFormat = SoxCommand.TimeFormat;

var addStandardListeners = function(command) {
	command.on('start', function(commandLine) {
		console.log('Spawned sox with command ' + commandLine);
	});

	command.on('progress', function(progress) {
	    console.log('Processing progress: ', progress);
	});

	command.on('error', function(err, stdout, stderr) {
	    console.log('Cannot process audio: ' + err.message);
	    console.log('Sox Command Stdout: ', stdout);
	    console.log('Sox Command Stderr: ', stderr)
	});

	command.on('end', function() {
	    console.log('Sox command succeeded!');
	});
};

/* Concatenate all audio files in the list, and save the result in outputFileName */
var concatAudio = function(fileNameList, outputFileName) {
	var command = SoxCommand();
	fileNameList.forEach(function addInput(fileName) {
		command.input(fileName);
	});
	command.output(outputFileName)
		.concat();

	addStandardListeners(command);
	command.run()
	return command;
}

module.exports = concatAudio