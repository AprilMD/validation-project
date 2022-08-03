// Middleware - store any data sent in session, and pass it to all views
exports.autoStoreData = function (req, res, next) {
    if (!req.session.data) {
      req.session.data = {}
    }

    storeData(req.body, req.session.data)
    storeData(req.query, req.session.data)
  
    // Send session data to all views
    res.locals.data = {}
    for (var j in req.session.data) {
      res.locals.data[j] = req.session.data[j]
    }
  
    next()
  }

  // Store data from POST body or GET query in session
var storeData = function (input, data) {
    for (var i in input) {
      // any input where the name starts with _ is ignored
      if (i.indexOf('_') === 0) {
        continue
      }
  
      var val = input[i]
  
      // Delete values when users unselect checkboxes
      if (val === '_unchecked' || val === ['_unchecked']) {
        delete data[i]
        continue
      }
  
      // Remove _unchecked from arrays of checkboxes
      if (Array.isArray(val)) {
        val = val.filter((item) => item !== '_unchecked')
      } else if (typeof val === 'object') {
        // Store nested objects that aren't arrays
        if (typeof data[i] !== 'object') {
          data[i] = {}
        }
  
        // Add nested values
        storeData(val, data[i])
        continue
      }
  
      data[i] = val
    }
  }