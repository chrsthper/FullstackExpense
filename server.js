import { app, sequelize } from './app.js';

const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server is Running on port ${port}`);
  });
});
