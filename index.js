const express = require('express');
const { collectDefaultMetrics, register } = require('prom-client');

collectDefaultMetrics();

const PORT = 3001;
const app = express();

app.get('/test', (req, res) => {
  console.group('smth');
  console.time();
  console.log('test');
  res.status(200).send('test');
  console.groupEnd('smth')
  console.timeEnd();
});

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    res.status(500).end(error);
  }
});

app.listen(PORT, () => {
  console.log(`Listening to the port ${PORT}`);
});
