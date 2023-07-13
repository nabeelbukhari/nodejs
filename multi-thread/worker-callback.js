const sleeper = require('./sleep');
module.exports = ({ millis }) => {
  sleeper.sleep(millis);
  return `waited in worker.... ${millis} millis.`;
};