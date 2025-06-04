const { app, sequelize } = require('./app');
const port = process.env.PORT || 4000;

sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server is Running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('❌ Error connecting to database:', err);
  });
