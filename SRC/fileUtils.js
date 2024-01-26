const fs = require('fs')

function readHeader(callback) {
  fs.readFile("./PUBLIC/ASSETS/HTML/TEMPLATES/header.html", (err, data) => {
    if (err) throw err
    callback(data)
  })
}

function readFooter(callback) {
  fs.readFile("./PUBLIC/ASSETS/HTML/TEMPLATES/footer.html", (err, data) => {
    if (err) throw err
    callback(data)
  })
}

module.exports = { readHeader, readFooter }
