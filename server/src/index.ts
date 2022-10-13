import app from './app';
import sequelize from './db/config/connection';

const PORT = app.get('port');

sequelize.sync().then(
  () => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`http://localhost:${PORT}`);
    });
  },
);
