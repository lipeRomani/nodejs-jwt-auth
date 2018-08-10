module.exports = (app) => {
  app.get('/', (req, res, next) => {
    res.send(['teste1', 'teste2', 'teste3']);
  });
};