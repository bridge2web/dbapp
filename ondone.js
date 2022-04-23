function OnDone(options) {
    // Setup the plugin instance with options...
}

OnDone.prototype.apply = function (compiler) {
    compiler.plugin('done', function () {
        var process = require('child_process');
        console.log("\nOnDone\n");
        process.exec('cordova build browser', function (err, stdout, stderr) {
            console.log("\n" + stdout + "\n");
        });
    });
};

module.exports = OnDone;