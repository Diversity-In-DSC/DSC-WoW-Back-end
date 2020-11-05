const Firestore = require('@google-cloud/firestore');

const configPath = process.cwd()+"/config.json";

const DB = new Firestore({
  projectId: 'site-email-send',
  keyFilename: configPath,
});


module.exports.db = DB;