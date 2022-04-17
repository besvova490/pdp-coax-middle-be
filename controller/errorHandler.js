function errorHandler(err, _, res) {
  console.error(err);

  res.status(500).send('Internet server error');
}

module.exports = errorHandler;
