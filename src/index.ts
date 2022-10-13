import app from './app';

const Port = app.get('port');

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log(`http://localhost:${Port}`);
});
