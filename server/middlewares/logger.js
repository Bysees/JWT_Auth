const logger = (log = 'log') => (req, res, next) => {

  if (Object.keys(req.body).length) {
    console.log(`${log} body: `, { ...req.body })
  }

  if (Object.keys(req.params).length) {
    console.log(`${log} params: `, { ...req.params })
  }

  if (Object.keys(req.query).length) {
    console.log(`${log} query: `, { ...req.query })
  }

  next()
}

module.exports = logger