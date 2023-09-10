const express = require('express');
const cors = require('cors');
const sleeper = require('./sleep');
const path = require('path');
const Piscina = require('piscina');
// https://nodejs.org/api/worker_threads.html#worker-threads
const app = express();
const port = 3030;
app.use(cors());
const piscina = new Piscina({
  filename: path.resolve(__dirname, 'worker.js')
});
const workerPool = new Piscina({
  filename: path.resolve(__dirname, 'worker.js')
});
app.get('/message', (req, res) => {
  var theTimeout = req.query.timeout;
  theTimeout = ! theTimeout ? 2000 : theTimeout;
  sleeper.sleep(theTimeout);
  res.send({result:`client requested timeout was ${theTimeout}`});
})
app.get('/message-worker', async (req, res) => {
  var theTimeout = req.query.timeout;
  theTimeout = ! theTimeout ? 2000 : theTimeout;
  const result = await piscina.run({ millis: theTimeout });
  res.send ( {result:result });
});
app.get('/callback-worker', async (req, res) => {
  var theTimeout = req.query.timeout;
  theTimeout = ! theTimeout ? 2000 : theTimeout;
  const result = await workerPool.run({ params: theTimeout, callBack: sleeper.sleep });
  res.send ( {result:result });
});
app.listen(port, () => {
  console.log(`Demo app listening on port ${port}`)
});