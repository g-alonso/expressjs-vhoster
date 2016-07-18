/**
* Verifarma Auditor Vhoster
*/
var express = require('express');
var vhost   = require('vhost');
var fs      = require('fs'), path = require('path');
var config  = require('./config');

var main_app = express();

function getApplicationManifests(srcpath) {
    var manifests = [];
    fs.readdirSync(srcpath).forEach(function(file) {
        if (fs.statSync(path.join(srcpath, file)).isDirectory()) {
            try {
                var manifest = path.join(srcpath, file)+"/manifest.config.json";
                var jsonObject = JSON.parse(fs.readFileSync(manifest, 'utf8'));
                jsonObject.folder = file; // inject folder name
                manifests.push(jsonObject);
            } catch (e) {
                console.log(
                    "ERROR: unable to find manifest.config.json on '"+file+"' directory. Skipping this folder...\n"
                );
            }
        }
    });
    return manifests;
}

var manifests = getApplicationManifests(config.frontendsPath);
var domainsServerd = [];

manifests.forEach(function(manifest,k){
    main_app.use(
        vhost(
            manifest.domain,
            require(config.frontendsPath+"/"+manifest.folder+"/"+manifest.application)
        )
    );
    domainsServerd.push(manifest.domain)
});

main_app.listen(config.port, function () {
    console.log('Vhoster application is listening on port: '+config.port+" serving the following domains:");
    console.log(domainsServerd.join(",\n"));
});