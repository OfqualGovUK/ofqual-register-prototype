//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// 01 - This function prints out the form method and submitted data to the console
router.use((req, res, next) => {
    const log = {
      method: req.method,
      url: req.originalUrl,
      data: req.session.data
    }
    //console.log(JSON.stringify(log, null, 2))

  next()
})
// 01

module.exports = router

require('./routes/routes-v1.js')(router)
require('./routes/routes-v2.js')(router)
require('./routes/routes-v3.js')(router)
require('./routes/routes-alpha01.js')(router)