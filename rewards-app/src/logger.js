import pino from 'pino';

function send(payload) {
  // In browser builds, just use console; for simplicity.
  // This function can be expanded to send logs to a server.
  console.log('pino transmit:', payload);
}

const logger = pino({
  browser: {
    asObject: true,
    transmit: {
      send,
    },
  },
});

export default logger;
