import pino from 'pino';

function send(payload) {
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
