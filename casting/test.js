import { Client, Application } from 'castv2-client';
import { StayCastApplication } from './application.js';
import mDNS from 'multicast-dns';
const mdns = mDNS();
import { appendFileSync } from 'fs';
const CHROMECAST_NAME = 'Your Chromecast Name'; // Or use IP: '192.168.1.100'
const APPLICATION_ID = '1C05BF09'; // From Google Cast Developer Console
const ROOM_NUMBER = '123';
const ACCESS_CODE = 'ABC';
const RECONNECT_DELAY = 5000;
/**
 * @type {import('castv2-client').Client | null}
 */
let client = null;
let session = null;

// Log function
function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}: ${message}`);
}

// mDNS discovery
function startDiscovery() {
  log('Querying for Chromecasts...');
  mdns.query({
    questions: [{ name: '_googlecast._tcp.local', type: 'PTR' }]
  });
}

mdns.on('response', (response) => {
  response.answers.forEach((answer) => {
    if (answer.type === 'A' && answer.name.includes('_googlecast._tcp.local')) {
      const host = answer.data;
      log(`Found Chromecast at ${host}`);
      connectToChromecast(host);
    }
  });
});

// Connect and cast
function connectToChromecast(host) {
  if (client) {
    log('Closing existing client');
    client.close();
  }

  client = new Client();
  client.connect(host, () => {
    log('Connected to Chromecast');
    
    client.launch(StayCastApplication,/** @param {Application} app */ (err, app) => {
      if (err) {
        log(`Error launching app: ${err.message}`);
        reconnect();
        return;
      }

      session = app;
      log('Receiver app launched');
      
      app.sendMessage('settings', {
        guestWifi: "Cooper's Hotel Guest",
        castName: "Living Room",
        person: "John Doe",
        website: "example.com",
        code: 999999999,
      }, (err) => {
        if (err) {
          log(`Error sending auth: ${err.message}`);
          reconnect();
        } else {
          log('Authentication sent; receiver should fetch data');
        }
      });

      app.on('status', (status) => {
        log(`Session status: ${JSON.stringify(status)}`);
        if (status.playerState === 'IDLE' || status.playerState === 'STOPPED') {
          log('Session idle/stopped; recasting...');
          reconnect();
        }
      });
      app.on('close', _ => {
        connectToChromecast("192.168.86.223");
      })
    });
  });

  client.on('error', (err) => {
    log(`Client error: ${err.message}`);
    reconnect();
  });

  client.on('close', () => {
    log('Client closed; reconnecting...');
    reconnect();
  });
}

// Reconnect function
function reconnect() {
  if (session) {
    session.stop(() => {
      log('Session stopped');
    });
  }
  if (client) {
    client.close();
  }
  log(`Reconnecting in ${RECONNECT_DELAY}ms...`);
  setTimeout(startDiscovery, RECONNECT_DELAY);
}

// Handle exit
process.on('SIGINT', () => {
  log('Shutting down script');
  //session.close()
  if (client) client.close();
  process.exit();
});
process.on('SIGTERM', () => {
  log('Shutting down script');
  //session.close()
  if (client) client.close();
  process.exit();
});
process.on('SIGQUIT', () => {
  log('Shutting down script');
  //session.close()
  if (client) client.close();
  process.exit();
});

// Start discovery
log('Starting Chromecast discovery...');
//connectToChromecast("192.168.86.223");
startDiscovery();