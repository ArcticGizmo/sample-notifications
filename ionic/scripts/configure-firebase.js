const fs = require('fs');
const { exit, argv0, argv } = require('process');
const readline = require('readline');
const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const FILES = ['.env', '.env.local', '.env.development', '.env.development.local'];

const TEMPLATE = `/* eslint-disable */
// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/{version}/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/{version}/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  {config}
};

console.log('[Firebase SW] registering');

firebase.initializeApp(firebaseConfig);

// enable messaging
const messaging = firebase.messaging();
`;

function getFirebaseVersion() {
  if (fs.existsSync('./package-lock.json')) {
    const raw = fs.readFileSync('./package-lock.json').toString();
    const data = JSON.parse(raw);
    return data.packages['node_modules/firebase'].version;
  }

  if (fs.existsSync('./yarn.lock')) {
    const lines = fs.readFileSync('./yarn.lock').toString().split('\n');
    for (const l of lines) {
      if (l.startsWith('firebase@^')) {
        return l.split('^')[1].split(':')[0];
      }
    }
  }

  console.error('Unable to determine version from lock file');
  exit(-1);
}

function parseEnvData(text) {
  const result = {};
  const lines = text.split('\n');
  for (const line of lines) {
    const match = line.match(/^([^=:#]+?)[=:](.*)/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/['"]+/g, '');
      result[key] = value;
    }
  }
  return result;
}

function getValuesFromFile(path) {
  if (!fs.existsSync(path)) {
    return [path, undefined];
  }

  const data = fs.readFileSync(path).toString();
  return [path, parseEnvData(data)];
}

function getEnvironmentVariables() {
  const config = FILES.map(getValuesFromFile).reduce((acc, [filename, data]) => {
    if (data) {
      console.log(`\t- loading '${filename}'`);
      Object.assign(acc, data);
    }
    return acc;
  }, {});

  const relevantKeys = {
    apiKey: config['VUE_APP_FIREBASE_API_KEY'],
    authDomain: config['VUE_APP_FIREBASE_AUTH_DOMAIN'],
    projectId: config['VUE_APP_FIREBASE_PROJECT_ID'],
    storageBucket: config['VUE_APP_FIREBASE_STORAGE_BUCKET'],
    messagingSenderId: config['VUE_APP_FIREBASE_SENDER_ID'],
    appId: config['VUE_APP_FIREBASE_APP_ID']
  };

  const missing = Object.entries(relevantKeys).reduce((acc, [key, value]) => {
    if (!value) {
      acc.push(key);
    }

    return acc;
  }, []);

  if (missing.length) {
    console.error('\n\nCannot create file, some configuration is missing');
    missing.forEach(m => console.log(`- ${m}`));
    console.log('\n');
    exit(-1);
  }

  config.measurementId = config['VUE_APP_FIREBASE_MEASUREMENT_ID'];

  Object.keys(relevantKeys).forEach(key => {
    if (!relevantKeys[key]) {
      delete relevantKeys[key];
    }
  });

  return relevantKeys;
}

class ReplaceChain {
  constructor(text) {
    this._text = text;
  }

  replaceVersion(version) {
    this.replace('{version}', version);
    return this;
  }

  replace(key, value) {
    if (value) {
      this._text = this._text.replaceAll(key, value);
    }

    return this;
  }

  replaceEnv(env) {
    const configRows = Object.entries(env)
      .map(([key, value]) => `${key}: '${value}'`)
      .filter(t => t)
      .join(',\n  ');

    return this.replace('{config}', configRows);
  }

  result() {
    return this._text;
  }
}

function createFile(env, version) {
  const content = new ReplaceChain(TEMPLATE).replaceVersion(version).replaceEnv(env).result();
  fs.writeFileSync('./public/firebase-messaging-sw.js', content);
}

function run() {
  // read in the configuration variables
  console.log('- Reading environment variable files');
  const env = getEnvironmentVariables();

  // read package.json for version
  console.log('- Reading Firebase version');
  const version = getFirebaseVersion();

  // create messaging file
  console.log('- Creating file');
  createFile(env, version);
  console.log('- File "public/firebase-messaging-sw.js" created!');
}

function showPrompt() {
  // check if already existing
  console.log('\nDo you want to initialise the firebase messaging service worker?');
  prompt.question('This will override any existing configuration (Yn)', name => {
    if (name.toLocaleLowerCase().startsWith('y')) {
      run();
    }

    prompt.close();
  });
}

if (argv.at(2) === '-y') {
  run();
  exit(0);
} else {
  showPrompt();
}
